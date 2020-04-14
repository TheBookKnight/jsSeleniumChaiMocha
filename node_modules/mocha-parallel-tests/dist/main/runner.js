"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const mocha_1 = require("mocha");
const config_1 = require("../config");
const message_channel_1 = require("../message-channel");
class RunnerMain extends mocha_1.Runner {
    constructor(rootSuite) {
        super(rootSuite, false);
        this.retriedTests = [];
        this.onFail = () => {
            this.failures++;
        };
        this.onExecutionComplete = () => {
            if (this.forbidOnly) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.failures += this.stats.tests;
            }
            if (this.forbidPending) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.failures += this.stats.pending;
            }
        };
        this.rootSuite = rootSuite;
        // in mocha@6 assigning "stats" field to the runner is extracted into a separate function
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const createStatsCollector = require('mocha/lib/stats-collector');
            createStatsCollector(this);
        }
        catch (ex) {
            // older mocha version
        }
        this.once('end', this.onExecutionComplete);
        this.on('fail', this.onFail);
    }
    emitStartEvents() {
        this.emit('start');
        this.emit('suite', this.rootSuite);
    }
    emitFinishEvents(onComplete) {
        this.emit('suite end', this.rootSuite);
        this.emit('end');
        if (onComplete) {
            onComplete(this.failures);
        }
    }
    reEmitSubprocessEvents(testResults, retriedTests) {
        this.subprocessTestResults = testResults;
        this.setRetriesTests(retriedTests);
        this.emitSubprocessEvents();
    }
    setRetriesTests(tests) {
        for (const test of tests) {
            const suite = this.findSuiteById(test[config_1.SUBPROCESS_RETRIED_SUITE_ID]);
            assert_1.default(suite, 'Couldn\'t find retried test suite');
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            test.parent = suite;
            this.retriedTests.push(test);
        }
    }
    findSuiteById(id, rootSuite = this.rootSuite) {
        if (rootSuite[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] === id) {
            return rootSuite;
        }
        for (const suite of rootSuite.suites) {
            const inner = this.findSuiteById(id, suite);
            if (inner) {
                return inner;
            }
        }
        return null;
    }
    findRetriedTestById(id) {
        return this.retriedTests.find((test) => test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] === id);
    }
    findTestById(id, rootSuite = this.rootSuite) {
        for (const test of rootSuite.tests) {
            if (test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] === id) {
                return test;
            }
        }
        for (const suite of rootSuite.suites) {
            const inner = this.findTestById(id, suite);
            if (inner) {
                return inner;
            }
        }
        return null;
    }
    findHookById(id, rootSuite = this.rootSuite) {
        for (const hookType of ['_beforeEach', '_beforeAll', '_afterEach', '_afterAll']) {
            for (const hook of rootSuite[hookType]) {
                if (hook[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] === id) {
                    return hook;
                }
            }
        }
        for (const suite of rootSuite.suites) {
            const inner = this.findHookById(id, suite);
            if (inner) {
                return inner;
            }
        }
        return null;
    }
    /**
     * Sometimes mocha "forgets" to replace the test in suite.tests
     * Example of this can be a sync test which fails twice and passes on third run
     * If the test is executed with `--retries 2` we will get this result
     */
    findForgottenTestById(id, rootSuite = this.rootSuite) {
        if (rootSuite.ctx.test && rootSuite.ctx.test[config_1.RUNNABLE_MESSAGE_CHANNEL_PROP] === id) {
            return rootSuite.ctx.test;
        }
        for (const suite of rootSuite.suites) {
            const inner = this.findForgottenTestById(id, suite);
            if (inner) {
                return inner;
            }
        }
        return null;
    }
    emitSubprocessEvents() {
        for (const subprocessEvent of this.subprocessTestResults.events) {
            if (this.isRunnerMessage(subprocessEvent)) {
                const { event, data } = subprocessEvent;
                if (event === 'waiting') {
                    this.emit('waiting', this.rootSuite);
                    continue;
                }
                if (!message_channel_1.isEventWithId(data)) {
                    continue;
                }
                switch (event) {
                    case 'start':
                    case 'end':
                        // ignore these events from subprocess
                        break;
                    case 'suite':
                    case 'suite end': {
                        const suite = this.findSuiteById(data.id);
                        assert_1.default(suite, `Couldn't find suite by id: ${data.id}`);
                        this.emit(event, suite);
                        break;
                    }
                    case 'test':
                    case 'test end':
                    case 'pending':
                    case 'pass': {
                        const test = this.findTestById(data.id)
                            || this.findRetriedTestById(data.id)
                            || this.findForgottenTestById(data.id);
                        assert_1.default(test, `Couldn't find test by id: ${data.id}`);
                        this.emit(event, test);
                        break;
                    }
                    case 'fail': {
                        const test = this.findTestById(data.id)
                            || this.findHookById(data.id)
                            || this.findForgottenTestById(data.id);
                        assert_1.default(test, `Couldn't find test by id: ${data.id}`);
                        if (!message_channel_1.isErrorEvent(data)) {
                            throw new Error('Unexpected fail event without err field');
                        }
                        this.emit(event, test, data.err);
                        break;
                    }
                    case 'hook':
                    case 'hook end': {
                        const hook = this.findHookById(data.id);
                        assert_1.default(hook, `Couldn't find hook by id: ${data.id}`);
                        this.emit(event, hook);
                        break;
                    }
                    default:
                        throw new Error(`Unknown event: ${event}`);
                }
            }
            else {
                const { data, type } = subprocessEvent;
                process[type].write(data);
            }
        }
    }
    isRunnerMessage(message) {
        return message.type === 'runner';
    }
}
exports.default = RunnerMain;
//# sourceMappingURL=runner.js.map