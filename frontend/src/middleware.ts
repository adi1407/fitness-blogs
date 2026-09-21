import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MEMBER_COOKIE } from "@/lib/auth/memberCookie";

const API_BASE = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api/v1"
).replace(/\/$/, "");

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/account") {
    const token = request.cookies.get(MEMBER_COOKIE)?.value;
    if (!token) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", "/account");
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/blog/") || pathname.includes(".")) {
    return NextResponse.next();
  }

  try {
    const url = `${API_BASE}/public/redirects/resolve?path=${encodeURIComponent(pathname)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });
    if (!res.ok) return NextResponse.next();
    const data = (await res.json()) as { to?: string };
    if (data.to && data.to !== pathname) {
      return NextResponse.redirect(new URL(data.to, request.url), 301);
    }
  } catch {
    /* ignore — serve page normally */
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*", "/account"],
};
