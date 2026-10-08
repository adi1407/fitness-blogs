import { NextRequest, NextResponse } from "next/server";
import { apiBase } from "@/lib/auth/memberCookie";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token : "";
  if (!token) {
    return NextResponse.json({ message: "Invalid unsubscribe link." }, { status: 400 });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const upstream = await fetch(`${apiBase()}/public/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "X-Client-IP": clientIp } : {}),
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[unsubscribe] upstream failed", err);
    return NextResponse.json(
      { message: "Could not unsubscribe right now. Please try again." },
      { status: 502 },
    );
  }
}
