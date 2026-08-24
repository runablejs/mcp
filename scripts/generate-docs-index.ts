#!/usr/bin/env node
/**
 * Generates src/generated/docs-index.ts — the embedded documentation
 * dataset `search_api` searches — from Runable's own source Markdown docs.
 *
 * Source of truth (dev-time only, never touched by `pnpm build`/the
 * published package): `../runable/website/content/docs/en/**\/*.md`
 * (English only, for this v1), `../runable/website/app/lib/site-config.ts`
 * (for the public base URL), and `../runable/packages/runable/package.json`
 * (for the Runable version this documentation describes).
 *
 * Run with:
 *
 *   pnpm generate:docs-index
 *
 * The output is a plain, checked-in TypeScript file — not generated at
 * `pnpm build` time — specifically so `git clone && pnpm install && pnpm
 * build && pnpm test` never needs a `../runable` sibling checkout (the
 * same constraint the rest of this repo's tests already follow). Re-run
 * this script by hand and commit the result whenever Runable's docs change
 * meaningfully; there is currently no automated staleness check in CI,
 * since that would itself require a `../runable` checkout CI doesn't have
 * — see the project report's "search_api" section for this tradeoff.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = join(scriptDir, "..");
const runableRepoRoot = join(repoRoot, "..", "runable");
const docsRoot = join(runableRepoRoot, "website", "content", "docs", "en");
const siteConfigFile = join(
  runableRepoRoot,
  "website",
  "app",
  "lib",
  "site-config.ts",
);
const runablePackageJsonFile = join(
  runableRepoRoot,
  "packages",
  "runable",
  "package.json",
);
const outputFile = join(repoRoot, "src", "generated", "docs-index.ts");

interface RawEntry {
  title: string;
  url: string;
  section: string;
  excerpt: string;
  content: string;
  category: string;
}

function readSiteUrl(): string {
  const source = readFileSync(siteConfigFile, "utf8");
  const match = /export const SITE_URL = "([^"]+)"/.exec(source);
  if (!match) {
    throw new Error(
      `Could not find "export const SITE_URL = ...;" in ${siteConfigFile}`,
    );
  }
  return match[1]!;
}

function readRunableVersion(): string {
  const packageJson = JSON.parse(
    readFileSync(runablePackageJsonFile, "utf8"),
  ) as {
    version: string;
  };
  return packageJson.version;
}

function listMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) files.push(...listMarkdownFiles(fullPath));
    else if (extname(entry) === ".md") files.push(fullPath);
  }
  return files;
}

/** This repo's docs frontmatter is always a flat `key: value` block (see
 * the project report's "search_api" section for why a full YAML parser
 * wasn't worth adding for two string fields). */
function parseFrontmatter(source: string): {
  title: string;
  description: string;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match)
    throw new Error(
      "Expected a frontmatter block (--- ... ---) at the top of the file.",
    );

  const [, frontmatter, body] = match;
  let title: string | undefined;
  let description: string | undefined;

  for (const line of frontmatter!.split(/\r?\n/)) {
    const fieldMatch = /^(title|description):\s*(.*)$/.exec(line);
    if (!fieldMatch) continue;
    const [, key, value] = fieldMatch;
    if (key === "title") title = value!.trim();
    if (key === "description") description = value!.trim();
  }

  if (!title) throw new Error("Frontmatter is missing a title.");
  return { title, description: description ?? "", body: body! };
}

function cleanExcerpt(text: string, maxLength = 220): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= maxLength) return collapsed;
  return `${collapsed.slice(0, maxLength).trimEnd()}…`;
}

/** Splits a doc's body into one entry per `##`/`###` heading, plus one
 * leading entry for whatever comes before the first heading (the page's
 * own intro, which for the API reference pages is often the primary
 * function signature — too useful to drop). */
function splitIntoSections(
  body: string,
): { heading: string | undefined; content: string }[] {
  const lines = body.split(/\r?\n/);
  const sections: { heading: string | undefined; content: string[] }[] = [
    { heading: undefined, content: [] },
  ];

  for (const line of lines) {
    const headingMatch = /^#{1,3}\s+(.*)$/.exec(line);
    if (headingMatch) {
      sections.push({ heading: headingMatch[1]!.trim(), content: [] });
    } else {
      sections.at(-1)!.content.push(line);
    }
  }

  return sections
    .map((section) => ({
      heading: section.heading,
      content: section.content.join("\n").trim(),
    }))
    .filter(
      (section) => section.content.length > 0 || section.heading !== undefined,
    );
}

function buildEntries(filePath: string, siteUrl: string): RawEntry[] {
  const relativePath = relative(docsRoot, filePath).replace(/\\/g, "/");
  const category = relativePath.split("/")[0]!;
  const urlPath = `/docs/${relativePath.replace(/\.md$/, "")}`;
  const url = `${siteUrl}${urlPath}`;

  const source = readFileSync(filePath, "utf8");
  const { title, description, body } = parseFrontmatter(source);
  const sections = splitIntoSections(body);

  return sections.map((section) => {
    const isPageLevel = section.heading === undefined;
    return {
      title,
      url,
      section: isPageLevel ? description : section.heading!,
      excerpt: cleanExcerpt(section.content || description),
      content: section.content,
      category,
    };
  });
}

function main(): void {
  const siteUrl = readSiteUrl();
  const runableVersion = readRunableVersion();
  const files = listMarkdownFiles(docsRoot).sort();

  const entries = files.flatMap((file) => buildEntries(file, siteUrl));

  const meta = {
    runableVersion,
    generatedAt: new Date().toISOString(),
    sourceFileCount: files.length,
  };

  const header = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/generate-docs-index.ts from Runable's own source
 * documentation. Re-run \`pnpm generate:docs-index\` (requires a
 * \`../runable\` sibling checkout) to refresh it, and commit the result —
 * this file itself has no further dependency on \`../runable\` and is what
 * ships in the published package.
 */

import type { DocsIndexEntry, DocsIndexMeta } from "../search/types.js";

export const DOCS_INDEX_META: DocsIndexMeta = ${JSON.stringify(meta, null, 2)};

export const DOCS_INDEX: DocsIndexEntry[] = ${JSON.stringify(entries, null, 2)};
`;

  writeFileSync(outputFile, header);

  console.log(
    `Wrote ${entries.length} entries from ${files.length} files (runable@${runableVersion}) to ${relative(repoRoot, outputFile)}`,
  );
}

main();
