"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyRetries(mocha, retries) {
    if (retries) {
        mocha.suite.retries(retries);
    }
}
exports.default = applyRetries;
//# sourceMappingURL=retries.js.map