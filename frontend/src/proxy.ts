import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { resolveApiBase } from "@/lib/api/client";
import { hasCookieConsent, MEMBER_COOKIE } from "@/lib/auth/memberCookie";

const API_BASE = resolveApiBase();
const MAP_TTL_MS = 60_000;
const MAP_TIMEOUT_MS = 2_500;

type RedirectMap = Map<string, string>;

let cached: { map: RedirectMap; at: number } | null = null;
let refreshing: Promise<RedirectMap | null> | null = null;

async function fetchRedirectMap(): Promise<RedirectMap | null> {
  try {
    const res = await fetch(`${API_BASE}/public/redirects`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(MAP_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { redirects?: { from: string; to: string }[] };
    return new Map((data.redirects ?? []).map((r) => [r.from, r.to]));
  } catch {
    return null;
  }
}

/**
 * Active redirects, held in memory and refreshed at most once a minute, so page
 * requests don't wait on the API. A failed refresh keeps the last good map.
 */
async function redirectMap(): Promise<RedirectMap> {
  if (cached && Date.now() - cached.at < MAP_TTL_MS) return cached.map;
  refreshing ??= fetchRedirectMap().finally(() => {
    refreshing = null;
  });
  const fresh = await refreshing;
  if (fresh) cached = { map: fresh, at: Date.now() };
  else if (cached) cached.at = Date.now() - MAP_TTL_MS + 10_000;
  return cached?.map ?? new Map();
}

function countHit(event: NextFetchEvent, from: string) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;
  event.waitUntil(
    fetch(`${API_BASE}/public/redirects/hit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ path: from }),
      signal: AbortSignal.timeout(5_000),
    }).catch(() => undefined),
  );
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/account") {
    const token = request.cookies.get(MEMBER_COOKIE)?.value;
    if (!token || !hasCookieConsent(request)) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", "/account");
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const to = (await redirectMap()).get(path);
  if (to && to !== path) {
    countHit(event, path);
    const target = new URL(to, request.url);
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[A-Za-z0-9]{2,5}$).*)"],
};
