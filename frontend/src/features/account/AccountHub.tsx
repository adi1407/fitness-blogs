"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, Loader2, LogOut, ThumbsUp, UserRound } from "lucide-react";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";
import { CookieSettingsButton } from "@/components/shared/CookieBanner";
import {
  LEGAL_CONTACT_MAILTO,
  LEGAL_RELATED,
} from "@/lib/legal";
import type { MemberLibraryArticle } from "@/features/account/types";

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AccountHub() {
  const router = useRouter();
  const { member, loading, logout } = useMemberAuth();
  const [bookmarks, setBookmarks] = useState<MemberLibraryArticle[]>([]);
  const [upvotes, setUpvotes] = useState<MemberLibraryArticle[]>([]);
  const [listsLoading, setListsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!member) {
      router.replace("/login?next=/account");
    }
  }, [loading, member, router]);

  useEffect(() => {
    if (!member) return;
    let cancelled = false;
    void Promise.all([
      fetch("/api/me/bookmarks", { cache: "no-store", credentials: "same-origin" }),
      fetch("/api/me/upvotes", { cache: "no-store", credentials: "same-origin" }),
    ])
      .then(async ([bRes, uRes]) => {
        const bJson = (await bRes.json().catch(() => ({}))) as {
          bookmarks?: MemberLibraryArticle[];
        };
        const uJson = (await uRes.json().catch(() => ({}))) as {
          upvotes?: MemberLibraryArticle[];
        };
        if (cancelled) return;
        setBookmarks(bRes.ok ? (bJson.bookmarks ?? []) : []);
        setUpvotes(uRes.ok ? (uJson.upvotes ?? []) : []);
      })
      .finally(() => {
        if (!cancelled) setListsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [member]);

  async function removeBookmark(id: string) {
    setBusyId(`b-${id}`);
    try {
      const res = await fetch(
        `/api/engagement/${encodeURIComponent(id)}/bookmark`,
        { method: "DELETE", credentials: "same-origin" },
      );
      if (res.ok) {
        setBookmarks((prev) => prev.filter((a) => a.id !== id));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function removeUpvote(id: string) {
    setBusyId(`u-${id}`);
    try {
      const res = await fetch(
        `/api/engagement/${encodeURIComponent(id)}/upvote`,
        { method: "DELETE", credentials: "same-origin" },
      );
      if (res.ok) {
        setUpvotes((prev) => prev.filter((a) => a.id !== id));
      }
    } finally {
      setBusyId(null);
    }
  }

  function onSignOut() {
    logout();
    router.replace("/");
  }

  if (loading || !member) {
    return (
      <div className="flex justify-center py-20 text-sm text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  const since = formatDate(member.createdAt);

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-center sm:p-6">
        {member.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.picture}
            alt=""
            className="size-20 rounded-full object-cover ring-1 ring-border"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="inline-flex size-20 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-8 text-muted-foreground" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {member.name || "Your account"}
          </h1>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {member.email}
          </p>
          {since ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Member since {since}
            </p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">
              Signed in with Google
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </section>

      <LibrarySection
        title="Saved"
        icon={<Bookmark className="size-4" />}
        empty="Save a guide from any article."
        items={bookmarks}
        loading={listsLoading}
        busyPrefix="b-"
        busyId={busyId}
        actionLabel="Unsave"
        onRemove={removeBookmark}
      />

      <LibrarySection
        title="Upvoted"
        icon={<ThumbsUp className="size-4" />}
        empty="Upvote what helped."
        items={upvotes}
        loading={listsLoading}
        busyPrefix="u-"
        busyId={busyId}
        actionLabel="Remove upvote"
        onRemove={removeUpvote}
      />

      <section className="rounded-2xl border border-border bg-muted/40 p-5 text-sm">
        <p className="font-semibold text-foreground">Privacy and cookies</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href={LEGAL_RELATED.privacy.href} className="fk-link">
            Privacy Policy
          </Link>
          <Link href={LEGAL_RELATED.terms.href} className="fk-link">
            Terms of Use
          </Link>
          <Link href={LEGAL_RELATED.cookies.href} className="fk-link">
            Cookie Policy
          </Link>
          <CookieSettingsButton className="fk-link text-sm" />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Name and photo come from Google. To delete your FitKnowledge member
          data, email{" "}
          <a href={LEGAL_CONTACT_MAILTO} className="fk-link text-xs">
            a deletion request
          </a>{" "}
          from this address.
        </p>
      </section>
    </div>
  );
}

function LibrarySection({
  title,
  icon,
  empty,
  items,
  loading,
  busyPrefix,
  busyId,
  actionLabel,
  onRemove,
}: {
  title: string;
  icon: ReactNode;
  empty: string;
  items: MemberLibraryArticle[];
  loading: boolean;
  busyPrefix: string;
  busyId: string | null;
  actionLabel: string;
  onRemove: (id: string) => void;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
        {icon}
        {title}
        {!loading ? (
          <span className="text-sm font-normal text-muted-foreground">
            ({items.length})
          </span>
        ) : null}
      </h2>
      {loading ? (
        <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
          {empty}{" "}
          <Link href="/blog" className="fk-link">
            Browse the latest
          </Link>
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                {item.path ? (
                  <Link
                    href={item.path}
                    className="font-semibold text-foreground hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <p className="font-semibold text-foreground">{item.title}</p>
                )}
                {item.excerpt ? (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {item.excerpt}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                disabled={busyId === `${busyPrefix}${item.id}`}
                onClick={() => onRemove(item.id)}
                className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground hover:text-foreground disabled:opacity-50"
              >
                {busyId === `${busyPrefix}${item.id}` ? "…" : actionLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
