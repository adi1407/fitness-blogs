import { NextResponse } from "next/server";

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

export async function POST() {
  try {
    await fetch(`${apiBase()}/public/auth/logout`, {
      method: "POST",
      cache: "no-store",
    });
  } catch {
    /* ignore */
  }
  return NextResponse.json({ ok: true });
}
