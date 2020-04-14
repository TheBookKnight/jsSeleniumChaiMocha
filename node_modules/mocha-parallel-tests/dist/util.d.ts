/// <reference types="mocha" />
export interface CLICompilers {
    compilers: string[];
    extensions: string[];
}
export declare function setProcessExitListeners(): void;
export declare function applyFiles(mocha: Mocha, files: string | string[]): void;
export declare function applyRequires(requires: string | string[]): string[];
export declare function applyCompilers(compilers: string | string[]): CLICompilers;
export declare function applyDelay(mocha: Mocha, delay?: boolean): void;
export declare function applyGrepPattern(mocha: Mocha, stringPattern?: string): void;
export declare function applyNoTimeouts(mocha: Mocha, allowTimeouts?: boolean): void;
export declare function applyTimeouts(mocha: Mocha, timeout?: number): void;
