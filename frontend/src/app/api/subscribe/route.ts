import { NextRequest, NextResponse } from "next/server";
import { apiBase } from "@/lib/auth/memberCookie";

/** Same-origin newsletter signup; forwards the visitor IP for the API throttle. */
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
    const upstream = await fetch(`${apiBase()}/public/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "X-Client-IP": clientIp } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[subscribe] upstream failed", err);
    return NextResponse.json(
      { message: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  }
}
