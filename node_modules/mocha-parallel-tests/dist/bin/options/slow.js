"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applySlow(mocha, slow) {
    if (slow) {
        mocha.suite.slow(slow);
    }
}
exports.default = applySlow;
//# sourceMappingURL=slow.js.map