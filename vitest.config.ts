import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    testTimeout: 30_000,
    // Several files (stdio.test.ts, stdout-boundary.test.ts,
    // packaging.test.ts, real-inspector*.test.ts) each spawn real child
    // Node processes over stdio and share the same built dist/ — running
    // them in parallel worker threads risks CPU/file-descriptor
    // contention that shows up as a spurious "Connection closed" on an
    // otherwise-correct child process. Sequential execution is slower but
    // deterministic.
    fileParallelism: false,
  },
});
