"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyAsyncOnly(mocha, asyncOnly) {
    if (asyncOnly) {
        mocha.asyncOnly();
    }
}
exports.default = applyAsyncOnly;
//# sourceMappingURL=async-only.js.map