import { NextRequest, NextResponse } from "next/server";
import { apiBase } from "@/lib/auth/memberCookie";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Ctx = { params: Promise<{ articleId: string }> };

/** Same-origin view beacon; forwards the reader IP so the API can dedupe repeats. */
export async function POST(req: NextRequest, ctx: Ctx) {
  const { articleId } = await ctx.params;
  if (!UUID_RE.test(articleId)) {
    return NextResponse.json({ message: "Invalid article id" }, { status: 400 });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    await fetch(
      `${apiBase()}/public/articles/${encodeURIComponent(articleId)}/view`,
      {
        method: "POST",
        headers: clientIp ? { "X-Client-IP": clientIp } : undefined,
        cache: "no-store",
        signal: AbortSignal.timeout(5_000),
      },
    );
  } catch (err) {
    console.error("[article-view]", err);
  }
  return new NextResponse(null, { status: 204 });
}
