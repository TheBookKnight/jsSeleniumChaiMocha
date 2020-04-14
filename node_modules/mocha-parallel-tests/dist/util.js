"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function setProcessExitListeners() {
    process.on('unhandledRejection', (reason) => {
        const message = reason && 'stack' in reason
            ? reason.stack
            : 'Unhandled asynchronous exception';
        // eslint-disable-next-line no-console
        console.error(`Unhandled asynchronous exception: ${message}`);
        process.exit(1);
    });
    process.on('uncaughtException', (err) => {
        // eslint-disable-next-line no-console
        console.error(`Uncaught exception: ${err.stack}`);
        process.exit(1);
    });
}
exports.setProcessExitListeners = setProcessExitListeners;
function applyFiles(mocha, files) {
    const fileList = Array.isArray(files) ? files : [files];
    if (fileList) {
        mocha.files = fileList.concat(mocha.files);
    }
}
exports.applyFiles = applyFiles;
function applyRequires(requires) {
    const requiresList = Array.isArray(requires) ? requires : [requires];
    const output = [];
    // required file can be in the process CWD
    const cwd = process.cwd();
    module.paths.push(cwd, path_1.join(cwd, 'node_modules'));
    for (const mod of requiresList) {
        const abs = fs_1.existsSync(mod) || fs_1.existsSync(`${mod}.js`);
        const requirePath = abs ? path_1.resolve(mod) : mod;
        require(requirePath);
        output.push(requirePath);
    }
    return output;
}
exports.applyRequires = applyRequires;
function applyCompilers(compilers) {
    const compilersList = Array.isArray(compilers) ? compilers : [compilers];
    const output = {
        compilers: compilersList,
        extensions: ['js'],
    };
    // required compiler can be in the process CWD
    const cwd = process.cwd();
    module.paths.push(cwd, path_1.join(cwd, 'node_modules'));
    for (const compiler of compilersList) {
        const idx = compiler.indexOf(':');
        const ext = compiler.slice(0, idx);
        let mod = compiler.slice(idx + 1);
        if (mod.startsWith('.')) {
            mod = path_1.join(process.cwd(), mod);
        }
        require(mod);
        output.extensions.push(ext);
    }
    return output;
}
exports.applyCompilers = applyCompilers;
function applyDelay(mocha, delay) {
    if (delay) {
        mocha.delay();
    }
}
exports.applyDelay = applyDelay;
function applyGrepPattern(mocha, stringPattern) {
    if (stringPattern) {
        mocha.grep(stringPattern);
    }
}
exports.applyGrepPattern = applyGrepPattern;
function applyNoTimeouts(mocha, allowTimeouts) {
    if (allowTimeouts === false) {
        mocha.enableTimeouts(false);
    }
}
exports.applyNoTimeouts = applyNoTimeouts;
function applyTimeouts(mocha, timeout) {
    if (timeout !== undefined) {
        mocha.suite.timeout(timeout);
    }
}
exports.applyTimeouts = applyTimeouts;
//# sourceMappingURL=util.js.map