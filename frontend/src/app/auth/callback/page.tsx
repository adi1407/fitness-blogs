"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";

function CallbackInner() {
  const router = useRouter();
  const search = useSearchParams();
  const { refresh } = useMemberAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const next = search.get("next");
    const dest =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

    void (async () => {
      await refresh();
      router.replace(dest);
    })().catch(() => {
      setError("Could not complete sign-in.");
    });
  }, [search, refresh, router]);

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
