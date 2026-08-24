// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "coverage/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // stdout is reserved for the MCP protocol once a server is connected —
      // console.error (stderr) stays allowed for diagnostics.
      "no-console": ["error", { allow: ["error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // A dev-only, maintainer-run CLI script — never part of the MCP stdio
    // server, so the stdout-safety rule above doesn't apply here.
    files: ["scripts/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
);
