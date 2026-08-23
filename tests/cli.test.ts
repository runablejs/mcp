import { describe, expect, it } from "vitest";

import { CliArgumentError, parseCliArgs } from "../src/cli.js";

describe("parseCliArgs", () => {
  it("defaults cwd to the provided default (process.cwd() in practice)", () => {
    const options = parseCliArgs([], "/default/cwd");

    expect(options).toEqual({
      cwd: "/default/cwd",
      help: false,
      version: false,
    });
  });

  it("uses --cwd when provided", () => {
    const options = parseCliArgs(
      ["--cwd", "/workspace/my-project"],
      "/default/cwd",
    );

    expect(options.cwd).toBe("/workspace/my-project");
  });

  it("recognizes --help and -h", () => {
    expect(parseCliArgs(["--help"]).help).toBe(true);
    expect(parseCliArgs(["-h"]).help).toBe(true);
  });

  it("recognizes --version and -v", () => {
    expect(parseCliArgs(["--version"]).version).toBe(true);
    expect(parseCliArgs(["-v"]).version).toBe(true);
  });

  it("throws CliArgumentError when --cwd has no value", () => {
    expect(() => parseCliArgs(["--cwd"])).toThrow(CliArgumentError);
  });

  it("throws CliArgumentError on an unknown argument", () => {
    expect(() => parseCliArgs(["--bogus"])).toThrow(CliArgumentError);
  });
});
