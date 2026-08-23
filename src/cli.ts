/**
 * Argument parsing only — no I/O, no process wiring — kept separate from
 * `bin.ts` so it can be unit-tested without spawning a process or touching
 * stdio.
 */

export interface CliOptions {
  cwd: string;
  help: boolean;
  version: boolean;
}

export class CliArgumentError extends Error {
  override readonly name = "CliArgumentError";
}

export const HELP_TEXT = `Usage: runable-mcp [options]

Official Model Context Protocol server for Runable projects.
Connects over stdio and exposes read-only introspection tools backed by
the target project's own runable/inspector.

Options:
  --cwd <path>   Root directory of the Runable project to inspect (default: current directory)
  -h, --help     Print this help message
  -v, --version  Print the version number
`;

export function parseCliArgs(
  argv: string[],
  defaultCwd: string = process.cwd(),
): CliOptions {
  let cwd = defaultCwd;
  let help = false;
  let version = false;

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];

    switch (arg) {
      case "--cwd": {
        const value = argv[++index];
        if (!value) {
          throw new CliArgumentError('Missing value for "--cwd".');
        }
        cwd = value;
        break;
      }
      case "-h":
      case "--help":
        help = true;
        break;
      case "-v":
      case "--version":
        version = true;
        break;
      default:
        throw new CliArgumentError(`Unknown argument: "${arg}".`);
    }
  }

  return { cwd, help, version };
}
