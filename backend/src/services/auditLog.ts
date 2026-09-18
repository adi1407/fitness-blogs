import type { Request } from "express";
import { pool } from "../db/pool";

type AuditInput = {
  action: string;
  entityType?: string;
  entityId?: string | null;
  summary?: string;
  meta?: Record<string, unknown> | null;
};

export async function recordAudit(
  req: Request,
  input: AuditInput,
): Promise<void> {
  try {
    const user = req.user;
    const ip =
      (typeof req.headers["x-forwarded-for"] === "string"
        ? req.headers["x-forwarded-for"].split(",")[0]?.trim()
        : null) ||
      req.socket.remoteAddress ||
      "";
    const userAgent = String(req.headers["user-agent"] ?? "").slice(0, 500);

    await pool.query(
      `INSERT INTO audit_events
        (actor_id, actor_role, actor_email, action, entity_type, entity_id, summary, meta, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        user?.id ?? null,
        user?.role ?? "",
        user?.email ?? "",
        input.action,
        input.entityType ?? "",
        input.entityId ?? null,
        input.summary ?? "",
        input.meta ? JSON.stringify(input.meta) : null,
        ip,
        userAgent,
      ],
    );
  } catch (err) {
    console.error("[audit] failed to record", err);
  }
}
