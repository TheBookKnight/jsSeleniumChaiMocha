"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const path_1 = require("path");
function applyReporter(mocha, reporter, reporterOptions) {
    assert_1.default.strictEqual(typeof reporter, 'string', '--reporter option can be specified only once');
    mocha.reporter(reporter, reporterOptions);
    // load reporter
    let Reporter;
    // required reporter can be in the process CWD
    const cwd = process.cwd();
    module.paths.push(cwd, path_1.join(cwd, 'node_modules'));
    try {
        Reporter = require(`mocha/lib/reporters/${reporter}`);
    }
    catch (ex) {
        try {
            Reporter = require(reporter);
        }
        catch (ex) {
            throw new Error(`Reporter "${reporter}" does not exist`);
        }
    }
    return Reporter;
}
exports.default = applyReporter;
//# sourceMappingURL=reporter.js.map