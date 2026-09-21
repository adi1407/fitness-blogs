import { NextRequest, NextResponse } from "next/server";

function apiBase() {
  const fromEnv = (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL) {
    return "https://fitness-blogs-xkec.onrender.com/api/v1";
  }
  return "http://localhost:4000/api/v1";
}

async function proxy(
  req: NextRequest,
  articleId: string,
  suffix: string,
  method: string,
) {
  const auth = req.headers.get("authorization");
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
