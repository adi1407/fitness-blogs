import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { pool } from "../db/pool";
import { env } from "../config/env";
import { SEED_USERS } from "../db/ensureCmsSchema";
import { authenticate } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";
import { recordAudit } from "../services/auditLog";
import type { StaffRole } from "../types/auth";

export const authRouter = Router();

const TEN_MINUTES = 10 * 60 * 1000;
const loginEmailKey = (req: { body?: { email?: unknown } }) =>
  String(req.body?.email ?? "").toLowerCase().trim().slice(0, 254);

// Keyed on the connecting IP (Render's proxy hop) and on the account, so neither a
// spoofed client-IP header nor rotating IPs gets unlimited guesses at one password.
const loginLimits = [
  rateLimit({
    windowMs: TEN_MINUTES,
    max: 20,
    key: (req) => `login-ip:${req.ip}`,
    message: "Too many sign-in attempts. Try again in a few minutes.",
  }),
  rateLimit({
    windowMs: TEN_MINUTES,
    max: 8,
    key: (req) => `login-email:${loginEmailKey(req)}`,
    message: "Too many sign-in attempts for this account. Try again in a few minutes.",
  }),
];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const PUBLIC_DEFAULT_PASSWORDS = new Set<string>(SEED_USERS.map((u) => u.password));

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z
    .string()
    .min(12, "Use at least 12 characters")
    .max(200)
    .refine((p) => !PUBLIC_DEFAULT_PASSWORDS.has(p), "Choose a password that isn't a published default"),
});

/** Called after a successful login: true when the password used is a published default. */
function usesPublicDefault(password: string): boolean {
  return PUBLIC_DEFAULT_PASSWORDS.has(password);
}

function signToken(user: { id: string; role: string; password_version?: number }) {
  const pv = Number(user.password_version ?? 0);
  return jwt.sign({ id: user.id, role: user.role, pv }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  } as jwt.SignOptions);
}

authRouter.post("/login", ...loginLimits, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid email or password payload" });
    return;
  }

  const email = parsed.data.email.toLowerCase().trim();
  const result = await pool.query(
    `SELECT id, email, name, role, password_hash, is_active, password_version FROM users WHERE email = $1`,
    [email],
  );
  const user = result.rows[0];

  if (!user || !user.is_active) {
    await recordAudit(req, {
      action: "auth.login_failed",
      summary: `Failed login for ${email}`,
      meta: { email },
    });
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const ok = await bcrypt.compare(parsed.data.password, user.password_hash);
  if (!ok) {
    await recordAudit(req, {
      action: "auth.login_failed",
      summary: `Failed login for ${email}`,
      meta: { email },
    });
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as StaffRole,
  };

  await recordAudit(req, {
    action: "auth.login",
    summary: `${user.email} signed in`,
  });

  res.json({
    token: signToken(user),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    mustChangePassword: usesPublicDefault(parsed.data.password),
  });
});

authRouter.get("/me", authenticate, async (req, res) => {
  res.json({ user: req.user });
});

const bootstrapSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(12, "Use at least 12 characters")
    .max(200)
    .refine((p) => !PUBLIC_DEFAULT_PASSWORDS.has(p), "Choose a password that isn't a published default"),
  name: z.string().trim().min(1).max(120).default("fitlives Admin"),
});

/** Temporary one-shot reset key — remove after the owner has logged in. */
const BOOTSTRAP_RESET_KEY = "boot_7f3k9Qx2mL8pW4nR";

/**
 * First-admin setup. Without the reset key, only succeeds when no active admin
 * exists. With `X-Bootstrap-Key`, upserts the given admin (one-shot recovery).
 */
authRouter.post("/bootstrap-admin", ...loginLimits.slice(0, 1), async (req, res) => {
  const force =
    typeof req.header("x-bootstrap-key") === "string" &&
    req.header("x-bootstrap-key") === BOOTSTRAP_RESET_KEY;

  if (!force) {
    const admins = await pool.query(
      `SELECT 1 FROM users WHERE role = 'admin' AND is_active = TRUE LIMIT 1`,
    );
    if ((admins.rowCount ?? 0) > 0) {
      res.status(409).json({ message: "Admin already exists" });
      return;
    }
  }

  const parsed = bootstrapSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid payload" });
    return;
  }

  const email = parsed.data.email.toLowerCase().trim();
  const hash = await bcrypt.hash(parsed.data.password, 10);
  const inserted = await pool.query(
    `INSERT INTO users (email, password_hash, name, role, password_changed_at)
     VALUES ($1, $2, $3, 'admin', NOW())
     ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name,
           role = 'admin',
           is_active = TRUE,
           password_version = users.password_version + 1,
           password_changed_at = NOW(),
           updated_at = NOW()
     RETURNING id, email, name, role, password_version`,
    [email, hash, parsed.data.name],
  );
  const user = inserted.rows[0];
  if (!user) {
    res.status(500).json({ message: "Could not create admin" });
    return;
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as StaffRole,
  };
  await recordAudit(req, {
    action: force ? "auth.bootstrap_admin_reset" : "auth.bootstrap_admin",
    summary: `${force ? "Reset" : "Bootstrapped"} admin ${user.email}`,
  });

  res.status(201).json({
    token: signToken(user),
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

authRouter.post("/change-password", authenticate, ...loginLimits.slice(0, 1), async (req, res) => {
  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid password" });
    return;
  }
  const { currentPassword, newPassword } = parsed.data;
  if (currentPassword === newPassword) {
    res.status(400).json({ message: "The new password must be different" });
    return;
  }

  const result = await pool.query(
    `SELECT id, email, role, password_hash FROM users WHERE id = $1 AND is_active = TRUE`,
    [req.user!.id],
  );
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
    res.status(401).json({ message: "Current password is incorrect" });
    return;
  }

  const hash = await bcrypt.hash(newPassword, 10);
  const updated = await pool.query(
    `UPDATE users
        SET password_hash = $2,
            password_version = password_version + 1,
            password_changed_at = NOW(),
            updated_at = NOW()
      WHERE id = $1
      RETURNING password_version`,
    [user.id, hash],
  );
  await recordAudit(req, {
    action: "auth.password_changed",
    summary: `${user.email} changed their password`,
  });

  res.json({ token: signToken({ ...user, password_version: updated.rows[0].password_version }) });
});

authRouter.post("/logout", authenticate, async (req, res) => {
  await recordAudit(req, {
    action: "auth.logout",
    summary: `${req.user?.email} signed out`,
  });
  res.json({ ok: true });
});
