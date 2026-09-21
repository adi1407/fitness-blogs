import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { allocateArticleNumber } from "../db/ensureCmsSchema";
import { authenticate } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import {
  estimateReadingTime,
  normalizeSlugInput,
  slugFromTitle,
} from "../utils/articleSlug";
import { canPublish } from "../utils/roles";

export const briefsRouter = Router();

briefsRouter.use(authenticate);

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .nullable();

const createSchema = z.object({
  targetQuery: z.string().trim().min(1).max(200),
  workingTitle: z.string().trim().max(250).optional().default(""),
  categoryId: z.string().uuid(),
  subcategoryId: z.string().uuid(),
  outline: z.string().max(8000).optional().default(""),
  requiredLinks: z.string().max(4000).optional().default(""),
  notes: z.string().max(4000).optional().default(""),
  dueOn: dateSchema.optional().nullable(),
  writerId: z.string().uuid(),
});

const patchSchema = z.object({
  cancel: z.boolean().optional(),
  targetQuery: z.string().trim().min(1).max(200).optional(),
  workingTitle: z.string().trim().max(250).optional(),
  categoryId: z.string().uuid().optional(),
  subcategoryId: z.string().uuid().optional(),
  outline: z.string().max(8000).optional(),
  requiredLinks: z.string().max(4000).optional(),
  notes: z.string().max(4000).optional(),
  dueOn: dateSchema.optional(),
  writerId: z.string().uuid().optional(),
});

const BRIEF_SELECT = `
  SELECT b.*,
    c.slug AS category_slug,
    c.label AS category_label,
    s.slug AS subcategory_slug,
    s.label AS subcategory_label,
    w.name AS writer_name,
    w.email AS writer_email,
    a.title AS article_title,
    a.status AS article_status
  FROM article_briefs b
  JOIN categories c ON c.id = b.category_id
  JOIN subcategories s ON s.id = b.subcategory_id
  JOIN users w ON w.id = b.writer_id
  LEFT JOIN articles a ON a.id = b.article_id
`;

