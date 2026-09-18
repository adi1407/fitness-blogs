import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { pool } from "../db/pool";
import { env } from "../config/env";
import { authenticate } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import type { StaffRole } from "../types/auth";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signToken(user: { id: string; role: string }) {
  return jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  } as jwt.SignOptions);
}

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid email or password payload" });
    return;
  }

  const email = parsed.data.email.toLowerCase().trim();
  const result = await pool.query(
    `SELECT id, email, name, role, password_hash, is_active FROM users WHERE email = $1`,
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
  });
});

authRouter.get("/me", authenticate, async (req, res) => {
  res.json({ user: req.user });
});

authRouter.post("/logout", authenticate, async (req, res) => {
  await recordAudit(req, {
    action: "auth.logout",
    summary: `${req.user?.email} signed out`,
  });
  res.json({ ok: true });
});
