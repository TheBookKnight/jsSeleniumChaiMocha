export interface CLIReporterOptions {
    [key: string]: string | boolean;
}
export default function applyReporterOptions(reporterOptions: string[]): CLIReporterOptions;
