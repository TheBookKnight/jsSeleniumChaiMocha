/// <reference types="node" />
export interface Snapshot {
    data: {
        results: string;
        retries: string;
    };
    event: 'sync';
}
export interface ReporterSimpleEvent {
    id: string;
}
export interface ReporterErrorEvent {
    id: string;
    err: {
        message: string;
        name: string;
        stack?: string;
    };
}
export declare type ReporterEvent = ReporterSimpleEvent | ReporterErrorEvent | {};
export interface ReporterNotification {
    event: string;
    data: ReporterEvent;
}
export interface OverwrittenStandardStreamMessage {
    stream: 'stderr' | 'stdout';
    data: string;
}
export declare type InterProcessMessage = Snapshot | ReporterNotification | OverwrittenStandardStreamMessage;
export interface SubprocessRunnerMessage {
    data: ReporterEvent;
    event: string;
    type: 'runner';
}
export interface SubprocessOutputMessage {
    data: Buffer;
    type: 'stdout' | 'stderr';
}
export interface SubprocessSyncedData {
    results: string;
    retries: string;
}
export declare type SubprocessMessage = SubprocessRunnerMessage | SubprocessOutputMessage;
export interface SubprocessResult {
    code: number;
    file: string;
    events: SubprocessMessage[];
    execTime: number;
    syncedSubprocessData?: SubprocessSyncedData;
}
export declare function isSyncSnapshot(message: InterProcessMessage): message is Snapshot;
export declare function isOverwrittenStandardStreamMessage(message: InterProcessMessage): message is OverwrittenStandardStreamMessage;
export declare function isEventWithId(event: ReporterEvent): event is (ReporterErrorEvent | ReporterSimpleEvent);
export declare function isErrorEvent(event: ReporterEvent): event is ReporterErrorEvent;
