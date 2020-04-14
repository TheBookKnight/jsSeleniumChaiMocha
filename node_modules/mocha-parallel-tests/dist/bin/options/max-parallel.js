"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyMaxParallel(mocha, maxParallel) {
    if (maxParallel !== undefined) {
        mocha.setMaxParallel(maxParallel);
    }
}
exports.default = applyMaxParallel;
//# sourceMappingURL=max-parallel.js.map