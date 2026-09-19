"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

/** Fires once per article page mount. */
export function ArticleOpenBeacon({
  slug,
  category,
  subcategory,
}: {
  slug: string;
  category: string | null;
  subcategory: string | null;
}) {
  useEffect(() => {
    trackEvent("article_open", {
      slug,
      category: category ?? "",
      subcategory: subcategory ?? "",
    });
  }, [slug, category, subcategory]);

  return null;
}
