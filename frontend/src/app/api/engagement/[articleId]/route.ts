import { NextRequest, NextResponse } from "next/server";
import { apiBase, bearerFromRequest } from "@/lib/auth/memberCookie";

async function proxy(
  req: NextRequest,
  articleId: string,
  suffix: string,
  method: string,
) {
  const auth = bearerFromRequest(req);
  const headers: HeadersInit = {};
  if (auth) headers.Authorization = auth;

  try {
    const upstream = await fetch(
      `${apiBase()}/public/articles/${encodeURIComponent(articleId)}/engagement${suffix}`,
      { method, headers, cache: "no-store" },
    );
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[engagement]", err);
    return NextResponse.json(
      { message: "Could not reach engagement service" },
      { status: 502 },
    );
  }
}

type Ctx = { params: Promise<{ articleId: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { articleId } = await ctx.params;
  return proxy(req, articleId, "", "GET");
}
