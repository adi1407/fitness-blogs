import { pool } from "../db/pool";
import { BLOG_TAXONOMY, blogArticlePath } from "../constants/blogTaxonomy";
import { exercisePath } from "../constants/knowledgeContent";

export type LinkTargetKind = "article" | "calculator" | "food" | "exercise";

export type LinkTarget = {
  key: string;
  kind: LinkTargetKind;
  title: string;
  path: string;
  /** Lowercase anchor phrases, longest first. */
  phrases: string[];
  articleId?: string;
  slug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
};

const CALCULATORS: { path: string; label: string; aliases?: string[] }[] = [
  { path: "/calorie-calculator", label: "Calorie calculator" },
  { path: "/calorie-deficit-calculator", label: "Calorie deficit calculator" },
  { path: "/tdee-calculator", label: "TDEE calculator", aliases: ["tdee"] },
  { path: "/bmr-calculator", label: "BMR calculator", aliases: ["bmr"] },
  { path: "/macro-calculator", label: "Macro calculator" },
  { path: "/protein-calculator", label: "Protein calculator" },
  { path: "/bmi-calculator", label: "BMI calculator", aliases: ["bmi"] },
  { path: "/body-fat-calculator", label: "Body fat calculator" },
  { path: "/one-rep-max-calculator", label: "One-rep max calculator", aliases: ["one-rep max"] },
  { path: "/water-intake-calculator", label: "Water intake calculator" },
  { path: "/steps-to-calories-calculator", label: "Steps to calories calculator" },
];

/** Question scaffolding that searchers type but writers rarely repeat in prose. */
const QUESTION_LEAD =
  /^(how (much|many|long|often|to)|what (is|are)( a| an| the)?|which|why (am i|do i|does|is)|when (to|should)|should (i|you)|can (i|you)|is|are|does|do|best)\s+/i;
const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "for", "to", "of", "in", "on", "and", "or", "you", "i", "it",
  "your", "my", "do", "does", "good", "bad", "best", "vs", "per", "with", "much", "many",
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
}

/**
 * Keeps phrases specific enough to be worth a link: 2–6 words, at least one meaningful
 * word, and no filler at either end ("to build muscle" matches far too loosely).
 */
function usable(phrase: string, minWords = 2): boolean {
  const words = phrase.split(" ");
  if (words.length < minWords || words.length > 6) return false;
  if (STOPWORDS.has(words[0]) || STOPWORDS.has(words[words.length - 1])) return false;
  return words.some((w) => w.length >= 4 && !STOPWORDS.has(w));
}

