import type { ApiSearchResult, DocsIndexEntry } from "./types.js";

/**
 * A compact BM25F index built lazily from the generated documentation.
 *
 * BM25F keeps BM25's inverse-document-frequency ranking while combining
 * several fields with different weights. This matters for API docs: a symbol
 * in a title is much stronger evidence than the same word mentioned once in
 * a long guide, without making body text unsearchable.
 */

const K1 = 1.2;
const B = 0.75;

const FIELD_WEIGHTS = {
  title: 8,
  section: 4,
  content: 1,
  category: 0.5,
} as const;

type FieldName = keyof typeof FIELD_WEIGHTS;

interface IndexedDocument {
  entry: DocsIndexEntry;
  normalizedTitle: string;
  normalizedSection: string;
  fieldLengths: Record<FieldName, number>;
}

interface Posting {
  documentIndex: number;
  frequencies: Partial<Record<FieldName, number>>;
}

interface SearchIndex {
  documents: IndexedDocument[];
  averageFieldLengths: Record<FieldName, number>;
  postings: Map<string, Posting[]>;
}

const indexCache = new WeakMap<DocsIndexEntry[], SearchIndex>();

function normalizeText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Keeps a code symbol as one term and also indexes its camelCase components:
 * `useAsyncData` becomes `useasyncdata`, `use`, `async`, and `data`.
 * Natural-language queries can therefore find API symbols without weakening
 * exact symbol searches.
 */
function tokenize(text: string): string[] {
  const accentless = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const rawTokens = accentless.match(/[A-Za-z0-9_$]+/g) ?? [];
  const tokens: string[] = [];

  for (const rawToken of rawTokens) {
    const whole = rawToken.toLowerCase();
    if (whole.length < 2) continue;
    tokens.push(whole);

    const components = rawToken
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .toLowerCase()
      .split(" ")
      .filter((component) => component.length >= 2);
    if (components.length > 1) tokens.push(...components);
  }

  return tokens;
}

function frequencies(tokens: string[]): Map<string, number> {
  const result = new Map<string, number>();
  for (const token of tokens) result.set(token, (result.get(token) ?? 0) + 1);
  return result;
}

function buildIndex(entries: DocsIndexEntry[]): SearchIndex {
  const postingsByTerm = new Map<
    string,
    Map<number, Partial<Record<FieldName, number>>>
  >();
  const totalFieldLengths: Record<FieldName, number> = {
    title: 0,
    section: 0,
    content: 0,
    category: 0,
  };

  const documents = entries.map((entry, documentIndex): IndexedDocument => {
    const fields: Record<FieldName, string> = {
      title: entry.title,
      section: entry.section,
      content: entry.content,
      category: entry.category,
    };
    const fieldLengths = {} as Record<FieldName, number>;

    for (const field of Object.keys(FIELD_WEIGHTS) as FieldName[]) {
      const tokens = tokenize(fields[field]);
      fieldLengths[field] = tokens.length;
      totalFieldLengths[field] += tokens.length;

      for (const [term, count] of frequencies(tokens)) {
        let documentsForTerm = postingsByTerm.get(term);
        if (!documentsForTerm) {
          documentsForTerm = new Map();
          postingsByTerm.set(term, documentsForTerm);
        }
        const fieldFrequencies = documentsForTerm.get(documentIndex) ?? {};
        fieldFrequencies[field] = count;
        documentsForTerm.set(documentIndex, fieldFrequencies);
      }
    }

    return {
      entry,
      normalizedTitle: normalizeText(entry.title).trim(),
      normalizedSection: normalizeText(entry.section).trim(),
      fieldLengths,
    };
  });

  const documentCount = Math.max(documents.length, 1);
  const averageFieldLengths = Object.fromEntries(
    (Object.keys(FIELD_WEIGHTS) as FieldName[]).map((field) => [
      field,
      totalFieldLengths[field] / documentCount,
    ]),
  ) as unknown as Record<FieldName, number>;

  const postings = new Map<string, Posting[]>();
  for (const [term, documentsForTerm] of postingsByTerm) {
    postings.set(
      term,
      [...documentsForTerm].map(([documentIndex, fieldFrequencies]) => ({
        documentIndex,
        frequencies: fieldFrequencies,
      })),
    );
  }

  return { documents, averageFieldLengths, postings };
}

