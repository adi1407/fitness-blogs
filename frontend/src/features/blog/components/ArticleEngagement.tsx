"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark, Loader2, ThumbsUp } from "lucide-react";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";
import { SignInGateModal } from "@/features/auth/SignInGateModal";
import { trackEvent } from "@/lib/analytics/openpanel";
import { cn } from "@/lib/utils";

type EngagementState = {
  upvoteCount: number;
  upvoted: boolean;
  bookmarked: boolean;
};

async function fetchEngagement(articleId: string): Promise<EngagementState> {
  const res = await fetch(`/api/engagement/${encodeURIComponent(articleId)}`, {
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!res.ok) {
    return { upvoteCount: 0, upvoted: false, bookmarked: false };
  }
  return (await res.json()) as EngagementState;
}

export function ArticleEngagement({
  articleId,
  className = "",
  compact = false,
}: {
  articleId: string;
  className?: string;
  compact?: boolean;
}) {
  const { member, loading: authLoading } = useMemberAuth();
  const [state, setState] = useState<EngagementState>({
    upvoteCount: 0,
    upvoted: false,
    bookmarked: false,
  });
  const [busy, setBusy] = useState<"upvote" | "bookmark" | null>(null);
  const [gateAction, setGateAction] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!articleId) return;
    const next = await fetchEngagement(articleId);
    setState(next);
  }, [articleId]);

  useEffect(() => {
    void load();
  }, [load, member]);

  function requireSignIn(actionLabel: string) {
    if (authLoading) return false;
    if (!member) {
      setGateAction(actionLabel);
      return false;
    }
    return true;
  }

  async function toggleUpvote() {
    if (!requireSignIn("upvote")) return;
    setBusy("upvote");
    const method = state.upvoted ? "DELETE" : "POST";
    try {
      const res = await fetch(
        `/api/engagement/${encodeURIComponent(articleId)}/upvote`,
        {
          method,
          cache: "no-store",
          credentials: "same-origin",
        },
      );
      const data = (await res.json().catch(() => ({}))) as {
        upvoted?: boolean;
        upvoteCount?: number;
        code?: string;
      };
      if (res.status === 401 || data.code === "AUTH_REQUIRED") {
        setGateAction("upvote");
        return;
      }
      if (!res.ok) return;
      setState((prev) => ({
        ...prev,
        upvoted: Boolean(data.upvoted),
        upvoteCount:
          typeof data.upvoteCount === "number"
            ? data.upvoteCount
            : prev.upvoteCount,
      }));
      trackEvent("article_upvote", {
        articleId,
        on: Boolean(data.upvoted),
      });
    } finally {
      setBusy(null);
    }
  }

  async function toggleBookmark() {
    if (!requireSignIn("bookmark")) return;
    setBusy("bookmark");
    const method = state.bookmarked ? "DELETE" : "POST";
    try {
      const res = await fetch(
        `/api/engagement/${encodeURIComponent(articleId)}/bookmark`,
        {
          method,
          cache: "no-store",
          credentials: "same-origin",
        },
      );
      const data = (await res.json().catch(() => ({}))) as {
        bookmarked?: boolean;
        code?: string;
      };
      if (res.status === 401 || data.code === "AUTH_REQUIRED") {
        setGateAction("bookmark");
        return;
      }
      if (!res.ok) return;
      setState((prev) => ({
        ...prev,
        bookmarked: Boolean(data.bookmarked),
      }));
      trackEvent("article_bookmark", {
        articleId,
        on: Boolean(data.bookmarked),
      });
    } finally {
      setBusy(null);
    }
  }

  const btnBase = compact
    ? "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition"
    : "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition";

  return (
    <>
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        <button
          type="button"
          onClick={() => void toggleUpvote()}
          disabled={busy === "upvote"}
          className={cn(
            btnBase,
            state.upvoted
              ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
              : "border-border bg-white text-foreground hover:border-[#0A0A0A]",
          )}
          aria-pressed={state.upvoted}
          aria-label={state.upvoted ? "Remove upvote" : "Upvote article"}
        >
          {busy === "upvote" ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ThumbsUp
              className={cn("size-3.5", state.upvoted && "fill-current")}
            />
          )}
          <span>{state.upvoted ? "Upvoted" : "Upvote"}</span>
          {state.upvoteCount > 0 ? (
            <span
              className={cn(
                "tabular-nums",
                state.upvoted ? "text-white/80" : "text-muted-foreground",
              )}
            >
              {state.upvoteCount}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => void toggleBookmark()}
          disabled={busy === "bookmark"}
          className={cn(
            btnBase,
            state.bookmarked
              ? "border-[#FF9800] bg-[#FF9800]/15 text-foreground"
              : "border-border bg-white text-foreground hover:border-[#FF9800]",
          )}
          aria-pressed={state.bookmarked}
          aria-label={state.bookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          {busy === "bookmark" ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Bookmark
              className={cn("size-3.5", state.bookmarked && "fill-current")}
            />
          )}
          <span>{state.bookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>

      <SignInGateModal
        open={Boolean(gateAction)}
        actionLabel={gateAction ?? "continue"}
        onClose={() => setGateAction(null)}
      />
    </>
  );
}
