"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyFullTrace(mocha, fullTrace) {
    if (fullTrace) {
        mocha.options.fullStackTrace = true;
    }
}
exports.default = applyFullTrace;
//# sourceMappingURL=full-trace.js.map