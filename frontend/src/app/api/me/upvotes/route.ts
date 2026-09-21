import { NextRequest, NextResponse } from "next/server";
import { apiBase, bearerFromRequest } from "@/lib/auth/memberCookie";

export async function GET(req: NextRequest) {
  const auth = bearerFromRequest(req);
  if (!auth) {
    return NextResponse.json(
      { message: "Sign in required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  try {
    const upstream = await fetch(`${apiBase()}/public/me/upvotes`, {
      headers: { Authorization: auth },
      cache: "no-store",
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[me/upvotes]", err);
    return NextResponse.json(
      { message: "Could not load upvoted articles" },
      { status: 502 },
    );
  }
}
