"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function cleanFullTitle(title) {
    return title
        .replace(/[^\w]+/g, '')
        .trim()
        .toLowerCase() || 'notitle';
}
function getMessageId(entityType, entityTitle, eventCounter) {
    return `${entityType}_${cleanFullTitle(entityTitle)}:${uuid_1.v4().substr(0, 8)}_${eventCounter}`;
}
exports.getMessageId = getMessageId;
//# sourceMappingURL=util.js.map