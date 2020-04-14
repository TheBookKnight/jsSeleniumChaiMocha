import Mocha, { reporters } from 'mocha';
import { CLIReporterOptions } from './reporter-options';
export default function applyReporter(mocha: Mocha, reporter: string, reporterOptions: CLIReporterOptions): reporters.Base;
