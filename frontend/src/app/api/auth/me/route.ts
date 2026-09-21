import { NextRequest, NextResponse } from "next/server";

function apiBase() {
  const fromEnv = (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  // Vercel production fallback when env vars weren't set on the project.
  if (process.env.VERCEL) {
    return "https://fitness-blogs-xkec.onrender.com/api/v1";
  }
  return "http://localhost:4000/api/v1";
}

/** Same-origin proxy for member session — avoids browser → Render CORS / wrong base URL. */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
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
