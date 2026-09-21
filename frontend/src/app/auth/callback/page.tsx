"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useMemberAuth,
  type Member,
} from "@/features/auth/MemberAuthContext";

function decodeMemberParam(raw: string | null): Member | null {
  if (!raw) return null;
  try {
    const padded =
      raw.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (raw.length % 4)) % 4);
    const json = atob(padded);
    const parsed = JSON.parse(json) as Member;
    if (
      typeof parsed?.id === "string" &&
      typeof parsed?.email === "string"
    ) {
      return {
        id: parsed.id,
        email: parsed.email,
        name: typeof parsed.name === "string" ? parsed.name : "",
        picture: typeof parsed.picture === "string" ? parsed.picture : "",
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

function CallbackInner() {
  const router = useRouter();
  const search = useSearchParams();
  const { setSession } = useMemberAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = search.get("token");
    const next = search.get("next");
    const dest =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
    const member = decodeMemberParam(search.get("member"));

    if (!token) {
      setError("Missing sign-in token.");
      return;
    }

    void (async () => {
      try {
        await setSession(token, member);
        router.replace(dest);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not complete sign-in.",
        );
      }
    })();
  }, [search, setSession, router]);

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center">
        <p className="text-sm text-destructive">{error}</p>
        <a
          href="/login"
          className="mt-4 inline-block text-sm font-semibold underline"
        >
          Back to sign in
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-10">
      <Loader2 className="size-8 animate-spin text-foreground" />
      <p className="text-sm text-muted-foreground">Finishing Google sign-in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <main className="fk-page flex flex-1 items-center justify-center py-20">
      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground">Loading…</div>
        }
      >
        <CallbackInner />
      </Suspense>
    </main>
  );
}
