import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate } from "../middleware/auth";
import { canPublish } from "../utils/roles";
import { normalizePath, upsertRedirect } from "../services/urlRedirects";
import { recordAudit } from "../services/auditLog";

export const notificationsRouter = Router();
notificationsRouter.use(authenticate);

notificationsRouter.get("/", async (req, res) => {
  const unreadOnly = req.query.unread === "1" || req.query.unread === "true";
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 30));
  const clauses = [`user_id = $1`];
  const params: unknown[] = [req.user!.id];
  if (unreadOnly) clauses.push(`is_read = FALSE`);
  const result = await pool.query(
    `SELECT id, kind, title, body, href, article_id, is_read, created_at
     FROM staff_notifications
     WHERE ${clauses.join(" AND ")}
     ORDER BY created_at DESC
     LIMIT $${params.length + 1}`,
    [...params, limit],
  );
  const count = await pool.query(
    `SELECT COUNT(*)::int AS c FROM staff_notifications
     WHERE user_id = $1 AND is_read = FALSE`,
    [req.user!.id],
  );
  res.json({
    unreadCount: count.rows[0].c,
    notifications: result.rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      body: r.body,
      href: r.href,
      articleId: r.article_id,
      isRead: r.is_read,
      createdAt: r.created_at,
    })),
  });
});

notificationsRouter.post("/read-all", async (req, res) => {
  await pool.query(
    `UPDATE staff_notifications SET is_read = TRUE
     WHERE user_id = $1 AND is_read = FALSE`,
    [req.user!.id],
  );
  res.json({ ok: true });
});

notificationsRouter.post("/:id/read", async (req, res) => {
  await pool.query(
    `UPDATE staff_notifications SET is_read = TRUE
     WHERE id = $1 AND user_id = $2`,
    [req.params.id, req.user!.id],
  );
  res.json({ ok: true });
});

export const redirectsRouter = Router();
redirectsRouter.use(authenticate);

redirectsRouter.get("/", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  const result = await pool.query(
    `SELECT id, from_path, to_path, article_id, is_active, created_at, updated_at
     FROM url_redirects
     ORDER BY updated_at DESC
     LIMIT 200`,
  );
  res.json({
    redirects: result.rows.map((r) => ({
      id: r.id,
      fromPath: r.from_path,
      toPath: r.to_path,
      articleId: r.article_id,
      isActive: r.is_active,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
  });
});

const redirectSchema = z.object({
  fromPath: z.string().min(1).max(500),
  toPath: z.string().min(1).max(500),
  articleId: z.string().uuid().nullable().optional(),
});

redirectsRouter.post("/", async (req, res) => {
  if (req.user!.role !== "admin") {
    res.status(403).json({ message: "Only admins can create redirects" });
    return;
  }
  const parsed = redirectSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid redirect" });
    return;
  }
  await upsertRedirect({
    fromPath: parsed.data.fromPath,
    toPath: parsed.data.toPath,
    articleId: parsed.data.articleId,
  });
  await recordAudit(req, {
    action: "redirect.created",
    entityType: "redirect",
    summary: `${normalizePath(parsed.data.fromPath)} → ${normalizePath(parsed.data.toPath)}`,
  });
  res.status(201).json({ ok: true });
});

redirectsRouter.patch("/:id/deactivate", async (req, res) => {
  if (req.user!.role !== "admin") {
    res.status(403).json({ message: "Only admins can deactivate redirects" });
    return;
  }
  await pool.query(
    `UPDATE url_redirects SET is_active = FALSE, updated_at = NOW() WHERE id = $1`,
    [req.params.id],
  );
  res.json({ ok: true });
});
