"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { lookupFiles: mochaLookupFiles } = require('mocha/lib/utils');
function getFilesList(rest, extensions, recursive) {
    const filesList = rest.length ? rest : ['test'];
    const output = [];
    for (const file of filesList) {
        try {
            const newFiles = mochaLookupFiles(file, extensions, recursive);
            const newFilesList = Array.isArray(newFiles) ? newFiles : [newFiles];
            output.push(...newFilesList);
        }
        catch (err) {
            if (err.message.startsWith('cannot resolve path')) {
                // eslint-disable-next-line no-console
                console.error(`Warning: Could not find any test files matching pattern: ${file}`);
                continue;
            }
            throw err;
        }
    }
    return output;
}
exports.default = getFilesList;
//# sourceMappingURL=rest.js.map