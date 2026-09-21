import { NextResponse } from "next/server";
import { apiBase, MEMBER_COOKIE } from "@/lib/auth/memberCookie";

export async function POST() {
  try {
    await fetch(`${apiBase()}/public/auth/logout`, {
      method: "POST",
      cache: "no-store",
    });
  } catch {
    /* ignore */
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(MEMBER_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
