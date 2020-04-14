"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const runner_1 = require("./runner");
const { file, options } = worker_threads_1.workerData;
runner_1.runMocha(file, options, false);
//# sourceMappingURL=worker.js.map