import type { DiagnosticRule } from "../types.js";
import { routeLayoutMissingRule } from "./route-layout-missing.js";
import { routeMiddlewareMissingRule } from "./route-middleware-missing.js";
import { routeNameDuplicateRule } from "./route-name-duplicate.js";
import { routePathDuplicateRule } from "./route-path-duplicate.js";
import { pluginDependencyMissingRule } from "./plugin-dependency-missing.js";
import { layoutNameDuplicateRule } from "./layout-name-duplicate.js";
import { middlewareNameDuplicateRule } from "./middleware-name-duplicate.js";

/** Every rule `diagnose` runs — add a new one here once it's written. */
export const diagnosticRules: DiagnosticRule[] = [
  routeLayoutMissingRule,
  routeMiddlewareMissingRule,
  routeNameDuplicateRule,
  routePathDuplicateRule,
  pluginDependencyMissingRule,
  layoutNameDuplicateRule,
  middlewareNameDuplicateRule,
];
