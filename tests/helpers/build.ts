import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

export const repoRoot = fileURLToPath(new URL("../../", import.meta.url));
export const builtBinPath = fileURLToPath(
  new URL("../../dist/bin.js", import.meta.url),
);

const execFileAsync = promisify(execFile);

let buildPromise: Promise<void> | undefined;

/** Builds the package once per test run (memoized), so every test file that
 * needs the packaged CLI shares a single build instead of racing tsdown. */
export function ensureBuilt(): Promise<void> {
  buildPromise ??= execFileAsync("pnpm", ["build"], { cwd: repoRoot }).then(
    () => {
      if (!existsSync(builtBinPath)) {
        throw new Error(`Build finished but ${builtBinPath} is missing.`);
      }
    },
  );
  return buildPromise;
}
