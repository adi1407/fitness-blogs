import { NextRequest, NextResponse } from "next/server";
import {
  hasCookieConsent,
  looksLikeJwt,
  memberCookieOptions,
  MEMBER_COOKIE,
  safeNextPath,
} from "@/lib/auth/memberCookie";
import { JUST_SIGNED_IN_COOKIE } from "@/lib/auth/signInMarker";

/**
 * Google OAuth lands here (server) so the JWT is stored HttpOnly
 * and never exposed to client JavaScript or left in the address bar.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const next = safeNextPath(req.nextUrl.searchParams.get("next"));

  if (!looksLikeJwt(token) || !hasCookieConsent(req)) {
    const login = new URL("/login", req.url);
    login.searchParams.set(
      "error",
      looksLikeJwt(token) ? "cookies_required" : "unexpected_error",
    );
    login.searchParams.set("next", next);
    return NextResponse.redirect(login);
  }

  const dest = new URL(next, req.url);
  const res = NextResponse.redirect(dest);
  res.cookies.set(MEMBER_COOKIE, token, memberCookieOptions());
  res.cookies.set(JUST_SIGNED_IN_COOKIE, "1", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 120,
  });
  return res;
}
