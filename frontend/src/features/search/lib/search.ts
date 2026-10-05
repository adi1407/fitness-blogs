import { getApiBase } from "@/lib/api/client";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { CALCULATORS } from "@/features/tools/content/links";
import { fetchFoodsSafe } from "@/features/foods/api/foods";
import { forGrams, formatG, shortName } from "@/features/foods/lib/nutrition";

export type SearchKind = "calculator" | "food" | "article";

export type SearchHit = {
  kind: SearchKind;
  title: string;
  href: string;
  description: string;
  score: number;
};

type Doc = Omit<SearchHit, "score"> & {
  primary: string;
  secondary: string;
  /** Names that should win outright when typed exactly, e.g. "paneer" or "bmi". */
  exact?: string[];
};

const MAX_QUERY = 80;

export function normalizeQuery(raw: string | string[] | undefined): string {
  const q = Array.isArray(raw) ? raw[0] : raw;
  return (q ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_QUERY);
}

function fold(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ");
}

async function fetchArticleSummaries(): Promise<PublicBlogArticle[]> {
  try {
    const res = await fetch(`${getApiBase()}/public/articles?limit=500&fields=summary`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { articles?: PublicBlogArticle[] };
    return data.articles ?? [];
  } catch {
    return [];
  }
}

async function buildDocs(): Promise<Doc[]> {
  const [articles, foods] = await Promise.all([fetchArticleSummaries(), fetchFoodsSafe()]);

  const calcDocs: Doc[] = Object.values(CALCULATORS).map((c) => ({
    kind: "calculator",
    title: c.title,
    href: c.href,
    description: c.description ?? "",
    primary: c.title,
    secondary: c.description ?? "",
    exact: [c.title, c.title.replace(/ calculator$/i, "")],
  }));

  const foodDocs: Doc[] = foods.map((f) => {
    const s = f.defaultServing;
    const n = s ? forGrams(f, s.grams) : null;
    return {
      kind: "food",
      title: `${shortName(f.name)} calories & protein`,
      href: `/foods/${f.slug}`,
      description: n && s
        ? `${n.kcal} kcal · ${formatG(n.proteinG)} protein per ${s.label}`
        : `${f.kcal} kcal · ${formatG(f.proteinG)} protein per 100 g`,
      primary: `${f.name} ${f.hindiName} ${f.slug.replace(/-/g, " ")}`,
      secondary: `${f.category} calories protein nutrition`,
      exact: [shortName(f.name), f.hindiName, f.slug.replace(/-/g, " ")],
    };
  });

  const articleDocs: Doc[] = articles
    .filter((a): a is PublicBlogArticle & { path: string } => Boolean(a.path))
    .map((a) => ({
      kind: "article",
      title: a.title,
      href: a.path,
      description: a.excerpt || a.metaDescription || "",
      primary: a.title,
      secondary: [a.excerpt, a.categoryLabel, a.subcategoryLabel, ...(a.tags ?? []), ...(a.topics ?? [])]
        .filter(Boolean)
        .join(" "),
    }));

  return [...calcDocs, ...foodDocs, ...articleDocs];
}

/**
 * Token match over a small in-memory index (tens to low hundreds of docs).
 * Every query token must appear somewhere; title hits outrank body hits.
 */
export async function siteSearch(query: string, limit = 30): Promise<SearchHit[]> {
  const tokens = fold(query).split(/\s+/).filter((t) => t.length > 1);
  if (!tokens.length) return [];

  const docs = await buildDocs();
  const phrase = fold(query).trim();
  const hits: SearchHit[] = [];

  for (const d of docs) {
    const primary = fold(d.primary);
    const secondary = fold(d.secondary);
    let score = 0;
    let all = true;
    for (const t of tokens) {
      if (primary.includes(t)) score += primary.split(/\s+/).some((w) => w.startsWith(t)) ? 6 : 3;
      else if (secondary.includes(t)) score += 1;
      else {
        all = false;
        break;
      }
    }
    if (!all) continue;
    if (primary.includes(phrase)) score += 8;
    if (d.exact?.some((e) => fold(e).trim() === phrase)) score += 10;
    if (d.kind === "calculator") score += 1;
    hits.push({ kind: d.kind, title: d.title, href: d.href, description: d.description, score });
  }

  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}
