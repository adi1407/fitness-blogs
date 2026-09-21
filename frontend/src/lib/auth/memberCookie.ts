import { NextRequest } from "next/server";

export const MEMBER_COOKIE = "fk_member";
/** Align with backend JWT default (7d). */
export const MEMBER_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function memberCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MEMBER_COOKIE_MAX_AGE,
  };
}

export function apiBase() {
  const fromEnv = (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL) {
    return "https://fitness-blogs-xkec.onrender.com/api/v1";
  }
  return "http://localhost:4000/api/v1";
}

export function bearerFromRequest(req: NextRequest): string | null {
  const header = req.headers.get("authorization");
  if (header?.startsWith("Bearer ")) return header;
  const token = req.cookies.get(MEMBER_COOKIE)?.value;
  if (token) return `Bearer ${token}`;
  return null;
}

export function safeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/";
  if (raw.includes("\\") || raw.includes("://")) return "/";
  return raw;
}

export function looksLikeJwt(token: string): boolean {
  const parts = token.split(".");
  return parts.length === 3 && parts.every((p) => p.length > 0);
}
