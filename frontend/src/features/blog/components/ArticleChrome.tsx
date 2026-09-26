"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";
import { SignInGateModal } from "@/features/auth/SignInGateModal";
import { toPublicShareUrl } from "@/lib/siteUrl";

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
        className="flex w-full items-center justify-between text-left text-sm font-semibold uppercase tracking-wide text-foreground"
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
                className="text-foreground/80 transition-colors hover:text-accent hover:underline"
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
  compact = false,
}: {
  title: string;
  url: string;
  compact?: boolean;
}) {
  const { member, loading: authLoading } = useMemberAuth();
  const [copied, setCopied] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const shareUrl = useMemo(() => toPublicShareUrl(url), [url]);
  const encoded = useMemo(
    () => ({
      u: encodeURIComponent(shareUrl),
      t: encodeURIComponent(title),
    }),
    [shareUrl, title],
  );

  function requireAuth(e?: MouseEvent) {
    if (authLoading) {
      e?.preventDefault();
      return false;
    }
    if (!member) {
      e?.preventDefault();
      setGateOpen(true);
      return false;
    }
    return true;
  }

  function trackShare(channel: string) {
    trackEvent("share_click", { channel, url: shareUrl });
  }

  async function copy() {
    if (!requireAuth()) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const btn =
    "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors hover:border-accent hover:text-accent";

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {!compact ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Share
          </span>
        ) : null}
        <a
          href={`https://twitter.com/intent/tweet?url=${encoded.u}&text=${encoded.t}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          onClick={(e) => {
            if (!requireAuth(e)) return;
            trackShare("x");
          }}
        >
          X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded.u}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          onClick={(e) => {
            if (!requireAuth(e)) return;
            trackShare("facebook");
          }}
        >
          Facebook
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.u}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          onClick={(e) => {
            if (!requireAuth(e)) return;
            trackShare("linkedin");
          }}
        >
          LinkedIn
        </a>
        <button type="button" onClick={() => void copy()} className={btn}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SignInGateModal
        open={gateOpen}
        actionLabel="share"
        onClose={() => setGateOpen(false)}
      />
    </>
  );
}
