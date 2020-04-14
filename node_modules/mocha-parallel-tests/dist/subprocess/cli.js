"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const config_1 = require("../config");
const runner_1 = require("./runner");
function isDebugSubprocesss(argv) {
    return argv[config_1.DEBUG_SUBPROCESS.yargs];
}
function threadOptionsFromArgv(argv) {
    return {
        bail: argv.bail,
        compilers: argv.compilers,
        delay: argv.delay || false,
        enableTimeouts: argv.enableTimeouts,
        exitImmediately: argv.exit || false,
        fullTrace: argv['full-trace'] || false,
        grep: argv.grep,
        isTypescriptRunMode: isDebugSubprocesss(argv),
        requires: argv.require,
        retries: argv.retries,
        slow: argv.slow,
        timeout: argv.timeout,
        file: argv.file,
    };
}
const argv = yargs_1.default
    .boolean('bail')
    .option('compilers', {
    array: true,
    default: [],
})
    .boolean('delay')
    .string('grep')
    .boolean('enableTimeouts')
    .option('exit', {
    boolean: true,
})
    .option('full-trace', {
    boolean: true,
})
    .boolean('slow')
    .option('test', {
    demandOption: true,
    string: true,
})
    .option('require', {
    array: true,
    default: [],
})
    .option('file', {
    array: true,
    default: []
})
    .number('retries')
    .number('timeout')
    .parse(process.argv);
const debugSubprocess = isDebugSubprocesss(argv);
const options = threadOptionsFromArgv(argv);
runner_1.runMocha(argv.test, options, debugSubprocess);
//# sourceMappingURL=cli.js.map