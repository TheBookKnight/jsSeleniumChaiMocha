"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const circular_json_1 = __importDefault(require("circular-json"));
const util_1 = require("./util");
const config_1 = require("../config");
exports.getReporterFactory = (channel, debugSubprocess) => {
    return class Reporter {
        constructor(runner) {
            /**
             * If `--retries N` option is specified runner can emit `test` events
             * multiple times for retried test cases. These test cases do not exist
             * if the final root suite structure, so we need to store them and return
             * to the main process after the end
             */
            this.runningTests = new Set();
            this.currentTestIndex = null;
            this.eventsCounter = 0;
            this.onRunnerStart = () => {
                this.notifyParent('start');
            };
            this.onRunnerEnd = () => {
                this.notifyParent('end');
            };
            this.onRunnerSuTestart = (suite) => {
                const title = suite.root ? 'root' : suite.fullTitle();
                const id = util_1.getMessageId('suite', title, this.eventsCounter);
                suite[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] = id;
                this.notifyParent('suite', { id });
                this.eventsCounter += 1;
            };
            this.onRunnerSuiteEnd = (suite) => {
                this.notifyParent('suite end', {
                    id: suite[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                });
            };
            this.onRunnerWaiting = ( /* rootSuite: Suite */) => {
                this.notifyParent('waiting');
            };
            this.onTestStart = (test) => {
                const id = util_1.getMessageId('test', test.fullTitle(), this.eventsCounter);
                test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] = id;
                if (!test.parent) {
                    throw new Error('Could not find a parent for the current test');
                }
                // this test is running for the first time, i.e. no retries for it have been executed yet
                if (this.currentTestIndex === null) {
                    const currentTestIndex = test.parent.tests.indexOf(test);
                    if (currentTestIndex === -1) {
                        throw new Error('Could not find the test in the suite\'s tests');
                    }
                    this.currentTestIndex = currentTestIndex;
                }
                else if (!test.parent.tests.includes(test)) {
                    /**
                     * When mocha runs tests with `--retries` option there's a specific behaviour for events order:
                     * If the test fails and `--retries` = 1, mocha emits `test`, `test`, `fail` and `test end`.
                     * This means that mocha doesn't emit the "test end" event and instead just re-emits the test.
                     * The issue is that the last test in the currently running suite refers to the previously run test.
                     * The fix for us here is to "fix" the mocha old pointer by replacing the failed test with a new one.
                     * NB: This may be a mocha issue
                     */
                    test.parent.tests[this.currentTestIndex] = test;
                }
                this.runningTests.add(test);
                this.notifyParent('test', { id });
                this.eventsCounter += 1;
            };
            this.onTestEnd = (test) => {
                this.runningTests.delete(test);
                this.currentTestIndex = null;
                this.notifyParent('test end', {
                    id: test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                });
            };
            this.onRunnerPass = (test) => {
                this.notifyParent('pass', {
                    id: test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                });
            };
            this.onRunnerFail = (test, err) => {
                this.notifyParent('fail', {
                    err: {
                        message: err.message,
                        name: err.name,
                        stack: err.stack,
                    },
                    id: test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                });
            };
            this.onRunnerPending = (test) => {
                this.notifyParent('pending', {
                    id: test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                });
            };
            this.onRunnerHookStart = (hook) => {
                const id = hook[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] || util_1.getMessageId('hook', hook.title, this.eventsCounter);
                hook[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] = id;
                this.notifyParent('hook', { id });
                this.eventsCounter += 1;
            };
            this.onRunnerHookEnd = (hook) => {
                this.notifyParent('hook end', {
                    id: hook[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                });
            };
            this.rootSuite = runner.suite;
            runner.on('waiting', this.onRunnerWaiting);
            runner.on('start', this.onRunnerStart);
            runner.on('end', this.onRunnerEnd);
            runner.on('suite', this.onRunnerSuTestart);
            runner.on('suite end', this.onRunnerSuiteEnd);
            runner.on('test', this.onTestStart);
            runner.on('test end', this.onTestEnd);
            runner.on('pass', this.onRunnerPass);
            runner.on('fail', this.onRunnerFail);
            runner.on('pending', this.onRunnerPending);
            runner.on('hook', this.onRunnerHookStart);
            runner.on('hook end', this.onRunnerHookEnd);
        }
        notifyParent(event, data = {}) {
            if (debugSubprocess) {
                // eslint-disable-next-line no-console
                console.log({ event, data });
            }
            else {
                this.notifyParentThroughIPC(event, data);
            }
        }
        notifyParentThroughIPC(event, data = {}) {
            // main process needs retried tests only when it starts
            // re-emitting subprocess test results, so it's safe to
            // omit them until the "end" event
            const retriesTests = event === 'end'
                ? [...this.runningTests].map((test) => {
                    if (!test.parent) {
                        throw new Error('Could not find a parent for the current test');
                    }
                    return Object.assign({}, test, {
                        [config_1.SUBPROCESS_RETRIED_SUITE_ID]: test.parent[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP],
                        parent: null,
                    });
                })
                : [];
            // send the data snapshot with every event
            const snapshot = {
                data: {
                    // can't use the root suite because it will not get revived in the master process
                    // @see https://github.com/WebReflection/circular-json/issues/44
                    results: circular_json_1.default.stringify({ rootSuite: this.rootSuite }),
                    retries: circular_json_1.default.stringify({ retriesTests }),
                },
                event: 'sync',
            };
            channel.sendEnsureDelivered(snapshot);
            // and then send the event
            const reporterNotification = { event, data };
            channel.sendEnsureDelivered(reporterNotification);
        }
    };
};
//# sourceMappingURL=reporter.js.map