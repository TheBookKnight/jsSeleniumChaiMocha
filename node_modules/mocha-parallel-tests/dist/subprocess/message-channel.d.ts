import { InterProcessMessage } from '../message-channel';
export default class MessageChannel {
    private handlesRunning;
    private callbackRunOnExhausted;
    constructor();
    sendEnsureDelivered(message: InterProcessMessage): void;
    runOnExhausted(cb: () => void): void;
    private getParentPort;
    private onHandleFinished;
    private sendToParent;
    private overrideStdStream;
}
