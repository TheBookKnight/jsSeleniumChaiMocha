/// <reference types="node" />
import { EventEmitter } from 'events';
export declare type Task<T> = () => Promise<T>;
export interface TaskOutput<T> {
    task: Task<T>;
    output?: T;
}
export default class TaskManager<TaskResult> extends EventEmitter {
    private maxParallel;
    private tasks;
    private remainingTasks;
    private processingTasks;
    constructor(maxParallel?: number);
    add(task: Task<TaskResult>): void;
    execute(): void;
    private onTaskProcessingFinished;
    private startTaskProcessing;
    private emitEndIfAllFinished;
}
