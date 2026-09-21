import { NextRequest, NextResponse } from "next/server";
import { apiBase, bearerFromRequest } from "@/lib/auth/memberCookie";

async function proxy(req: NextRequest, articleId: string, method: string) {
  const auth = bearerFromRequest(req);
  if (!auth) {
    return NextResponse.json(
      { message: "Sign in required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  try {
    const upstream = await fetch(
      `${apiBase()}/public/articles/${encodeURIComponent(articleId)}/engagement/bookmark`,
      {
        method,
        headers: { Authorization: auth },
        cache: "no-store",
      },
    );
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[engagement/bookmark]", err);
    return NextResponse.json(
      { message: "Could not reach engagement service" },
      { status: 502 },
    );
  }
}

type Ctx = { params: Promise<{ articleId: string }> };

export async function POST(req: NextRequest, ctx: Ctx) {
  const { articleId } = await ctx.params;
  return proxy(req, articleId, "POST");
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { articleId } = await ctx.params;
  return proxy(req, articleId, "DELETE");
}
