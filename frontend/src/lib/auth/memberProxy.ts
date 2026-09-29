import { NextRequest, NextResponse } from "next/server";
import { apiBase, bearerFromRequest } from "@/lib/auth/memberCookie";

const MAX_BODY_BYTES = 8192;

/** Forward a signed-in member request to the backend `/public/...` API. */
export async function proxyMemberRequest(
  req: NextRequest,
  upstreamPath: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
): Promise<NextResponse> {
  const auth = bearerFromRequest(req);
  if (!auth) {
    return NextResponse.json(
      { message: "Sign in required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  let body: string | undefined;
  if (method === "POST" || method === "PUT") {
    body = await req.text();
    if (body.length > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Payload too large" }, { status: 413 });
    }
  }

  try {
    const upstream = await fetch(`${apiBase()}${upstreamPath}`, {
      method,
      headers: {
        Authorization: auth,
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body,
      cache: "no-store",
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error(`[member-proxy] ${method} ${upstreamPath}`, err);
    return NextResponse.json(
      { message: "Could not reach the fitlives API" },
      { status: 502 },
    );
  }
}
