/// <reference types="node" />
import { SubprocessResult, SubprocessOutputMessage, SubprocessRunnerMessage } from './message-channel';
export declare type ListenerMessage = (message: Buffer) => void;
export declare type ListenerStandardStream = (message: Buffer) => void;
export declare type ExitCode = number;
export interface ThreadOptions {
    bail?: boolean;
    compilers: string[];
    delay: boolean;
    enableTimeouts?: boolean;
    exitImmediately: boolean;
    fullTrace: boolean;
    grep?: string;
    isTypescriptRunMode: boolean;
    file: string[];
    requires: string[];
    retries?: number;
    slow?: boolean;
    timeout?: number;
}
export interface Thread {
    run(): Promise<SubprocessResult>;
}
export declare type SubprocessMessage = SubprocessOutputMessage | SubprocessRunnerMessage;
export declare function supportsWorkerThreads(): boolean;
