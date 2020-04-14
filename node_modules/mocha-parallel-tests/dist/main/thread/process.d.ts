import { Debugger } from 'debug';
import { Thread, ThreadOptions } from '../../thread';
import { SubprocessResult } from '../../message-channel';
export declare class ProcessThread implements Thread {
    private file;
    private log;
    private options;
    private events;
    private startedAt;
    private syncedSubprocessData;
    constructor(file: string, log: Debugger, options: ThreadOptions);
    run(): Promise<SubprocessResult>;
    private buildForkArgs;
    private onMessage;
    private onStdout;
    private onStderr;
    private onClose;
}
