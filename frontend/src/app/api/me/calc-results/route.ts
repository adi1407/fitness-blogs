import type { NextRequest } from "next/server";
import { proxyMemberRequest } from "@/lib/auth/memberProxy";

export function GET(req: NextRequest) {
  return proxyMemberRequest(req, "/public/me/calc-results", "GET");
}

export function POST(req: NextRequest) {
  return proxyMemberRequest(req, "/public/me/calc-results", "POST");
}
