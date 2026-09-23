import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import {
  KNOWLEDGE_HUB_SLUG,
  KNOWLEDGE_SECTIONS,
} from "../constants/knowledgeContent";
import { mapKnowledgePage } from "../utils/knowledgeMappers";
import {
  normalizeSlugInput,
  slugFromTitle,
} from "../utils/articleSlug";

export const knowledgePagesRouter = Router();

const pageBodySchema = z.object({
  section: z.enum(KNOWLEDGE_SECTIONS),
  title: z.string().min(1).max(200),
  slug: z.string().max(100).optional().nullable(),
  excerpt: z.string().max(600).optional().default(""),
  bodyHtml: z.string().optional().default(""),
  metaTitle: z.string().max(250).optional().default(""),
  metaDescription: z.string().max(320).optional().default(""),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  robotsIndex: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).max(10_000).optional().default(0),
  isHub: z.boolean().optional(),
});

knowledgePagesRouter.use(authenticate, authorize("admin", "editor"));

knowledgePagesRouter.get("/", async (req, res) => {
  const section =
    typeof req.query.section === "string" ? req.query.section : undefined;
  const status =
    typeof req.query.status === "string" ? req.query.status : undefined;

  const clauses: string[] = [];
  const params: unknown[] = [];

  if (section && (KNOWLEDGE_SECTIONS as readonly string[]).includes(section)) {
    params.push(section);
    clauses.push(`section = $${params.length}`);
  }
  if (status === "draft" || status === "published") {
    params.push(status);
    clauses.push(`status = $${params.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query(
    `SELECT * FROM knowledge_pages ${where}
     ORDER BY section ASC, sort_order ASC, title ASC`,
    params,
  );
  res.json({ pages: result.rows.map(mapKnowledgePage) });
});

knowledgePagesRouter.get("/:id", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM knowledge_pages WHERE id = $1`,
    [req.params.id],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Page not found" });
    return;
  }
  res.json({ page: mapKnowledgePage(result.rows[0]) });
});

knowledgePagesRouter.post("/", async (req, res) => {
  const parsed = pageBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid page payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const slug = data.isHub
    ? KNOWLEDGE_HUB_SLUG
    : normalizeSlugInput(data.slug) ||
      slugFromTitle(data.title) ||
      "page";
  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    const result = await pool.query(
      `INSERT INTO knowledge_pages (
        section, slug, title, excerpt, body_html,
        meta_title, meta_description, status, robots_index, sort_order, published_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        data.section,
        slug,
        data.title,
        data.excerpt,
        data.bodyHtml,
        data.metaTitle || data.title,
        data.metaDescription || data.excerpt,
        data.status,
        data.robotsIndex,
        data.sortOrder,
        publishedAt,
      ],
    );
    const page = mapKnowledgePage(result.rows[0]);
    await recordAudit(req, {
      action: "knowledge_page.create",
      entityType: "knowledge_page",
      entityId: String(page.id),
      summary: `Created ${page.section} page ${page.title}`,
    });
    res.status(201).json({ page });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Slug already exists in this section" });
      return;
    }
    throw err;
  }
});

knowledgePagesRouter.patch("/:id", async (req, res) => {
  const existing = await pool.query(
    `SELECT * FROM knowledge_pages WHERE id = $1`,
    [req.params.id],
  );
  if (!existing.rows[0]) {
    res.status(404).json({ message: "Page not found" });
    return;
  }

  const parsed = pageBodySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid page payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const row = existing.rows[0];
  const section = data.section ?? row.section;
  const title = data.title ?? row.title;
  let slug = row.slug;
  if (data.isHub === true) slug = KNOWLEDGE_HUB_SLUG;
  else if (data.slug !== undefined) {
    slug =
      normalizeSlugInput(data.slug) ||
      slugFromTitle(String(title)) ||
      KNOWLEDGE_HUB_SLUG;
  }
  const status = data.status ?? row.status;
  let publishedAt = row.published_at;
  if (status === "published" && !publishedAt) publishedAt = new Date();
  if (status === "draft") publishedAt = null;

  try {
    const result = await pool.query(
      `UPDATE knowledge_pages SET
        section = $1,
        slug = $2,
        title = $3,
        excerpt = COALESCE($4, excerpt),
        body_html = COALESCE($5, body_html),
        meta_title = COALESCE($6, meta_title),
        meta_description = COALESCE($7, meta_description),
        status = $8,
        robots_index = COALESCE($9, robots_index),
        sort_order = COALESCE($10, sort_order),
        published_at = $11,
        updated_at = NOW()
      WHERE id = $12
      RETURNING *`,
      [
        section,
        slug,
        title,
        data.excerpt,
        data.bodyHtml,
        data.metaTitle,
        data.metaDescription,
        status,
        data.robotsIndex,
        data.sortOrder,
        publishedAt,
        req.params.id,
      ],
    );
    const page = mapKnowledgePage(result.rows[0]);
    await recordAudit(req, {
      action: "knowledge_page.update",
      entityType: "knowledge_page",
      entityId: String(page.id),
      summary: `Updated ${page.section} page ${page.title}`,
    });
    res.json({ page });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Slug already exists in this section" });
      return;
    }
    throw err;
  }
});

knowledgePagesRouter.delete("/:id", async (req, res) => {
  const result = await pool.query(
    `DELETE FROM knowledge_pages WHERE id = $1 RETURNING id, title, section`,
    [req.params.id],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Page not found" });
    return;
  }
  await recordAudit(req, {
    action: "knowledge_page.delete",
    entityType: "knowledge_page",
    entityId: String(result.rows[0].id),
    summary: `Deleted ${result.rows[0].section} page ${result.rows[0].title}`,
  });
  res.status(204).send();
});
