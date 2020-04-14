import { Thread, ThreadOptions } from '../thread';
export declare type ThreadFactory = (file: string, options: ThreadOptions) => Thread;
export declare const getThread: ThreadFactory;