function dateOnly(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function mapBrief(row: Record<string, unknown>) {
  return {
    id: row.id,
    targetQuery: row.target_query,
    workingTitle: row.working_title ?? "",
    categoryId: row.category_id,
    subcategoryId: row.subcategory_id,
    categorySlug: row.category_slug,
    categoryLabel: row.category_label,
    subcategorySlug: row.subcategory_slug,
    subcategoryLabel: row.subcategory_label,
    outline: row.outline ?? "",
    requiredLinks: row.required_links ?? "",
    notes: row.notes ?? "",
    dueOn: dateOnly(row.due_on),
    writerId: row.writer_id,
    writerName: row.writer_name ?? "",
    writerEmail: row.writer_email ?? "",
    assignedBy: row.assigned_by,
    articleId: row.article_id,
    articleTitle: row.article_title ?? null,
    articleStatus: row.article_status ?? null,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function outlineToBody(outline: string): string {
  const lines = outline
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return "";
  return lines.map((line) => `<h2>${escapeHtml(line)}</h2>`).join("");
}

async function resolveTaxonomyPair(
  categoryId: string,
  subcategoryId: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const check = await pool.query(
    `SELECT s.id FROM subcategories s
     WHERE s.id = $1 AND s.category_id = $2 LIMIT 1`,
    [subcategoryId, categoryId],
  );
  if (!check.rowCount) {
    return {
      ok: false,
      message: "Subcategory does not belong to the selected category",
    };
  }
  return { ok: true };
}

async function assertWriter(writerId: string): Promise<string | null> {
  const result = await pool.query(
    `SELECT id FROM users
     WHERE id = $1 AND role = 'writer' AND is_active = TRUE
     LIMIT 1`,
    [writerId],
  );
  if (!result.rowCount) return "Assigned user must be an active writer";
  return null;
}

async function uniqueSlug(base: string): Promise<string | null> {
  const normalized = normalizeSlugInput(base);
  if (!normalized) return null;
  let candidate = normalized;
  let n = 2;
  for (;;) {
    const q = await pool.query(
      `SELECT id FROM articles WHERE slug = $1 LIMIT 1`,
      [candidate],
    );
    if (q.rowCount === 0) return candidate;
    candidate = `${normalized}-${n}`.slice(0, 100);
    n += 1;
  }
}

async function loadBrief(id: string) {
  const result = await pool.query(`${BRIEF_SELECT} WHERE b.id = $1`, [id]);
  return result.rows[0] as Record<string, unknown> | undefined;
}

briefsRouter.get("/", async (req, res) => {
  const role = req.user!.role;
  const articleId =
    typeof req.query.articleId === "string" ? req.query.articleId.trim() : "";
  const status =
    typeof req.query.status === "string" ? req.query.status.trim() : "";

  if (articleId) {
    const parsed = z.string().uuid().safeParse(articleId);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid article id" });
      return;
    }
    const result = await pool.query(`${BRIEF_SELECT} WHERE b.article_id = $1`, [
      articleId,
    ]);
    const row = result.rows[0] as Record<string, unknown> | undefined;
    if (!row) {
      res.json({ briefs: [] });
      return;
    }
    if (role === "writer" && row.writer_id !== req.user!.id) {
      res.json({ briefs: [] });
      return;
    }
    res.json({ briefs: [mapBrief(row)] });
    return;
  }

  const clauses: string[] = [];
  const params: unknown[] = [];

  if (role === "writer") {
    params.push(req.user!.id);
    clauses.push(`b.writer_id = $${params.length}`);
    clauses.push(`b.status IN ('open', 'in_progress')`);
  } else if (!canPublish(role)) {
    res.status(403).json({ message: "Forbidden" });
    return;
  } else if (
    status &&
    ["open", "in_progress", "done", "cancelled"].includes(status)
  ) {
    params.push(status);
    clauses.push(`b.status = $${params.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query(
    `${BRIEF_SELECT} ${where}
     ORDER BY
       CASE WHEN b.due_on IS NULL THEN 1 ELSE 0 END,
       b.due_on ASC,
       b.created_at DESC`,
    params,
  );
  res.json({ briefs: result.rows.map(mapBrief) });
});

briefsRouter.post("/", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Only editors and admins can assign briefs" });
    return;
  }
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid brief",
      errors: parsed.error.flatten(),
    });
    return;
  }
  const data = parsed.data;
  const tax = await resolveTaxonomyPair(data.categoryId, data.subcategoryId);
  if (!tax.ok) {
    res.status(400).json({ message: tax.message });
    return;
  }
  const writerError = await assertWriter(data.writerId);
  if (writerError) {
    res.status(400).json({ message: writerError });
    return;
  }

  const inserted = await pool.query(
    `INSERT INTO article_briefs (
      target_query, working_title, category_id, subcategory_id,
      outline, required_links, notes, due_on, writer_id, assigned_by
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING id`,
    [
      data.targetQuery,
      data.workingTitle,
      data.categoryId,
      data.subcategoryId,
      data.outline,
      data.requiredLinks,
      data.notes,
      data.dueOn ?? null,
      data.writerId,
      req.user!.id,
    ],
  );
  const row = await loadBrief(String(inserted.rows[0].id));
  const brief = mapBrief(row!);
  await recordAudit(req, {
    action: "brief.created",
    entityType: "brief",
    entityId: String(brief.id),
    summary: `Assigned “${data.targetQuery}”`,
  });
  res.status(201).json({ brief });
});

briefsRouter.patch("/:id", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Only editors and admins can update briefs" });
    return;
  }
  const parsed = patchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid brief",
      errors: parsed.error.flatten(),
    });
    return;
  }
  const existing = await pool.query(
    `SELECT * FROM article_briefs WHERE id = $1`,
    [req.params.id],
  );
  const row = existing.rows[0] as Record<string, unknown> | undefined;
  if (!row) {
    res.status(404).json({ message: "Brief not found" });
    return;
  }

  if (parsed.data.cancel) {
    if (row.status === "done") {
      res.status(400).json({ message: "Published assignments cannot be cancelled" });
      return;
    }
    if (row.status === "cancelled") {
      const current = await loadBrief(String(row.id));
      res.json({ brief: mapBrief(current!) });
      return;
    }
    await pool.query(
      `UPDATE article_briefs SET status = 'cancelled', updated_at = NOW() WHERE id = $1`,
      [row.id],
    );
    const updated = await loadBrief(String(row.id));
    await recordAudit(req, {
      action: "brief.cancelled",
      entityType: "brief",
      entityId: String(row.id),
      summary: `Cancelled “${String(row.target_query)}”`,
    });
    res.json({ brief: mapBrief(updated!) });
    return;
  }

  if (row.status !== "open") {
    res.status(400).json({ message: "Only open assignments can be edited" });
    return;
  }

  const data = parsed.data;
  const categoryId = data.categoryId ?? String(row.category_id);
  const subcategoryId = data.subcategoryId ?? String(row.subcategory_id);
  const tax = await resolveTaxonomyPair(categoryId, subcategoryId);
  if (!tax.ok) {
    res.status(400).json({ message: tax.message });
    return;
  }
  const writerId = data.writerId ?? String(row.writer_id);
  const writerError = await assertWriter(writerId);
  if (writerError) {
    res.status(400).json({ message: writerError });
    return;
  }

  await pool.query(
    `UPDATE article_briefs SET
      target_query = $1,
      working_title = $2,
      category_id = $3,
      subcategory_id = $4,
      outline = $5,
      required_links = $6,
      notes = $7,
      due_on = $8,
      writer_id = $9,
      updated_at = NOW()
     WHERE id = $10`,
    [
      data.targetQuery ?? row.target_query,
      data.workingTitle ?? row.working_title,
      categoryId,
      subcategoryId,
      data.outline ?? row.outline,
      data.requiredLinks ?? row.required_links,
      data.notes ?? row.notes,
      data.dueOn !== undefined ? data.dueOn : row.due_on,
      writerId,
      row.id,
    ],
  );
  const updated = await loadBrief(String(row.id));
  res.json({ brief: mapBrief(updated!) });
});

briefsRouter.post("/:id/start", async (req, res) => {
  if (req.user!.role !== "writer") {
    res.status(403).json({ message: "Only the assigned writer can start a draft" });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query(
      `SELECT * FROM article_briefs WHERE id = $1 FOR UPDATE`,
      [req.params.id],
    );
    const row = existing.rows[0] as Record<string, unknown> | undefined;
    if (!row) {
      await client.query("ROLLBACK");
      res.status(404).json({ message: "Brief not found" });
      return;
    }
    if (row.writer_id !== req.user!.id) {
      await client.query("ROLLBACK");
      res.status(403).json({ message: "This assignment belongs to another writer" });
      return;
    }
    if (row.article_id || row.status !== "open") {
      await client.query("ROLLBACK");
      res.status(400).json({ message: "This assignment already has a draft" });
      return;
    }

    const title =
      String(row.working_title || "").trim() || String(row.target_query);
    const slug = await uniqueSlug(slugFromTitle(title));
    const body = outlineToBody(String(row.outline ?? ""));
    const articleNumber = await allocateArticleNumber();

    const inserted = await client.query(
      `INSERT INTO articles (
        article_number, title, slug, excerpt, body,
        category_id, subcategory_id, status,
        primary_keyword, reading_time, author_id
      ) VALUES (
        $1,$2,$3,'',$4,$5,$6,'draft',$7,$8,$9
      ) RETURNING id`,
      [
        articleNumber,
        title,
        slug,
        body,
        row.category_id,
        row.subcategory_id,
        String(row.target_query),
        estimateReadingTime(body),
        req.user!.id,
      ],
    );
    const articleId = inserted.rows[0].id as string;
    await client.query(
      `UPDATE article_briefs
       SET article_id = $1, status = 'in_progress', updated_at = NOW()
       WHERE id = $2`,
      [articleId, row.id],
    );
    await client.query("COMMIT");

    const brief = await loadBrief(String(row.id));
    await recordAudit(req, {
      action: "brief.started",
      entityType: "brief",
      entityId: String(row.id),
      summary: `Started draft for “${String(row.target_query)}”`,
      meta: { articleId },
    });
    res.status(201).json({ brief: mapBrief(brief!), articleId });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
});
