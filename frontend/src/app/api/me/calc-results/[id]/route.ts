import type { NextRequest } from "next/server";
import { proxyMemberRequest } from "@/lib/auth/memberProxy";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  return proxyMemberRequest(
    req,
    `/public/me/calc-results/${encodeURIComponent(id)}`,
    "DELETE",
  );
}
