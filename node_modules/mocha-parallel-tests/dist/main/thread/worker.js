"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const path_1 = require("path");
const message_channel_1 = require("../../message-channel");
const util_1 = require("../util");
class WorkerThread {
    constructor(file, log, options) {
        this.events = [];
        this.onMessage = (message) => {
            if (message_channel_1.isOverwrittenStandardStreamMessage(message)) {
                const { data, stream } = message;
                if (stream === 'stdout') {
                    this.onStdout(Buffer.from(data));
                }
                else if (stream === 'stderr') {
                    this.onStderr(Buffer.from(data));
                }
                return;
            }
            if (message_channel_1.isSyncSnapshot(message)) {
                this.syncedSubprocessData = message.data;
            }
            else {
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
        this.onError = (reject) => (err) => {
            this.log(`Error occured in subprocess: ${err.stack}`);
            reject(err);
        };
        this.onExit = (resolve) => (code) => {
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
        const workerFilename = this.options.isTypescriptRunMode ? 'worker.development.js' : 'worker.js';
        const workerPath = path_1.resolve(__dirname, `../../subprocess/thread/${workerFilename}`);
        this.startedAt = Date.now();
        return new Promise((resolve, reject) => {
            const worker = new worker_threads_1.Worker(workerPath, {
                execArgv: process.execArgv.filter(util_1.removeDebugArgs),
                stderr: true,
                stdout: true,
                workerData: this.buildWorkerData(),
            });
            // it's unsafe to listen to stderr/stdout messages from the worker thread
            // because they are asynchronous (process.stdout.isTTY = False)
            // worker.stderr.on('data', this.onStderr);
            // worker.stdout.on('data', this.onStdout);
            worker.on('message', this.onMessage);
            worker.on('error', this.onError(reject));
            worker.on('exit', this.onExit(resolve));
        });
    }
    buildWorkerData() {
        return {
            file: path_1.resolve(this.file),
            options: this.options,
        };
    }
}
exports.WorkerThread = WorkerThread;
//# sourceMappingURL=worker.js.map