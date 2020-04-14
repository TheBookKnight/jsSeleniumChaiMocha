"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const events_1 = require("events");
const os_1 = require("os");
class TaskManager extends events_1.EventEmitter {
    constructor(maxParallel = os_1.cpus().length) {
        super();
        this.tasks = [];
        this.remainingTasks = new Set();
        this.processingTasks = new Set();
        this.onTaskProcessingFinished = (finishedTask, output) => {
            assert_1.default(!this.remainingTasks.has(finishedTask), 'Unknown task, cannot finalize it');
            assert_1.default(this.processingTasks.has(finishedTask), 'Task has not been started processing');
            const taskIndex = this.tasks.findIndex(({ task }) => task === finishedTask);
            assert_1.default(taskIndex !== -1, 'Unknown task, cannot write its output');
            this.tasks[taskIndex].output = output;
            this.processingTasks.delete(finishedTask);
            this.emit('taskFinished', output);
            this.execute();
            this.emitEndIfAllFinished();
        };
        this.maxParallel = maxParallel || Number.POSITIVE_INFINITY;
        this.on('processingFinished', this.onTaskProcessingFinished);
    }
    add(task) {
        this.tasks.push({ task });
        this.remainingTasks.add(task);
    }
    execute() {
        for (const task of this.remainingTasks) {
            this.startTaskProcessing(task);
            if (this.processingTasks.size >= this.maxParallel) {
                break;
            }
        }
    }
    async startTaskProcessing(task) {
        assert_1.default(this.remainingTasks.has(task), 'Unknown task, cannot process it');
        assert_1.default(!this.processingTasks.has(task), 'Task has already started processing');
        this.remainingTasks.delete(task);
        this.processingTasks.add(task);
        const res = await task();
        this.emit('processingFinished', task, res);
    }
    emitEndIfAllFinished() {
        const shouldEmit = this.tasks.every(({ output }) => output !== undefined);
        if (shouldEmit) {
            this.emit('end');
        }
    }
}
exports.default = TaskManager;
//# sourceMappingURL=task-manager.js.map