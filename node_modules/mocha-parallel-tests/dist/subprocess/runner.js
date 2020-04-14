"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = __importDefault(require("mocha"));
const message_channel_1 = __importDefault(require("./message-channel"));
const reporter_1 = require("./reporter");
const util_1 = require("../util");
const exit_1 = __importDefault(require("./options/exit"));
const full_trace_1 = __importDefault(require("./options/full-trace"));
const config_1 = require("../config");
function runMocha(file, options, debugSubprocess) {
    const channel = new message_channel_1.default();
    const Reporter = reporter_1.getReporterFactory(channel, debugSubprocess);
    const mocha = new mocha_1.default();
    mocha.addFile(file);
    // --compilers
    util_1.applyCompilers(options.compilers);
    // --delay
    util_1.applyDelay(mocha, options.delay);
    // --grep
    util_1.applyGrepPattern(mocha, options.grep);
    // --enableTimeouts
    util_1.applyNoTimeouts(mocha, options.enableTimeouts);
    // --exit
    const onComplete = exit_1.default(channel, options.exitImmediately);
    // --file
    util_1.applyFiles(mocha, options.file);
    // --require
    util_1.applyRequires(options.requires);
    // --timeout
    util_1.applyTimeouts(mocha, options.timeout);
    // --full-trace
    full_trace_1.default(mocha, options.fullTrace);
    // apply main process root suite properties
    for (const option of config_1.SUITE_OWN_OPTIONS) {
        const suiteProp = `_${option}`;
        mocha.suite[suiteProp] = options[option];
    }
    mocha.reporter(Reporter).run(onComplete);
}
exports.runMocha = runMocha;
//# sourceMappingURL=runner.js.map