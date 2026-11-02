import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate } from "../middleware/auth";
import { canPublish } from "../utils/roles";
import { normalizePath, redirectHealth, upsertRedirect } from "../services/urlRedirects";
import { listNotFound } from "../services/notFoundLog";
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
  const [result, health] = await Promise.all([
    pool.query(
      `SELECT id, from_path, to_path, article_id, is_active, hit_count, last_hit_at, created_at, updated_at
       FROM url_redirects
       ORDER BY is_active DESC, hit_count DESC, updated_at DESC
       LIMIT 500`,
    ),
    redirectHealth(),
  ]);
  res.json({
    redirects: result.rows.map((r) => ({
      id: r.id,
      fromPath: r.from_path,
      toPath: r.to_path,
      articleId: r.article_id,
      isActive: r.is_active,
      hitCount: Number(r.hit_count ?? 0),
      lastHitAt: r.last_hit_at,
      health: r.is_active ? (health.get(normalizePath(r.from_path)) ?? null) : null,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
  });
});

/** Unresolved 404s from the site, with a suggested redirect target. */
redirectsRouter.get("/not-found", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  res.json({ notFound: await listNotFound() });
});

redirectsRouter.post("/not-found/ignore", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  const path = typeof req.body?.path === "string" ? req.body.path : "";
  await pool.query(`UPDATE not_found_hits SET ignored = TRUE WHERE path = $1`, [path]);
  res.json({ ok: true });
});

/** Point a chained redirect straight at its final destination. */
redirectsRouter.patch("/:id/flatten", async (req, res) => {
  if (req.user!.role !== "admin") {
    res.status(403).json({ message: "Only admins can change redirects" });
    return;
  }
  const row = (await pool.query(`SELECT from_path FROM url_redirects WHERE id = $1`, [req.params.id])).rows[0];
  if (!row) {
    res.status(404).json({ message: "Redirect not found" });
    return;
  }
  const finalTo = (await redirectHealth()).get(normalizePath(row.from_path))?.finalTo;
  if (!finalTo) {
    res.status(409).json({ message: "This redirect is part of a loop. Deactivate one side instead." });
    return;
  }
  await pool.query(`UPDATE url_redirects SET to_path = $2, updated_at = NOW() WHERE id = $1`, [req.params.id, finalTo]);
  await recordAudit(req, {
    action: "redirect.flattened",
    entityType: "redirect",
    summary: `${row.from_path} → ${finalTo}`,
  });
  res.json({ ok: true, toPath: finalTo });
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
