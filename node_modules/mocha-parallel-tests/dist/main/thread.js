"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const process_1 = require("./thread/process");
const thread_1 = require("../thread");
const getWorkerThread = (file, debugLog, options) => {
    // we can't ES6-import this because older versions of node will throw exceptions
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { WorkerThread } = require('./thread/worker');
    return new WorkerThread(file, debugLog, options);
};
exports.getThread = (file, options) => {
    return thread_1.supportsWorkerThreads()
        ? getWorkerThread(file, debug_1.default('mocha-parallel-tests:worker-thread'), options)
        : new process_1.ProcessThread(file, debug_1.default('mocha-parallel-tests:worker-thread'), options);
};
//# sourceMappingURL=thread.js.map