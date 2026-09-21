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

const DISCLAIMER_HINT =
  /not medical advice|educational (information|only)|consult a (qualified |licensed )?(professional|doctor|physician)/i;

/** Hard gates before publish — returns failing gates (empty = ok). */
export async function evaluatePublishGates(
  row: Record<string, unknown>,
): Promise<PublishGate[]> {
  const title = String(row.title ?? "").trim();
  const body = String(row.body ?? "");
  const bodyText = stripHtml(body);
  const slug = typeof row.slug === "string" ? row.slug.trim() : "";
  const primaryKeyword = String(row.primary_keyword ?? "").trim();
  const quickAnswer = String(row.quick_answer ?? "").trim();
  const sources = Array.isArray(row.sources)
    ? row.sources
    : typeof row.sources === "string"
      ? (() => {
          try {
            const p = JSON.parse(row.sources);
            return Array.isArray(p) ? p : [];
          } catch {
            return [];
          }
        })()
      : [];
  const sourceCount = sources.filter(
    (s: { title?: string }) => String(s?.title ?? "").trim(),
  ).length;

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
      id: "body",
      label: "Body (enough content)",
      pass: bodyText.length >= 400,
    },
    {
      id: "primaryKeyword",
      label: "Primary keyword",
      pass: primaryKeyword.length >= 2,
    },
    {
      id: "sources",
      label: "At least one source",
      pass: sourceCount >= 1,
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
