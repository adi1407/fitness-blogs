import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import { STAFF_ROLES } from "../utils/roles";

export const adminRouter = Router();

adminRouter.use(authenticate);

const createUserSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().min(1).max(120),
  password: z.string().min(8).max(200),
  role: z.enum(STAFF_ROLES),
});

function mapUser(row: Record<string, unknown>) {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    isActive: row.is_active,
    createdAt: row.created_at,
  };
}

/** Admin: all staff. Editor: writers only (for Writers desk). */
adminRouter.get("/users", async (req, res) => {
  const role = req.user!.role;
  if (role !== "admin" && role !== "editor") {
    res.status(403).json({ message: "Insufficient permissions" });
    return;
  }

  const roleFilter =
    typeof req.query.role === "string" ? req.query.role.trim() : "";

  const clauses: string[] = [];
  const params: unknown[] = [];

  if (role === "editor") {
    clauses.push(`role = 'writer'`);
  } else if (roleFilter && (STAFF_ROLES as readonly string[]).includes(roleFilter)) {
    params.push(roleFilter);
    clauses.push(`role = $${params.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query(
    `SELECT id, email, name, role, is_active, created_at
     FROM users ${where}
     ORDER BY created_at DESC`,
    params,
  );

  res.json({ users: result.rows.map(mapUser) });
});

adminRouter.post("/users", authorize("admin"), async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid user payload",
      errors: parsed.error.flatten(),
    });
    return;
  }

  const { email, name, password, role } = parsed.data;
  const existing = await pool.query(
    `SELECT id FROM users WHERE lower(email) = lower($1) LIMIT 1`,
    [email],
  );
  if (existing.rowCount && existing.rowCount > 0) {
    res.status(409).json({ message: "Email already in use" });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role, is_active, created_at`,
    [email.toLowerCase(), hash, name, role],
  );

  const user = mapUser(result.rows[0]);
  await recordAudit(req, {
    action: "user.created",
    entityType: "user",
    entityId: String(user.id),
    summary: `Created ${role} ${email}`,
    meta: { role },
  });

  res.status(201).json({ user });
});

adminRouter.get("/activity", authorize("admin"), async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
  const offset = (page - 1) * limit;
  const search =
    typeof req.query.search === "string" ? req.query.search.trim() : "";
  const action =
    typeof req.query.action === "string" ? req.query.action.trim() : "";

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

adminRouter.get("/activity/summary", authorize("admin"), async (_req, res) => {
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
