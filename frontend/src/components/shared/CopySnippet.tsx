"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics/openpanel";

type Props = {
  code: string;
  label: string;
  /** Analytics id, e.g. "protein_ranking_embed". */
  event: string;
};

/** Read-only code block with a copy button, for embed and citation snippets. */
export function CopySnippet({ code, label, event }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
      trackEvent("copy_snippet", { snippet: event });
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-xl border border-border bg-[#F5F5F5]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold hover:border-[#FF9800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
        >
          {status === "copied" ? (
            <Check className="size-3.5 text-[#FF9800]" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          {status === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      {status === "error" ? (
        <p role="status" className="px-4 pb-3 text-xs text-red-700">
          Couldn&apos;t copy automatically — select the code and copy it manually.
        </p>
      ) : null}
    </div>
  );
}
