"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyCheckLeaks(mocha, checkLeaks) {
    if (checkLeaks) {
        mocha.checkLeaks();
    }
}
exports.default = applyCheckLeaks;
//# sourceMappingURL=check-leaks.js.map