import type {
  RunableAutoImportsInfo,
  RunableConfigInfo,
  RunableLayoutInfo,
  RunableMiddlewareInfo,
  RunableModuleInfo,
  RunablePluginInfo,
  RunableProjectInfo,
  RunableRouteInfo,
} from "../runable-inspector.js";

/**
 * Every Inspector getter's result, loaded once and shared by every rule —
 * see context.ts. Rules never call the Inspector themselves.
 */
export interface DiagnosticContext {
  project: RunableProjectInfo;
  config: RunableConfigInfo;
  routes: RunableRouteInfo[];
  layouts: RunableLayoutInfo[];
  middlewares: RunableMiddlewareInfo[];
  plugins: RunablePluginInfo[];
  modules: RunableModuleInfo[];
  autoImports: RunableAutoImportsInfo;
}

export type DiagnosticSeverity = "info" | "warning" | "error";

export interface DiagnosticIssue {
  /** Stable, machine-matchable identifier, e.g. "route-layout-missing". */
  code: string;
  severity: DiagnosticSeverity;
  /** Short, human-readable description of the problem. */
  message: string;
  /** Project file the issue is about, relative to rootDir, if applicable. */
  file?: string;
  /** Route path the issue is about, if applicable. */
  route?: string;
  /** A concrete, actionable next step, if there's an unambiguous one. */
  suggestion?: string;
}

/**
 * A single, self-contained, deterministic check. Every rule sees the exact
 * same pre-loaded `DiagnosticContext` — no rule calls the Inspector on its
 * own, so adding a rule never adds another round trip.
 */
export interface DiagnosticRule {
  /** Matches the `code` on every `DiagnosticIssue` this rule produces. */
  code: string;
  run(
    context: DiagnosticContext,
  ): DiagnosticIssue[] | Promise<DiagnosticIssue[]>;
}

export interface DiagnosticSummary {
  errors: number;
  warnings: number;
  info: number;
}

export interface DiagnosticResult {
  /** `false` whenever at least one `error`-severity issue was found. */
  valid: boolean;
  summary: DiagnosticSummary;
  issues: DiagnosticIssue[];
}
