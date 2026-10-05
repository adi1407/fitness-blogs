import type { NextRequest } from "next/server";
import { renderOgCard } from "@/lib/og/card";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  return renderOgCard({
    origin,
    title: searchParams.get("title") ?? "",
    eyebrow: searchParams.get("eyebrow") ?? undefined,
    stat: searchParams.get("stat") ?? undefined,
    statLabel: searchParams.get("label") ?? undefined,
  });
}
