import Mocha from 'mocha';
import RunnerMain from './runner';
export default class MochaWrapper extends Mocha {
    private isTypescriptRunMode;
    private maxParallel;
    private requires;
    private compilers;
    private exitImmediately;
    setTypescriptRunMode(): void;
    /**
     * All `--require` options should be applied for subprocesses
     */
    addRequiresForSubprocess(requires: string[]): void;
    /**
     * All `--compiler` options should be applied for subprocesses
     */
    addCompilersForSubprocess(compilers: string[]): void;
    setMaxParallel(maxParallel: number): void;
    enableExitMode(): this;
    run(onComplete?: (failures: number) => void): RunnerMain;
    private addSubprocessSuites;
    private extractSubprocessRetriedTests;
    private runThread;
    private getThreadOptions;
}
