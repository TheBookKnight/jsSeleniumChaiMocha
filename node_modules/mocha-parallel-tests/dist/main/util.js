"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const DEBUG_CLI_ARGS = ['--inspect', '--debug', '--debug-brk', '--inspect-brk'];
const noop = () => null;
function removeDebugArgs(arg) {
    return !DEBUG_CLI_ARGS.includes(arg);
}
exports.removeDebugArgs = removeDebugArgs;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function subprocessParseReviver(_, value) {
    if (typeof value !== 'object' || value === null) {
        return value;
    }
    if (value.type === 'test') {
        const test = new mocha_1.Test(value.title, noop);
        // mimic test.fn as much as we can
        Object.assign(test, value);
        if (test.fn) {
            test.fn.toString = () => value.body;
        }
        return test;
    }
    if (value.type === 'hook') {
        const hook = new mocha_1.Hook(value.title, noop);
        return Object.assign(hook, value);
    }
    if (Array.isArray(value.suites)) {
        const ctx = new mocha_1.Context();
        const suite = new mocha_1.Suite(value.title, ctx);
        return Object.assign(suite, value);
    }
    return value;
}
exports.subprocessParseReviver = subprocessParseReviver;
//# sourceMappingURL=util.js.map