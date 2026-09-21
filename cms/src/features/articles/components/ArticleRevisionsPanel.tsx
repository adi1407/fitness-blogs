import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";

type RevisionSummary = {
  id: string;
  revisionNumber: number;
  reason: string;
  actorName: string;
  createdAt: string;
  title: string;
  status: string;
  bodyPreview: string;
};

type Snapshot = {
  title: string;
  slug: string | null;
  excerpt: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  quickAnswer: string;
  status: string;
};

type Props = {
  articleId: string | null;
  canRestore: boolean;
  current: {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    quickAnswer: string;
  };
  onRestored: (article: Record<string, unknown>) => void;
};

function reasonLabel(reason: string) {
  if (reason === "publish") return "Before publish";
  if (reason === "before_restore") return "Before restore";
  return "Save";
}

function fieldDiffs(current: Props["current"], snap: Snapshot) {
  const pairs: { label: string; before: string; after: string }[] = [];
  const check = (label: string, a: string, b: string) => {
    if (a !== b) pairs.push({ label, before: b || "—", after: a || "—" });
  };
  check("Title", current.title, snap.title);
  check("Slug", current.slug, snap.slug ?? "");
  check("Excerpt", current.excerpt, snap.excerpt);
  check("Quick answer", current.quickAnswer, snap.quickAnswer);
  check("Primary keyword", current.primaryKeyword, snap.primaryKeyword);
  check("Meta title", current.metaTitle, snap.metaTitle);
  check("Meta description", current.metaDescription, snap.metaDescription);
  if (current.body !== snap.body) {
    pairs.push({
      label: "Body",
      before: `${snap.body.replace(/<[^>]+>/g, " ").slice(0, 180)}…`,
      after: `${current.body.replace(/<[^>]+>/g, " ").slice(0, 180)}…`,
    });
  }
  return pairs;
}

/** Revision history for the open article — compare and restore. */
export function ArticleRevisionsPanel({
  articleId,
  canRestore,
  current,
  onRestored,
}: Props) {
  const [revisions, setRevisions] = useState<RevisionSummary[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!articleId) {
      setRevisions([]);
      return;
    }
    try {
      const data = await apiFetch<{ revisions: RevisionSummary[] }>(
        `/articles/${articleId}/revisions`,
      );
      setRevisions(data.revisions);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load revisions");
    }
  }, [articleId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleCompare(id: string) {
    if (openId === id) {
      setOpenId(null);
      setSnapshot(null);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const data = await apiFetch<{
        revision: { snapshot: Snapshot };
      }>(`/articles/${articleId}/revisions/${id}`);
      setSnapshot(data.revision.snapshot);
      setOpenId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load revision");
    } finally {
      setBusy(false);
    }
  }

  async function restore(id: string) {
    if (!articleId || !canRestore) return;
    if (
      !window.confirm(
        "Restore this revision? Your current draft will be saved as a new revision first.",
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const data = await apiFetch<{ article: Record<string, unknown> }>(
        `/articles/${articleId}/revisions/${id}/restore`,
        { method: "POST" },
      );
      onRestored(data.article);
      await load();
      setOpenId(null);
      setSnapshot(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Restore failed");
    } finally {
      setBusy(false);
    }
  }

  if (!articleId) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Revision history</h2>
        <button
          type="button"
          onClick={() => void load()}
          className="text-xs font-semibold text-sky-700 hover:underline"
        >
          Refresh
        </button>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Snapshots are kept when content changes (including autosave). Identical
        saves are skipped.
      </p>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      {revisions.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No revisions yet. Edit and save to create the first snapshot.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {revisions.map((rev) => {
            const open = openId === rev.id;
            const diffs =
              open && snapshot ? fieldDiffs(current, snapshot) : [];
            return (
              <li key={rev.id} className="py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      #{rev.revisionNumber} · {reasonLabel(rev.reason)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(rev.createdAt).toLocaleString()}
                      {rev.actorName ? ` · ${rev.actorName}` : ""}
                      {rev.title ? ` · ${rev.title}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void toggleCompare(rev.id)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60"
                    >
                      {open ? "Hide" : "Compare"}
                    </button>
                    {canRestore ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void restore(rev.id)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60"
                      >
                        Restore
                      </button>
                    ) : null}
                  </div>
                </div>
                {open ? (
                  <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
                    {diffs.length === 0 ? (
                      <p className="text-slate-500">
                        No field differences vs the current editor values.
                      </p>
                    ) : (
                      <ul className="space-y-3">
                        {diffs.map((d) => (
                          <li key={d.label}>
                            <p className="font-semibold text-slate-800">
                              {d.label}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Then
                            </p>
                            <p className="whitespace-pre-wrap text-slate-700">
                              {d.before}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Now
                            </p>
                            <p className="whitespace-pre-wrap text-slate-700">
                              {d.after}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
