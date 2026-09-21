import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type MemberAuth = {
  id: string;
  email: string;
};

type MemberJwt = {
  typ: "member";
  id: string;
  email: string;
};

function readMemberFromAuthHeader(req: Request): MemberAuth | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  try {
    const decoded = jwt.verify(header.slice(7), env.jwtSecret) as MemberJwt;
    if (decoded.typ !== "member" || !decoded.id) return null;
    return { id: decoded.id, email: decoded.email };
  } catch {
    return null;
  }
}

/** Attach req.member when a valid member JWT is present. */
export function optionalMember(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  req.member = readMemberFromAuthHeader(req) ?? undefined;
  next();
}

/** Require a signed-in public member. */
export function requireMember(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const member = readMemberFromAuthHeader(req);
  if (!member) {
    res.status(401).json({
      message: "Sign in required",
      code: "AUTH_REQUIRED",
    });
    return;
  }
  req.member = member;
  next();
}
