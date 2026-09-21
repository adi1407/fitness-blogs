import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type Article } from "@/lib/api/client";
import { EditorNoteTemplates } from "@/features/dashboard/components/EditorNoteTemplates";
import { EditorReviewQueue } from "@/features/dashboard/components/EditorReviewQueue";
import { EditorBulkBar } from "@/features/dashboard/components/EditorBulkBar";
import { EditorWriterCoaching } from "@/features/dashboard/components/EditorWriterCoaching";
import { StaleContentQueue } from "@/features/dashboard/components/StaleContentQueue";
import { editorQuality } from "@/features/dashboard/utils/seoCompleteness";
import { daysWaiting, publishedThisWeek } from "@/features/dashboard/utils/writerMetrics";
import {
  confirmPublishIfNeeded,
  loadClaimedIds,
  runBulkEditorTransitions,
  runEditorTransition,
  saveClaimedIds,
  type EditorAction,
} from "@/features/dashboard/utils/editorTransitions";

type Props = {
  userId: string;
  userName: string;
  isAdmin: boolean;
};

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

/** Full editor/admin review desk. */
export function EditorDesk({ userId, userName, isAdmin }: Props) {
  const [submitted, setSubmitted] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [claimedIds, setClaimedIds] = useState<Set<string>>(() =>
    loadClaimedIds(userId),
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);

  const refresh = useCallback(async () => {
    setError("");
    try {
      const [queue, all] = await Promise.all([
        apiFetch<{ articles: Article[] }>("/articles?status=submitted&limit=100"),
        apiFetch<{ articles: Article[] }>("/articles?limit=100"),
      ]);
      setSubmitted(queue.articles);
      setAllArticles(all.articles);
      setSelectedIds((prev) => {
        const valid = new Set(queue.articles.map((a) => a.id));
        return new Set([...prev].filter((id) => valid.has(id)));
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load queue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    saveClaimedIds(userId, claimedIds);
  }, [userId, claimedIds]);

  const kpis = useMemo(() => {
    const waits = submitted.map((a) => daysWaiting(a.updatedAt));
    const oldest = waits.length ? Math.max(...waits) : 0;
    const ready = submitted.filter((a) => editorQuality(a).ready).length;
    const week = publishedThisWeek(allArticles).length;
    return {
      submitted: submitted.length,
      oldest,
      ready,
      week,
    };
  }, [submitted, allArticles]);

  const selectedArticles = useMemo(
    () => submitted.filter((a) => selectedIds.has(a.id)),
    [submitted, selectedIds],
  );

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    setSelectedIds((prev) => {
      if (submitted.every((a) => prev.has(a.id))) return new Set();
      return new Set(submitted.map((a) => a.id));
    });
  }

  function toggleClaim(id: string) {
    setClaimedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleRowAction(article: Article, action: EditorAction) {
    setMessage("");
    setError("");
    if (action !== "publish" && !note.trim()) {
      setError("Add an editor note (or pick a template) before that action.");
      return;
    }
    if (action === "publish" && !confirmPublishIfNeeded(article)) return;

    setBusyId(article.id);
    try {
      await runEditorTransition(
        article.id,
        action,
        action === "publish" ? undefined : note,
      );
      setMessage(
        action === "publish"
          ? `Published “${article.title || "Untitled"}”`
          : action === "request-changes"
            ? `Sent “${article.title || "Untitled"}” back for changes`
            : `Rejected “${article.title || "Untitled"}”`,
      );
      setClaimedIds((prev) => {
        const next = new Set(prev);
        next.delete(article.id);
        return next;
      });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  async function handleBulk(action: EditorAction) {
    setMessage("");
    setError("");
    if (action !== "publish" && !note.trim()) {
      setError("Add an editor note before bulk request-changes or reject.");
      return;
    }
    setBulkBusy(true);
    try {
      const result = await runBulkEditorTransitions(
        selectedArticles,
        action,
        action === "publish" ? undefined : note,
        { skipPublishConfirm: false },
      );
      const parts: string[] = [];
      if (result.ok.length) parts.push(`${result.ok.length} succeeded`);
      if (result.failed.length) {
        parts.push(
          `${result.failed.length} failed: ${result.failed
            .slice(0, 3)
            .map((f) => f.title)
            .join(", ")}`,
        );
      }
      setMessage(parts.join(" · ") || "Done");
      if (result.failed.some((f) => f.error !== "Cancelled")) {
        setError(
          result.failed
            .filter((f) => f.error !== "Cancelled")
            .slice(0, 3)
            .map((f) => `${f.title}: ${f.error}`)
            .join("; "),
        );
      }
      setSelectedIds(new Set());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bulk action failed");
    } finally {
      setBulkBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Editor desk</h1>
          <p className="mt-1 text-slate-600">
            Welcome, {userName}. Clear the review queue, coach writers, and
            publish with quality gates.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/articles?status=submitted"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-sky-400"
          >
            Full list
          </Link>
          {isAdmin ? (
            <Link
              to="/admin/analytics"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-sky-400"
            >
              Analytics
            </Link>
          ) : null}
          <Link
            to="/articles/new"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            New article
          </Link>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}

      {loading ? (
        <p className="mt-8 text-slate-500">Loading queue…</p>
      ) : (
        <div className="mt-8 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="In queue" value={kpis.submitted} hint="Submitted" />
            <StatTile
              label="Oldest wait"
              value={kpis.oldest}
              hint={kpis.oldest === 1 ? "day" : "days"}
            />
            <StatTile
              label="Ready to publish"
              value={kpis.ready}
              hint="≥85% quality"
            />
            <StatTile
              label="Published this week"
              value={kpis.week}
              hint="All writers"
            />
          </div>

          <EditorNoteTemplates note={note} onNoteChange={setNote} />

          <EditorReviewQueue
            articles={submitted}
            selectedIds={selectedIds}
            claimedIds={claimedIds}
            busyId={busyId}
            onToggleSelect={toggleSelect}
            onToggleSelectAll={toggleSelectAll}
            onToggleClaim={toggleClaim}
            onAction={handleRowAction}
          />

          <EditorBulkBar
            selected={selectedArticles}
            busy={bulkBusy || Boolean(busyId)}
            onClear={() => setSelectedIds(new Set())}
            onAction={(action) => void handleBulk(action)}
          />

          <StaleContentQueue articles={allArticles} />

          <EditorWriterCoaching articles={allArticles} />
        </div>
      )}
    </div>
  );
}
