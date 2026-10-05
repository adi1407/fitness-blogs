"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

/** Logs on-site searches so zero-result queries can become new content. */
export function SearchBeacon({ query, results }: { query: string; results: number }) {
  useEffect(() => {
    trackEvent("site_search", { query: query.toLowerCase(), results });
  }, [query, results]);
  return null;
}
