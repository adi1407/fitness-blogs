import { NextRequest, NextResponse } from "next/server";
import { apiBase } from "@/lib/auth/memberCookie";

/** Same-origin search log; forwards the visitor IP for the API throttle. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const upstream = await fetch(`${apiBase()}/public/search-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "X-Client-IP": clientIp } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[search-log] upstream failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
