import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ARTICLES_TAG } from "@/lib/api/blog";

const ALLOWED_TAGS = new Set([ARTICLES_TAG]);
const MAX_PATHS = 20;

function authorized(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) return false;
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** On-demand ISR purge, called by the API after a publish, edit or unpublish. */
export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    tags?: unknown;
    paths?: unknown;
  };
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === "string" && ALLOWED_TAGS.has(t))
    : [];
  const paths = Array.isArray(body.paths)
    ? body.paths
        .filter((p): p is string => typeof p === "string" && p.startsWith("/"))
        .slice(0, MAX_PATHS)
    : [];

  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({ revalidated: { tags, paths } });
}
