import { describe, expect, it } from "vitest";

import { projectOutputSchema } from "../src/tools/get-project.js";
import type { RunableProjectInfo } from "../src/runable-inspector.js";

describe("get_project's output schema", () => {
  it("accepts a realistic InspectorProject-shaped payload without rejecting it", () => {
    const sample: RunableProjectInfo = {
      rootDir: "/workspace/my-project",
      runableVersion: "1.0.0-alpha.4",
      ssr: true,
      paths: {
        appDir: "app",
        generatedDir: ".app",
        outputDir: ".output",
        publicDir: "public",
      },
    };

    expect(() => projectOutputSchema.parse(sample)).not.toThrow();
  });

  it("accepts the fields that are legitimately absent (no publicDir, no runableVersion)", () => {
    const sample: RunableProjectInfo = {
      rootDir: "/workspace/my-project",
      runableVersion: undefined,
      ssr: false,
      paths: {
        appDir: "app",
        generatedDir: ".app",
        outputDir: ".output",
        publicDir: undefined,
      },
    };

    expect(() => projectOutputSchema.parse(sample)).not.toThrow();
  });
});
