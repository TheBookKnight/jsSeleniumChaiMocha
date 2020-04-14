"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thread_1 = require("../thread");
class MessageChannel {
    constructor() {
        this.handlesRunning = 0;
        this.onHandleFinished = () => {
            this.handlesRunning -= 1;
            if (this.handlesRunning === 0 && this.callbackRunOnExhausted) {
                this.callbackRunOnExhausted();
            }
        };
        if (thread_1.supportsWorkerThreads()) {
            // stdout/stderr messages and worker thread messages are not synchronised
            // this means that we can't rely on worker.stdout stream
            process.stdout.write = this.overrideStdStream('stdout');
            process.stderr.write = this.overrideStdStream('stderr');
        }
    }
    sendEnsureDelivered(message) {
        this.handlesRunning += 1;
        this.sendToParent(message);
    }
    runOnExhausted(cb) {
        if (this.handlesRunning) {
            this.callbackRunOnExhausted = cb;
        }
        else {
            cb();
        }
    }
    getParentPort() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { parentPort } = require('worker_threads');
        if (!parentPort) {
            throw new Error('Parent port is not available');
        }
        return parentPort;
    }
    sendToParent(message) {
        if (thread_1.supportsWorkerThreads()) {
            const parentPort = this.getParentPort();
            parentPort.postMessage(message);
            this.onHandleFinished();
        }
        else {
            if (!process.send) {
                throw new Error('IPC is not available');
            }
            process.send(message, this.onHandleFinished);
        }
    }
    overrideStdStream(stream) {
        const originalWrite = process[stream].write.bind(process.stdout);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const overrideCallback = (data, ...args) => {
            const parentPort = this.getParentPort();
            const message = { stream, data };
            parentPort.postMessage(message);
            return originalWrite(data, ...args);
        };
        return overrideCallback;
    }
}
exports.default = MessageChannel;
//# sourceMappingURL=message-channel.js.map