function getIndex(entries: DocsIndexEntry[]): SearchIndex {
  const cached = indexCache.get(entries);
  if (cached) return cached;
  const index = buildIndex(entries);
  indexCache.set(entries, index);
  return index;
}

function normalizedFieldFrequency(
  document: IndexedDocument,
  frequenciesByField: Partial<Record<FieldName, number>>,
  averageFieldLengths: Record<FieldName, number>,
): number {
  let result = 0;
  for (const field of Object.keys(FIELD_WEIGHTS) as FieldName[]) {
    const frequency = frequenciesByField[field] ?? 0;
    if (frequency === 0) continue;
    const averageLength = averageFieldLengths[field] || 1;
    const lengthNormalization =
      1 - B + B * (document.fieldLengths[field] / averageLength);
    result += (FIELD_WEIGHTS[field] * frequency) / lengthNormalization;
  }
  return result;
}

export function searchDocs(
  entries: DocsIndexEntry[],
  query: string,
  limit: number,
): ApiSearchResult[] {
  const normalizedQuery = normalizeText(query).trim();
  const queryTerms = [...new Set(tokenize(query))];
  if (!normalizedQuery || queryTerms.length === 0 || limit <= 0) return [];

  const index = getIndex(entries);
  const documentCount = index.documents.length;
  if (documentCount === 0) return [];

  const scores = new Map<number, number>();
  const matchedTerms = new Map<number, number>();

  for (const term of queryTerms) {
    const postings = index.postings.get(term);
    if (!postings) continue;

    const documentFrequency = postings.length;
    const inverseDocumentFrequency = Math.log(
      1 + (documentCount - documentFrequency + 0.5) / (documentFrequency + 0.5),
    );

    for (const posting of postings) {
      const document = index.documents[posting.documentIndex]!;
      const fieldFrequency = normalizedFieldFrequency(
        document,
        posting.frequencies,
        index.averageFieldLengths,
      );
      const termScore =
        (inverseDocumentFrequency * ((K1 + 1) * fieldFrequency)) /
        (K1 + fieldFrequency);
      scores.set(
        posting.documentIndex,
        (scores.get(posting.documentIndex) ?? 0) + termScore,
      );
      matchedTerms.set(
        posting.documentIndex,
        (matchedTerms.get(posting.documentIndex) ?? 0) + 1,
      );
    }
  }

  return [...scores]
    .map(([documentIndex, rawScore]) => {
      const document = index.documents[documentIndex]!;
      const coverage =
        (matchedTerms.get(documentIndex) ?? 0) / queryTerms.length;
      let score = rawScore * (0.5 + 0.5 * coverage);

      // BM25F ranks tokens; these bonuses preserve the especially useful
      // distinction between an exact API symbol/heading and a token match.
      if (document.normalizedTitle === normalizedQuery) score += 12;
      else if (document.normalizedTitle.includes(normalizedQuery)) score += 4;
      if (document.normalizedSection === normalizedQuery) score += 6;
      else if (document.normalizedSection.includes(normalizedQuery)) score += 2;

      return { document, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.document.entry.title.localeCompare(b.document.entry.title) ||
        a.document.entry.url.localeCompare(b.document.entry.url),
    )
    .slice(0, limit)
    .map(({ document, score }) => ({
      title: document.entry.title,
      path: document.entry.url,
      section: document.entry.section,
      excerpt: document.entry.excerpt,
      score: Number(score.toFixed(6)),
    }));
}
