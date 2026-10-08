"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "done" | "error";

export function UnsubscribeConfirm({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onConfirm() {
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Could not unsubscribe right now. Please try again.");
      }
      try {
        localStorage.removeItem("fk_subscribed");
      } catch {
        /* private mode */
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not unsubscribe right now.");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-brand-50 p-4 text-sm">
        <Check className="mt-0.5 size-4 shrink-0 text-[#FF9800]" aria-hidden="true" />
        <p className="leading-relaxed">
          You&apos;ve been unsubscribed and won&apos;t get any more emails from us.{" "}
          <Link href="/" className="fk-link font-semibold">
            Back to fitlives
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={onConfirm}
        disabled={status === "submitting"}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none disabled:opacity-60"
      >
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Unsubscribe me
      </button>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
