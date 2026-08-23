import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

interface PackageJsonShape {
  name: string;
  version: string;
}

function readOwnPackageJson(): PackageJsonShape {
  // This file always sits directly under either `src/` or `dist/`, one
  // level below the package root — both in development and once built.
  const packageJsonPath = fileURLToPath(
    new URL("../package.json", import.meta.url),
  );
  return JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJsonShape;
}

const ownPackageJson = readOwnPackageJson();

export const MCP_SERVER_NAME = ownPackageJson.name;
export const MCP_SERVER_VERSION = ownPackageJson.version;
