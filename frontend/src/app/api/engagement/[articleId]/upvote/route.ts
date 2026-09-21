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

async function proxy(req: NextRequest, articleId: string, method: string) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Sign in required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  try {
    const upstream = await fetch(
      `${apiBase()}/public/articles/${encodeURIComponent(articleId)}/engagement/upvote`,
      {
        method,
        headers: { Authorization: auth },
        cache: "no-store",
      },
    );
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[engagement/upvote]", err);
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
