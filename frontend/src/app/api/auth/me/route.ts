import { NextRequest, NextResponse } from "next/server";
import { apiBase, bearerFromRequest } from "@/lib/auth/memberCookie";

/** Same-origin proxy — uses HttpOnly fk_member cookie when present. */
export async function GET(req: NextRequest) {
  const auth = bearerFromRequest(req);
  if (!auth) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const upstream = await fetch(`${apiBase()}/public/auth/me`, {
      headers: { Authorization: auth },
      cache: "no-store",
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[auth/me] upstream failed", err);
    return NextResponse.json(
      { message: "Could not reach auth service" },
      { status: 502 },
    );
  }
}
