#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const mocha_1 = __importDefault(require("../main/mocha"));
const util_1 = require("../util");
const async_only_1 = __importDefault(require("./options/async-only"));
const bail_1 = __importDefault(require("./options/bail"));
const check_leaks_1 = __importDefault(require("./options/check-leaks"));
const compilers_1 = __importDefault(require("./options/compilers"));
const delay_1 = __importDefault(require("./options/delay"));
const exit_1 = __importDefault(require("./options/exit"));
const forbid_only_1 = __importDefault(require("./options/forbid-only"));
const forbid_pending_1 = __importDefault(require("./options/forbid-pending"));
const full_trace_1 = __importDefault(require("./options/full-trace"));
const grep_1 = __importDefault(require("./options/grep"));
const max_parallel_1 = __importDefault(require("./options/max-parallel"));
const no_timeouts_1 = __importDefault(require("./options/no-timeouts"));
const reporter_1 = __importDefault(require("./options/reporter"));
const reporter_options_1 = __importDefault(require("./options/reporter-options"));
const require_1 = __importDefault(require("./options/require"));
const file_1 = __importDefault(require("./options/file"));
const rest_1 = __importDefault(require("./options/rest"));
const retries_1 = __importDefault(require("./options/retries"));
const slow_1 = __importDefault(require("./options/slow"));
const timeout_1 = __importDefault(require("./options/timeout"));
util_1.setProcessExitListeners();
// mocha@6 introduced a new way to parse CLI arguments through yargs context
// this mechanism should be used if `loadOptions` is defined
const yargsOptionalArgs = [];
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadOptions } = require('mocha/lib/cli/options');
    yargsOptionalArgs.push(loadOptions(process.argv));
}
catch (ex) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const getOptions = require('mocha/bin/options');
    // NB: legacy (mocha before version 6)
    // --opts changes process.argv so it should be executed first
    getOptions();
}
// starting from mocha@6 `--no-timeout` and `--no-timeouts` is the same thing
const newTimeoutsBehaviour = yargsOptionalArgs.length === 1;
// starting from mocha@6 `--reporter-options` option type is array
const newReporterOptionsType = yargsOptionalArgs.length === 1;
const mocha = new mocha_1.default();
const argv = yargs_1.default
    .option('async-only', {
    alias: 'A',
    boolean: true,
})
    .option('bail', {
    alias: 'b',
    boolean: true,
})
    .option('check-leaks', {
    boolean: true,
})
    .option('compilers', {
    default: [],
})
    .option('delay', {
    boolean: true,
})
    .option('exit', {
    boolean: true,
})
    .option('forbidOnly', {
    boolean: true,
})
    .option('forbidPending', {
    boolean: true,
})
    .option('full-trace', {
    boolean: true,
})
    .option('max-parallel', {
    number: true,
})
    .option('grep', {
    alias: 'g',
    string: true,
})
    .option('recursive', {
    boolean: true,
})
    .option('reporter', {
    alias: 'R',
    default: 'spec',
    string: true,
})
    .option('reporter-options', {
    alias: 'O',
    string: !newReporterOptionsType,
    array: newReporterOptionsType,
})
    .option('retries', {
    number: true,
})
    .option('file', {
    default: [],
})
    .option('require', {
    alias: 'r',
    default: [],
})
    .option('slow', {
    alias: 's',
    number: true,
})
    .option('timeout', {
    alias: 't',
    number: true,
})
    .option('timeouts', {
    boolean: !newTimeoutsBehaviour,
    number: newTimeoutsBehaviour,
})
    .parse(process.argv, ...yargsOptionalArgs);
// --async-only
async_only_1.default(mocha, argv['async-only']);
// --bail
bail_1.default(mocha, argv.bail);
// --check-leaks
check_leaks_1.default(mocha, argv['check-leaks']);
// --compilers
const { compilers, extensions } = compilers_1.default(argv.compilers);
mocha.addCompilersForSubprocess(compilers);
// --delay
delay_1.default(mocha, argv.delay);
// --exit
exit_1.default(mocha, argv.exit);
// --forbid-only
forbid_only_1.default(mocha, argv.forbidOnly);
// --forbid-pending
forbid_pending_1.default(mocha, argv.forbidPending);
// --full-trace
full_trace_1.default(mocha, argv['full-trace']);
// --grep option
grep_1.default(mocha, argv.grep);
// --max-parallel
max_parallel_1.default(mocha, argv['max-parallel']);
// --no-timeouts
if (newTimeoutsBehaviour) {
    const enableTimeouts = Boolean(argv.timeout || argv.timeouts);
    no_timeouts_1.default(mocha, enableTimeouts);
}
else {
    no_timeouts_1.default(mocha, argv.timeouts);
}
// --r, --require
const requires = require_1.default(argv.require);
mocha.addRequiresForSubprocess(requires);
// --file
file_1.default(mocha, argv.file);
// --reporter-options
const argvReporterOptions = newReporterOptionsType
    ? argv['reporter-options']
    : [argv['reporter-options']];
const reporterOptions = argv['reporter-options'] !== undefined
    ? reporter_options_1.default(argvReporterOptions)
    : {};
// --reporter
reporter_1.default(mocha, argv.reporter, reporterOptions);
// --retries
retries_1.default(mocha, argv.retries);
// --slow
slow_1.default(mocha, argv.slow);
// --timeout
timeout_1.default(mocha, argv.timeout);
// find files
const files = rest_1.default(argv._.slice(2), extensions, argv.recursive || false);
if (!files.length) {
    // eslint-disable-next-line no-console
    console.error('No test files found');
    process.exit(1);
}
for (const file of files) {
    mocha.addFile(file);
}
const isTypescriptRun = argv.$0.endsWith('.ts');
if (isTypescriptRun) {
    mocha.setTypescriptRunMode();
}
mocha.run((code) => {
    process.on('exit', function onExit() {
        process.exit(Math.min(code, 255));
    });
});
//# sourceMappingURL=cli.js.map