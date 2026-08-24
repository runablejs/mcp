/**
 * The one scenario tests/real-inspector.test.ts (in-memory transport)
 * can't observe: whether stdout itself stays clean over a *real* stdio
 * session against the actual published `runable` package — specifically
 * for get_config, the one call proven to trigger dotenv's own stdout
 * notice (see project-output-redirect.ts).
 *
 * REAL_RUNABLE_VERSION (tests/helpers/real-runable-fixture.ts) is pinned to
 * the currently-published `runable`, which does *not* yet include the
 * `loadRuntimeEnv({ quiet: true })` fix made in ../runable/ as part of this
 * same change (unpublished — see the project report). So this test proves
 * @runablejs/mcp's own defense holds regardless: stdout stays clean either
 * way, whether or not the noise is present at all. It does not (and can't,
 * without publishing) prove the upstream fix itself; that's covered by
 * ../runable/'s own regression test.
 */

import { Client } from "@modelcontextprotocol/client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  createRealRunableFixture,
  type RealRunableFixture,
} from "./helpers/real-runable-fixture.js";
import { builtBinPath, ensureBuilt } from "./helpers/build.js";
import { SniffingStdioClientTransport } from "./helpers/sniffing-transport.js";

let fixture: RealRunableFixture;

beforeAll(async () => {
  await ensureBuilt();
  fixture = await createRealRunableFixture();
}, 300_000);

afterAll(async () => {
  await fixture?.cleanup();
});

describe("get_config over real stdio, against the real published runable", () => {
  it("keeps stdout clean regardless of whatever dotenv writes", async () => {
    const transport = new SniffingStdioClientTransport(process.execPath, [
      builtBinPath,
      "--cwd",
      fixture.rootDir,
    ]);
    const client = new Client({ name: "test-client", version: "0.0.0" });

    try {
      // `transport.stderr` only exists once the child process has actually
      // been spawned, which `connect()` does internally — attaching the
      // listener any earlier would silently attach to nothing.
      await client.connect(transport);
      let stderr = "";
      transport.stderr?.on("data", (chunk: Buffer) => {
        stderr += chunk.toString("utf8");
      });

      const result = await client.callTool({
        name: "get_config",
        arguments: {},
      });

      expect(result.isError).toBeFalsy();
      // The actual invariant this test exists for: nothing but framed
      // JSON-RPC ever reached stdout, whether or not dotenv's notice fired
      // at all (it may or may not, depending on the published version).
      expect(transport.nonProtocolLines).toEqual([]);

      // Session integrity after the redirected call.
      const projectResult = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(projectResult.isError).toBeFalsy();

      // Documents today's known state rather than asserting it should stay
      // this way: the pinned REAL_RUNABLE_VERSION predates the upstream
      // fix, so dotenv's notice is expected here — on stderr, never
      // stdout. Once a fixed `runable` is published and this pin is
      // bumped, this line should be updated to expect silence instead.
      expect(stderr).toContain("injected env");
    } finally {
      await client.close();
    }
  });
});
