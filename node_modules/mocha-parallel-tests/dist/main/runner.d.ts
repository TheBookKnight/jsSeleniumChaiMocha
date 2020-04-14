import { Runner } from 'mocha';
import { SubprocessResult } from '../message-channel';
import { RetriedTest, Suite } from '../mocha';
export default class RunnerMain extends Runner {
    private rootSuite;
    private retriedTests;
    private subprocessTestResults;
    constructor(rootSuite: Suite);
    emitStartEvents(): void;
    emitFinishEvents(onComplete?: (failures: number) => void): void;
    reEmitSubprocessEvents(testResults: SubprocessResult, retriedTests: RetriedTest[]): void;
    private onFail;
    private onExecutionComplete;
    private setRetriesTests;
    private findSuiteById;
    private findRetriedTestById;
    private findTestById;
    private findHookById;
    /**
     * Sometimes mocha "forgets" to replace the test in suite.tests
     * Example of this can be a sync test which fails twice and passes on third run
     * If the test is executed with `--retries 2` we will get this result
     */
    private findForgottenTestById;
    private emitSubprocessEvents;
    private isRunnerMessage;
}
