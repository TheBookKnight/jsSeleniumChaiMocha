"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyBail(mocha, bail) {
    mocha.suite.bail(bail || false);
}
exports.default = applyBail;
//# sourceMappingURL=bail.js.map