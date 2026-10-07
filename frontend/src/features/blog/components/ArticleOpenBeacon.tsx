"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

/** Fires once per article page mount: analytics event + view count. */
export function ArticleOpenBeacon({
  articleId,
  slug,
  category,
  subcategory,
}: {
  articleId: string;
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

  useEffect(() => {
    void fetch(`/api/articles/${encodeURIComponent(articleId)}/view`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, [articleId]);

  return null;
}
