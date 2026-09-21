import { NextRequest, NextResponse } from "next/server";

function apiBase() {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000/api/v1"
  ).replace(/\/$/, "");
}

/**
 * Same-origin Google OAuth start — avoids browser CORS / Failed to fetch
 * when calling the Render API from the Vercel (or localhost) frontend.
 */
export async function GET(req: NextRequest) {
  const nextParam = req.nextUrl.searchParams.get("next");
  const next =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/";

  const loginError = (reason: string) =>
    NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(reason)}`, req.url),
    );

  try {
    const upstream = await fetch(
      `${apiBase()}/public/auth/google?next=${encodeURIComponent(next)}`,
      { cache: "no-store" },
    );
    const data = (await upstream.json()) as { url?: string; message?: string };

    if (!upstream.ok || !data.url) {
      console.error("[auth/google]", upstream.status, data.message);
      return loginError(
        upstream.status === 503 ? "google_not_configured" : "unexpected_error",
      );
    }

    return NextResponse.redirect(data.url);
  } catch (err) {
    console.error("[auth/google] upstream failed", err);
    return loginError("unexpected_error");
  }
}
