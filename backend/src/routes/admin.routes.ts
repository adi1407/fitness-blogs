import { Router } from "express";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize("admin"));

adminRouter.get("/activity", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
  const offset = (page - 1) * limit;
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  const action = typeof req.query.action === "string" ? req.query.action.trim() : "";

  const clauses: string[] = [];
  const params: unknown[] = [];

  if (action) {
    params.push(action);
    clauses.push(`action = $${params.length}`);
  }
  if (search) {
    params.push(`%${search}%`);
    const i = params.length;
    clauses.push(
      `(actor_email ILIKE $${i} OR summary ILIKE $${i} OR action ILIKE $${i})`,
    );
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  params.push(limit, offset);

  const result = await pool.query(
    `SELECT id, actor_id, actor_role, actor_email, action, entity_type, entity_id,
            summary, meta, ip, user_agent, created_at
     FROM audit_events
     ${where}
     ORDER BY created_at DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );

  const countParams = params.slice(0, -2);
  const countRes = await pool.query(
    `SELECT COUNT(*)::int AS total FROM audit_events ${where}`,
    countParams,
  );

  res.json({
    events: result.rows.map((row) => ({
      id: row.id,
      actorId: row.actor_id,
      actorRole: row.actor_role,
      actorEmail: row.actor_email,
      action: row.action,
      entityType: row.entity_type,
      entityId: row.entity_id,
      summary: row.summary,
      meta: row.meta,
      ip: row.ip,
      userAgent: row.user_agent,
      createdAt: row.created_at,
    })),
    page,
    limit,
    total: countRes.rows[0]?.total ?? 0,
  });
});

adminRouter.get("/activity/summary", async (_req, res) => {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [logins, publishes, newUsers, all] = await Promise.all([
    pool.query(
      `SELECT COUNT(*)::int AS c FROM audit_events WHERE action = 'auth.login' AND created_at >= $1`,
      [since],
    ),
    pool.query(
      `SELECT COUNT(*)::int AS c FROM audit_events WHERE action = 'article.published' AND created_at >= $1`,
      [since],
    ),
    pool.query(
      `SELECT COUNT(*)::int AS c FROM audit_events WHERE action = 'user.created' AND created_at >= $1`,
      [since],
    ),
    pool.query(`SELECT COUNT(*)::int AS c FROM audit_events`),
  ]);

  res.json({
    last24h: {
      logins: logins.rows[0]?.c ?? 0,
      publishes: publishes.rows[0]?.c ?? 0,
      newUsers: newUsers.rows[0]?.c ?? 0,
    },
    eventsAllTime: all.rows[0]?.c ?? 0,
  });
});
