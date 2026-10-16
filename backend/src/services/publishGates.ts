import { pool } from "../db/pool";

export type PublishGate = {
  id: string;
  label: string;
  pass: boolean;
};

function stripHtml(html: string): string {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const p = JSON.parse(value);
      return Array.isArray(p) ? p : [];
    } catch {
      return [];
    }
  }
  return [];
}

const DISCLAIMER_HINT =
  /not medical advice|educational (information|only)|consult a (qualified |licensed )?(professional|doctor|physician)/i;

const MIN_BODY_CHARS = 800;

/** Hard gates before publish — returns all gates (pass or fail). */
export async function evaluatePublishGates(
  row: Record<string, unknown>,
): Promise<PublishGate[]> {
  const title = String(row.title ?? "").trim();
  const body = String(row.body ?? "");
  const bodyText = stripHtml(body);
  const slug = typeof row.slug === "string" ? row.slug.trim() : "";
  const primaryKeyword = String(row.primary_keyword ?? "").trim();
  const quickAnswer = String(row.quick_answer ?? "").trim();
  const featuredImage = String(row.featured_image ?? "").trim();
  const featuredImageAlt = String(row.featured_image_alt ?? "").trim();
  const metaTitle = String(row.meta_title ?? "").trim();
  const metaDescription = String(row.meta_description ?? "").trim();

  const sources = parseJsonArray(row.sources);
  const sourceCount = sources.filter(
    (s: unknown) =>
      typeof s === "object" &&
      s &&
      String((s as { title?: string }).title ?? "").trim(),
  ).length;

  const faq = parseJsonArray(row.faq);
  const faqCount = faq.filter(
    (f: unknown) =>
      typeof f === "object" &&
      f &&
      String((f as { question?: string }).question ?? "").trim() &&
      String((f as { answer?: string }).answer ?? "").trim(),
  ).length;

  const relatedRaw = row.related_article_numbers;
  const related = Array.isArray(relatedRaw)
    ? relatedRaw
    : typeof relatedRaw === "string"
      ? (() => {
          try {
            const p = JSON.parse(relatedRaw);
            return Array.isArray(p) ? p : [];
          } catch {
            return [];
          }
        })()
      : [];

  const combined = `${quickAnswer}\n${bodyText}`;
  const hasDisclaimer = DISCLAIMER_HINT.test(combined);

  const gates: PublishGate[] = [
    { id: "title", label: "Title", pass: title.length >= 8 },
    { id: "slug", label: "Slug", pass: Boolean(slug) },
    {
      id: "taxonomy",
      label: "Category and subcategory",
      pass: Boolean(row.category_id && row.subcategory_id),
    },
    {
      id: "quickAnswer",
      label: "Quick answer",
      pass: Boolean(quickAnswer),
    },
    {
      id: "body",
      label: `Body (≥${MIN_BODY_CHARS} characters)`,
      pass: bodyText.length >= MIN_BODY_CHARS,
    },
    {
      id: "featuredImage",
      label: "Featured image",
      pass: Boolean(featuredImage),
    },
    {
      id: "featuredImageAlt",
      label: "Cover alt text",
      pass: Boolean(featuredImageAlt),
    },
    {
      id: "metaTitle",
      label: "Meta title",
      pass: Boolean(metaTitle),
    },
    {
      id: "metaDescription",
      label: "Meta description",
      pass: Boolean(metaDescription),
    },
    {
      id: "primaryKeyword",
      label: "Primary keyword",
      pass: primaryKeyword.length >= 2,
    },
    {
      id: "faq",
      label: "At least one FAQ",
      pass: faqCount >= 1,
    },
    {
      id: "sources",
      label: "At least one source",
      pass: sourceCount >= 1,
    },
    {
      id: "related",
      label: "At least one related article",
      pass: related.length >= 1,
    },
    {
      id: "disclaimer",
      label: "Educational / not-medical-advice disclaimer in quick answer or body",
      pass: hasDisclaimer,
    },
  ];

  if (primaryKeyword.length >= 2) {
    const kw = normalizeKeyword(primaryKeyword);
    const clash = await pool.query(
      `SELECT id, title, slug FROM articles
       WHERE status = 'published'
         AND id <> $1
         AND lower(trim(primary_keyword)) = $2
       LIMIT 1`,
      [row.id, kw],
    );
    gates.push({
      id: "duplicateKeyword",
      label: clash.rowCount
        ? `Primary keyword already used by “${clash.rows[0].title}”`
        : "Primary keyword unique among live articles",
      pass: !clash.rowCount,
    });
  }

  return gates;
}

export function failingGates(gates: PublishGate[]): PublishGate[] {
  return gates.filter((g) => !g.pass);
}
