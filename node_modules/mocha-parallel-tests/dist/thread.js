"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function supportsWorkerThreads() {
    try {
        require('worker_threads');
        return true;
    }
    catch (ex) {
        return false;
    }
}
exports.supportsWorkerThreads = supportsWorkerThreads;
//# sourceMappingURL=thread.js.map