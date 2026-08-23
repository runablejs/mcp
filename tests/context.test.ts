import { afterEach, describe, expect, it } from "vitest";

import { createRunableContext } from "../src/context.js";
import {
  RunableInspectorUnavailableError,
  RunableNotInstalledError,
  RunableProjectError,
} from "../src/errors.js";
import {
  createFixtureProject,
  type FixtureProject,
} from "./helpers/fixture.js";

const cleanups: Array<() => Promise<void>> = [];

async function fixture(
  ...args: Parameters<typeof createFixtureProject>
): Promise<FixtureProject> {
  const project = await createFixtureProject(...args);
  cleanups.push(project.cleanup);
  return project;
}

afterEach(async () => {
  await Promise.all(cleanups.splice(0).map((cleanup) => cleanup()));
});

describe("createRunableContext", () => {
  it("creates a context for a valid Runable project", async () => {
    const project = await fixture({
      runable: { project: { rootDir: "unused", ssr: true } },
    });

    const context = await createRunableContext(project.rootDir);

    expect(context.rootDir).toBe(project.rootDir);
    await expect(context.inspector.getProject()).resolves.toEqual({
      rootDir: "unused",
      ssr: true,
    });
  });

  it("resolves runable from the target project, not from a shared/global install", async () => {
    const [projectA, projectB] = await Promise.all([
      fixture({
        runable: {
          project: { marker: "project-a" },
          version: "1.0.0-fixture-a",
        },
      }),
      fixture({
        runable: {
          project: { marker: "project-b" },
          version: "2.0.0-fixture-b",
        },
      }),
    ]);

    const [contextA, contextB] = await Promise.all([
      createRunableContext(projectA.rootDir),
      createRunableContext(projectB.rootDir),
    ]);

    const [resultA, resultB] = await Promise.all([
      contextA.inspector.getProject(),
      contextB.inspector.getProject(),
    ]);

    expect(resultA).toEqual({ marker: "project-a" });
    expect(resultB).toEqual({ marker: "project-b" });
  });

  it("throws RunableNotInstalledError when the project has no runable dependency", async () => {
    const project = await fixture({ runable: "missing" });

    await expect(createRunableContext(project.rootDir)).rejects.toBeInstanceOf(
      RunableNotInstalledError,
    );
  });

  it("throws RunableInspectorUnavailableError when runable doesn't expose ./inspector", async () => {
    const project = await fixture({ runable: { exposeInspector: false } });

    await expect(createRunableContext(project.rootDir)).rejects.toBeInstanceOf(
      RunableInspectorUnavailableError,
    );
  });

  it("wraps a rejected createRunableInspector() call, preserving the cause", async () => {
    const project = await fixture({
      runable: { rejectWith: "no runable.config.* file found" },
    });

    const error: unknown = await createRunableContext(project.rootDir).catch(
      (caught: unknown) => caught,
    );

    expect(error).toBeInstanceOf(RunableProjectError);
    expect((error as Error).message).toContain(
      "no runable.config.* file found",
    );
    expect((error as Error).cause).toBeInstanceOf(Error);
    expect(((error as Error).cause as Error).message).toBe(
      "no runable.config.* file found",
    );
  });
});
