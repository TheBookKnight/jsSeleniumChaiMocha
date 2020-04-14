"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const message_channel_1 = require("../../message-channel");
const util_1 = require("../util");
const config_1 = require("../../config");
class ProcessThread {
    constructor(file, log, options) {
        this.events = [];
        this.onMessage = (message) => {
            if (message_channel_1.isSyncSnapshot(message)) {
                this.syncedSubprocessData = message.data;
            }
            else if (!message_channel_1.isOverwrittenStandardStreamMessage(message)) {
                const runnerEvent = {
                    data: message.data,
                    event: message.event,
                    type: 'runner',
                };
                this.events.push(runnerEvent);
            }
        };
        this.onStdout = (data) => {
            const outputEvent = {
                data,
                type: 'stdout',
            };
            this.events.push(outputEvent);
        };
        this.onStderr = (data) => {
            const outputEvent = {
                data,
                type: 'stderr',
            };
            this.events.push(outputEvent);
        };
        this.onClose = (resolve) => (code) => {
            this.log(`Process for ${this.file} exited with code ${code}`);
            if (!this.startedAt) {
                throw new Error('Attempt to close a thread which hasn\'t been started yet');
            }
            resolve({
                code,
                events: this.events,
                execTime: Date.now() - this.startedAt,
                file: this.file,
                syncedSubprocessData: this.syncedSubprocessData,
            });
        };
        this.file = file;
        this.log = log;
        this.options = options;
    }
    run() {
        const extension = this.options.isTypescriptRunMode ? 'ts' : 'js';
        const runnerPath = path_1.resolve(__dirname, `../../subprocess/cli.${extension}`);
        this.startedAt = Date.now();
        return new Promise((resolve, reject) => {
            const test = child_process_1.fork(runnerPath, this.buildForkArgs(), {
                // otherwise `--inspect-brk` and other params will be passed to subprocess
                execArgv: process.execArgv.filter(util_1.removeDebugArgs),
                stdio: ['ipc'],
            });
            if (!test.stdout || !test.stderr) {
                reject(new Error('Could not find standard streams for forked process'));
                return;
            }
            test.on('message', this.onMessage);
            test.stdout.on('data', this.onStdout);
            test.stderr.on('data', this.onStderr);
            test.on('close', this.onClose(resolve));
        });
    }
    buildForkArgs() {
        const forkArgs = ['--test', path_1.resolve(this.file)];
        for (const option of config_1.SUITE_OWN_OPTIONS) {
            // bail is undefined by default, we need to somehow pass its value to the subprocess
            const propValue = this.options[option];
            forkArgs.push(`--${option}`, propValue === undefined ? false : propValue);
        }
        for (const requirePath of this.options.requires) {
            forkArgs.push('--require', requirePath);
        }
        for (const compilerPath of this.options.compilers) {
            forkArgs.push('--compilers', compilerPath);
        }
        if (this.options.delay) {
            forkArgs.push('--delay');
        }
        if (this.options.grep) {
            forkArgs.push('--grep', this.options.grep);
        }
        if (this.options.exitImmediately) {
            forkArgs.push('--exit');
        }
        if (this.options.fullTrace) {
            forkArgs.push('--full-trace');
        }
        return forkArgs;
    }
}
exports.ProcessThread = ProcessThread;
//# sourceMappingURL=process.js.map