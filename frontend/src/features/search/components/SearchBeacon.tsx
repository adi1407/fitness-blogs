"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";

/** Logs on-site searches so zero-result queries can become new content. */
export function SearchBeacon({
  query,
  results,
}: {
  query: string;
  results: number;
}) {
  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return;
    trackEvent("site_search", { query: q, results });
    void fetch("/api/search-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q, results }),
      keepalive: true,
    }).catch(() => {
      /* ignore — GA still recorded */
    });
  }, [query, results]);
  return null;
}
