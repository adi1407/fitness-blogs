"use client";

import { useMemo, useState } from "react";

type TocItem = { id: string; text: string; level: 2 | 3 };

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border bg-white p-4 sm:p-5"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-sm font-semibold uppercase tracking-wide text-primary"
        onClick={() => setOpen((v) => !v)}
      >
        On this page
        <span className="text-xs font-normal text-muted-foreground">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      {open ? (
        <ol className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? "ml-3" : undefined}
            >
              <a
                href={`#${item.id}`}
                className="text-foreground/80 hover:text-primary hover:underline"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      ) : null}
    </nav>
  );
}

export function ArticleShare({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const encoded = useMemo(
    () => ({
      u: encodeURIComponent(url),
      t: encodeURIComponent(title),
    }),
    [url, title],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded.u}&text=${encoded.t}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:border-primary"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded.u}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:border-primary"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.u}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:border-primary"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={() => void copy()}
        className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:border-primary"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
