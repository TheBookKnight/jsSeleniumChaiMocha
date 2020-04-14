"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// monkeypatch Node.JS native TTY function
// otherwise mocha native base reporter throws exception
// inside a worker environment
require('tty').getWindowSize = () => 75;
const worker_threads_1 = require("worker_threads");
const runner_1 = require("../runner");
const { file, options } = worker_threads_1.workerData;
runner_1.runMocha(file, options, false);
//# sourceMappingURL=worker.js.map