function phraseVariants(...sources: string[]): string[] {
  const out = new Set<string>();
  for (const raw of sources) {
    const core = normalize(raw.split(/[:?|—–(]/)[0] ?? "");
    if (!core) continue;
    for (const p of [core, core.replace(QUESTION_LEAD, "")]) {
      if (usable(p)) out.add(p);
    }
  }
  return [...out].sort((a, b) => b.length - a.length);
}

/** Every published page worth linking to, with the phrases that should become its anchor text. */
export async function buildLinkIndex(): Promise<LinkTarget[]> {
  const [articles, foods, exercises] = await Promise.all([
    pool.query<{
      id: string;
      title: string;
      slug: string;
      article_number: number;
      primary_keyword: string;
      category_slug: string;
      subcategory_slug: string;
    }>(
      `SELECT a.id, a.title, a.slug, a.article_number, a.primary_keyword,
              c.slug AS category_slug, s.slug AS subcategory_slug
       FROM articles a
       JOIN categories c ON c.id = a.category_id
       JOIN subcategories s ON s.id = a.subcategory_id
       WHERE a.status = 'published' AND a.article_number IS NOT NULL`,
    ),
    pool.query<{ slug: string; name: string; hindi_name: string }>(
      `SELECT slug, name, hindi_name FROM foods WHERE published = TRUE`,
    ),
    pool.query<{ slug: string; muscle_group: string; title: string }>(
      `SELECT slug, muscle_group, title FROM exercises WHERE status = 'published'`,
    ),
  ]);

  const targets: LinkTarget[] = articles.rows.map((a) => ({
    key: `article:${a.article_number}`,
    kind: "article",
    title: a.title,
    path: blogArticlePath(a.category_slug, a.subcategory_slug, a.slug, Number(a.article_number)),
    phrases: phraseVariants(a.primary_keyword ?? "", a.title),
    articleId: a.id,
    slug: a.slug,
    categorySlug: a.category_slug,
    subcategorySlug: a.subcategory_slug,
  }));
  for (const c of CALCULATORS) {
    targets.push({
      key: `calc:${c.path}`,
      kind: "calculator",
      title: c.label,
      path: c.path,
      phrases: [normalize(c.label), ...(c.aliases ?? [])].sort((a, b) => b.length - a.length),
    });
  }
  for (const f of foods.rows) {
    const names = [f.name, /^[\x20-\x7e]+$/.test(f.hindi_name) ? f.hindi_name : ""]
      .map((n) => normalize(n.split(/[(,]/)[0] ?? ""))
      .filter((n) => n.length >= 4);
    targets.push({
      key: `food:${f.slug}`,
      kind: "food",
      title: f.name,
      path: `/foods/${f.slug}`,
      phrases: [...new Set(names)].sort((a, b) => b.length - a.length),
    });
  }
  for (const e of exercises.rows) {
    const name = normalize(e.title.split(/[:—–(]/)[0] ?? "");
    targets.push({
      key: `exercise:${e.muscle_group}/${e.slug}`,
      kind: "exercise",
      title: e.title,
      path: exercisePath(e.muscle_group, e.slug),
      phrases: usable(name) ? [name] : [],
    });
  }
  return targets.filter((t) => t.phrases.length > 0);
}

/** Case-insensitive, whole-word, tolerant of hyphen/space and a trailing plural. */
export function phraseRegex(phrase: string, flags = "iu"): RegExp {
  const body = phrase
    .split(/[\s-]+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("[\\s-]+");
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?:s|es)?(?![\\p{L}\\p{N}])`, flags);
}

/** Visible prose that can take a new link: drops existing links, headings and tags. */
function linkableText(html: string): string {
  return html
    .replace(/<a\b[\s\S]*?<\/a>/gi, " ")
    .replace(/<h[1-6]\b[\s\S]*?<\/h[1-6]>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/\s+/g, " ");
}

const ARTICLE_HREF =
  /href="(?:https?:\/\/(?:www\.)?fitlives\.in)?\/blog\/[a-z0-9-]+\/[a-z0-9-]+\/([a-z0-9-]+)(?:\/\d+)?\/?(?:[#?][^"]*)?"/gi;

export function linkedArticleSlugs(html: string): Set<string> {
  return new Set([...(html ?? "").matchAll(ARTICLE_HREF)].map((m) => m[1].toLowerCase()));
}

export type InboundSuggestion = {
  id: string;
  title: string;
  path: string;
  phrase: string;
  snippet: string;
};

/** Published articles that mention this article's topic in prose but don't link to it yet. */
export async function inboundSuggestions(articleId: string, limit = 10): Promise<InboundSuggestion[]> {
  const index = await buildLinkIndex();
  const target = index.find((t) => t.articleId === articleId);
  if (!target?.slug) return [];
  const others = await pool.query<{
    id: string;
    title: string;
    slug: string;
    body: string;
    article_number: number;
    category_slug: string;
    subcategory_slug: string;
    related_article_numbers: number[];
  }>(
    `SELECT a.id, a.title, a.slug, a.body, a.article_number, a.related_article_numbers,
            c.slug AS category_slug, s.slug AS subcategory_slug
     FROM articles a
     JOIN categories c ON c.id = a.category_id
     JOIN subcategories s ON s.id = a.subcategory_id
     WHERE a.status = 'published' AND a.id <> $1`,
    [articleId],
  );
  const targetNumber = Number(target.key.split(":")[1]);
  const regexes = target.phrases.map((p) => ({ phrase: p, re: phraseRegex(p) }));
  const out: (InboundSuggestion & { rank: number })[] = [];
  for (const row of others.rows) {
    if (linkedArticleSlugs(row.body).has(target.slug)) continue;
    if ((row.related_article_numbers ?? []).map(Number).includes(targetNumber)) continue;
    const text = linkableText(row.body);
    for (const { phrase, re } of regexes) {
      const m = re.exec(text);
      if (!m) continue;
      const start = Math.max(0, m.index - 70);
      const end = Math.min(text.length, m.index + m[0].length + 70);
      out.push({
        id: row.id,
        title: row.title,
        path: blogArticlePath(row.category_slug, row.subcategory_slug, row.slug, Number(row.article_number)),
        phrase: m[0],
        snippet: `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`,
        rank:
          (row.subcategory_slug === target.subcategorySlug ? 2 : row.category_slug === target.categorySlug ? 1 : 0) +
          phrase.length / 100,
      });
      break;
    }
  }
  return out
    .sort((a, b) => b.rank - a.rank)
    .slice(0, limit)
    .map(({ rank: _rank, ...s }) => s);
}

type ClusterArticle = {
  id: string;
  title: string;
  status: string;
  path: string | null;
  linksIn: number;
  linksInSameTopic: number;
  linksOutSameTopic: number;
  liveContentLinks: number | null;
};

/**
 * Taxonomy-shaped view of the internal link graph. Edges come from published
 * articles only (what is live): body links plus curated related picks, both of
 * which render as links on the page.
 */
export async function clusterMap() {
  const [rows, crawl] = await Promise.all([
    pool.query<{
      id: string;
      title: string;
      slug: string;
      status: string;
      article_number: number | null;
      body: string;
      related_article_numbers: number[];
      category_slug: string;
      subcategory_slug: string;
    }>(
      `SELECT a.id, a.title, a.slug, a.status, a.article_number, a.body, a.related_article_numbers,
              c.slug AS category_slug, s.slug AS subcategory_slug
       FROM articles a
       JOIN categories c ON c.id = a.category_id
       JOIN subcategories s ON s.id = a.subcategory_id`,
    ),
    pool.query<{ path: string; content_inlinks: number }>(`SELECT path, content_inlinks FROM site_audit_pages`),
  ]);

  const bySlug = new Map(rows.rows.map((r) => [r.slug, r]));
  const byNumber = new Map(rows.rows.filter((r) => r.article_number).map((r) => [Number(r.article_number), r]));
  const crawlByPath = new Map(crawl.rows.map((r) => [r.path, Number(r.content_inlinks)]));
  const outgoing = new Map<string, Set<string>>();
  const incoming = new Map<string, Set<string>>();
  for (const src of rows.rows) {
    if (src.status !== "published") continue;
    const targets = new Set<string>();
    for (const slug of linkedArticleSlugs(src.body)) {
      const t = bySlug.get(slug);
      if (t && t.id !== src.id) targets.add(t.id);
    }
    for (const n of src.related_article_numbers ?? []) {
      const t = byNumber.get(Number(n));
      if (t && t.id !== src.id) targets.add(t.id);
    }
    outgoing.set(src.id, targets);
    for (const t of targets) {
      let set = incoming.get(t);
      if (!set) incoming.set(t, (set = new Set()));
      set.add(src.id);
    }
  }
  const byId = new Map(rows.rows.map((r) => [r.id, r]));
  const linked = (a: string, b: string) => outgoing.get(a)?.has(b) || outgoing.get(b)?.has(a);

  return BLOG_TAXONOMY.map((cat) => {
    const subcategories = cat.subcategories.map((sub) => {
      const inTopic = rows.rows.filter((r) => r.category_slug === cat.slug && r.subcategory_slug === sub.slug);
      const published = inTopic.filter((r) => r.status === "published");
      const articles: ClusterArticle[] = inTopic
        .map((r) => {
          const path =
            r.article_number != null ? blogArticlePath(cat.slug, sub.slug, r.slug, Number(r.article_number)) : null;
          const sources = [...(incoming.get(r.id) ?? [])];
          return {
            id: r.id,
            title: r.title,
            status: r.status,
            path,
            linksIn: sources.length,
            linksInSameTopic: sources.filter((s) => byId.get(s)?.subcategory_slug === sub.slug).length,
            linksOutSameTopic: [...(outgoing.get(r.id) ?? [])].filter((t) => byId.get(t)?.subcategory_slug === sub.slug)
              .length,
            liveContentLinks: path && r.status === "published" ? (crawlByPath.get(path) ?? null) : null,
          };
        })
        .sort((a, b) => Number(b.status === "published") - Number(a.status === "published") || a.linksIn - b.linksIn);

      const unlinkedPairs: { a: { id: string; title: string }; b: { id: string; title: string } }[] = [];
      let unlinkedPairCount = 0;
      for (let i = 0; i < published.length; i++) {
        for (let j = i + 1; j < published.length; j++) {
          if (linked(published[i].id, published[j].id)) continue;
          unlinkedPairCount++;
          if (unlinkedPairs.length < 6) {
            unlinkedPairs.push({
              a: { id: published[i].id, title: published[i].title },
              b: { id: published[j].id, title: published[j].title },
            });
          }
        }
      }
      return {
        slug: sub.slug,
        label: sub.label,
        published: published.length,
        inProgress: inTopic.length - published.length,
        noLinksIn: articles.filter((a) => a.status === "published" && a.linksIn === 0).length,
        unlinkedPairCount,
        unlinkedPairs,
        articles,
      };
    });
    return {
      slug: cat.slug,
      label: cat.label,
      published: subcategories.reduce((n, s) => n + s.published, 0),
      gaps: subcategories.filter((s) => s.published === 0).length,
      subcategories,
    };
  });
}
