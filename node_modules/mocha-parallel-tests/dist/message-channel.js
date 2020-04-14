"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isSyncSnapshot(message) {
    return 'event' in message && message.event === 'sync';
}
exports.isSyncSnapshot = isSyncSnapshot;
function isOverwrittenStandardStreamMessage(message) {
    return 'stream' in message;
}
exports.isOverwrittenStandardStreamMessage = isOverwrittenStandardStreamMessage;
function isEventWithId(event) {
    return 'id' in event;
}
exports.isEventWithId = isEventWithId;
function isErrorEvent(event) {
    return 'err' in event;
}
exports.isErrorEvent = isErrorEvent;
//# sourceMappingURL=message-channel.js.map