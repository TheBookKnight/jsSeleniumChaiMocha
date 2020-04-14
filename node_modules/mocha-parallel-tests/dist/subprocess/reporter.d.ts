import { Runner } from 'mocha';
import MessageChannel from './message-channel';
export interface ReporterConstructor {
    new (runner: Runner): any;
}
export declare type ReporterFactory = (channel: MessageChannel, debugSubprocess: boolean) => ReporterConstructor;
export declare const getReporterFactory: ReporterFactory;
