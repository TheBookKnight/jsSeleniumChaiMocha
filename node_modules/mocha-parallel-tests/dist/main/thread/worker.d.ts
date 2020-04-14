import { Debugger } from 'debug';
import { Thread, ThreadOptions } from '../../thread';
import { SubprocessResult } from '../../message-channel';
export interface WorkerData {
    file: string;
    options: ThreadOptions;
}
export declare class WorkerThread implements Thread {
    private file;
    private log;
    private options;
    private events;
    private startedAt;
    private syncedSubprocessData;
    constructor(file: string, log: Debugger, options: ThreadOptions);
    run(): Promise<SubprocessResult>;
    private buildWorkerData;
    private onMessage;
    private onStdout;
    private onStderr;
    private onError;
    private onExit;
}
