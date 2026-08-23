import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/**/*.ts", "!./src/**/*.test.ts"],

  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  unbundle: true,

  deps: {
    // Bare specifiers (package imports) stay external — this package must
    // never bundle `runable` (resolved per-project at runtime, not from
    // here) nor its own regular dependencies.
    neverBundle: (id) => /^[^./]/.test(id),
  },

  outExtensions: () => ({ js: ".js" }),
});
