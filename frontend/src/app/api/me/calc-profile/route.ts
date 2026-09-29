import type { NextRequest } from "next/server";
import { proxyMemberRequest } from "@/lib/auth/memberProxy";

export function GET(req: NextRequest) {
  return proxyMemberRequest(req, "/public/me/calc-profile", "GET");
}

export function PUT(req: NextRequest) {
  return proxyMemberRequest(req, "/public/me/calc-profile", "PUT");
}
