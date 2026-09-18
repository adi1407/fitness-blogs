import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { env } from "../config/env";
import type { StaffRole } from "../types/auth";
import type { AuthUser } from "../types/auth";

type JwtPayload = { id: string; role: string };

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
    const result = await pool.query(
      `SELECT id, email, name, role, is_active FROM users WHERE id = $1`,
      [decoded.id],
    );
    const row = result.rows[0];
    if (!row || !row.is_active) {
      res.status(401).json({ message: "Invalid or inactive account" });
      return;
    }
    req.user = {
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role as StaffRole,
    } satisfies AuthUser;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function authorize(...roles: StaffRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient permissions" });
      return;
    }
    next();
  };
}
