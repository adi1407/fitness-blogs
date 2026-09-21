import { NextRequest, NextResponse } from "next/server";
import {
  looksLikeJwt,
  memberCookieOptions,
  MEMBER_COOKIE,
  safeNextPath,
} from "@/lib/auth/memberCookie";

/**
 * Google OAuth lands here (server) so the JWT is stored HttpOnly
 * and never exposed to client JavaScript or left in the address bar.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const next = safeNextPath(req.nextUrl.searchParams.get("next"));

  if (!looksLikeJwt(token)) {
    const login = new URL("/login", req.url);
    login.searchParams.set("error", "unexpected_error");
    return NextResponse.redirect(login);
  }

  const dest = new URL(next, req.url);
  const res = NextResponse.redirect(dest);
  res.cookies.set(MEMBER_COOKIE, token, memberCookieOptions());
  return res;
}
