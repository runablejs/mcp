/**
 * A `Transport` that spawns the given command itself (like
 * `StdioClientTransport`) but also records every raw line it reads from the
 * child's stdout — including ones that fail to parse as JSON. Used to prove
 * nothing but framed JSON-RPC messages ever reaches stdout during a real
 * session, on top of exercising the real `Client` protocol logic.
 */

import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

import type { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";

export class SniffingStdioClientTransport implements Transport {
  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  /** Every stdout line that could not be parsed as a JSON-RPC message. */
  readonly nonProtocolLines: string[] = [];

  private child: ChildProcessWithoutNullStreams | undefined;
  private buffer = "";

  constructor(
    private readonly command: string,
    private readonly args: string[],
    private readonly options: { cwd?: string } = {},
  ) {}

  async start(): Promise<void> {
    const child = spawn(this.command, this.args, {
      cwd: this.options.cwd,
      stdio: ["pipe", "pipe", "pipe"],
    });
    this.child = child;

    child.stdout.on("data", (chunk: Buffer) => {
      this.buffer += chunk.toString("utf8");
      let newlineIndex = this.buffer.indexOf("\n");
      while (newlineIndex >= 0) {
        const line = this.buffer.slice(0, newlineIndex).replace(/\r$/, "");
        this.buffer = this.buffer.slice(newlineIndex + 1);
        if (line.length > 0) this.handleLine(line);
        newlineIndex = this.buffer.indexOf("\n");
      }
    });

    child.on("error", (error) => this.onerror?.(error));
    child.on("close", () => this.onclose?.());
  }

  private handleLine(line: string): void {
    try {
      const message = JSON.parse(line) as JSONRPCMessage;
      this.onmessage?.(message);
    } catch {
      this.nonProtocolLines.push(line);
    }
  }

  get stderr(): ChildProcessWithoutNullStreams["stderr"] | undefined {
    return this.child?.stderr;
  }

  async send(message: JSONRPCMessage): Promise<void> {
    const child = this.child;
    if (!child) throw new Error("Transport not started.");

    await new Promise<void>((resolvePromise, reject) => {
      child.stdin.write(`${JSON.stringify(message)}\n`, (error) => {
        if (error) reject(error);
        else resolvePromise();
      });
    });
  }

  async close(): Promise<void> {
    this.child?.kill();
  }
}
