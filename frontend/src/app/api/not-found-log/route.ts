import { NextRequest, NextResponse } from "next/server";
import { apiBase } from "@/lib/auth/memberCookie";

/** Same-origin 404 log; forwards the visitor IP for the API throttle. */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { path?: unknown; referrer?: unknown } | null;
  if (!body || typeof body.path !== "string") {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const upstream = await fetch(`${apiBase()}/public/not-found-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "X-Client-IP": clientIp } : {}),
      },
      body: JSON.stringify({
        path: body.path.slice(0, 500),
        referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 500) : "",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    return NextResponse.json({ ok: upstream.ok }, { status: upstream.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
