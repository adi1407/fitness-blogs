"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

const READ_SCROLL_SHARE = 0.75;
const READ_VISIBLE_MS = 45_000;

/**
 * Per article page mount: `article_open`, the view count, and one `article_read`
 * once 75% of the body is scrolled past or the tab has been visible for 45 s.
 */
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
    let done = false;
    let visibleMs = 0;
    let lastTick = Date.now();

    const fire = (trigger: "scroll" | "time") => {
      if (done) return;
      done = true;
      trackEvent("article_read", { slug, category: category ?? "", trigger });
      cleanup();
    };

    const onScroll = () => {
      const body = document.querySelector(".article-body");
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const read = window.innerHeight - rect.top;
      if (rect.height > 0 && read >= rect.height * READ_SCROLL_SHARE) fire("scroll");
    };

    const timer = window.setInterval(() => {
      const now = Date.now();
      if (document.visibilityState === "visible") visibleMs += now - lastTick;
      lastTick = now;
      if (visibleMs >= READ_VISIBLE_MS) fire("time");
    }, 1000);

    function cleanup() {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, [slug, category]);

  useEffect(() => {
    void fetch(`/api/articles/${encodeURIComponent(articleId)}/view`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, [articleId]);

  return null;
}
