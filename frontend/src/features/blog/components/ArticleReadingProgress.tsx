"use client";

import { useEffect, useState } from "react";

/** Thin accent progress bar under the fixed site header. */
export function ArticleReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMq = () => setReduced(mq.matches);
    syncMq();
    mq.addEventListener("change", syncMq);

    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mq.removeEventListener("change", syncMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-1001 h-0.5 bg-transparent"
      style={{ top: "var(--site-header-height, 6.75rem)" }}
      aria-hidden
    >
      <div
        className="h-full origin-left bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
