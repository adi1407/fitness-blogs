import { useState } from "react";
import { apiFetch, type Article } from "@/lib/api/client";

type Props = {
  articleId: string;
  status: Article["status"];
  publishedAt: string | null;
  /** Custom date for the next Publish click (unpublished articles only). */
  pendingDate: string;
  onPendingDateChange: (value: string) => void;
  onUpdated: (article: Article) => void;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** ISO → `YYYY-MM-DDTHH:mm` in the browser's local time, for `datetime-local`. */
export function toLocalInput(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** `datetime-local` value (local time) → ISO string, or null when empty/invalid. */
export function localInputToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Admin-only control over an article's public publish date and time. */
export function PublishDatePanel({
  articleId,
  status,
  publishedAt,
  pendingDate,
  onPendingDateChange,
  onUpdated,
}: Props) {
  const isPublished = status === "published";
  const [draft, setDraft] = useState(() =>
    publishedAt ? toLocalInput(publishedAt) : "",
  );
  const [syncedFrom, setSyncedFrom] = useState(publishedAt);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  if (publishedAt !== syncedFrom) {
    setSyncedFrom(publishedAt);
    setDraft(publishedAt ? toLocalInput(publishedAt) : "");
  }

  const max = toLocalInput(new Date());

  async function saveDate() {
    const iso = localInputToIso(draft);
    if (!iso) {
      setError("Pick a valid date and time");
      return;
    }
    setSaving(true);
    setError("");
    setNote("");
    try {
      const data = await apiFetch<{ article: Article }>(
        `/articles/${articleId}/published-at`,
        { method: "PATCH", body: JSON.stringify({ publishedAt: iso }) },
      );
      onUpdated(data.article);
      setNote("Publish date updated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update date");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Publish date &amp; time</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
          Admin
        </span>
      </div>

      {isPublished ? (
        <>
          <p className="mt-1 text-sm text-slate-500">
            Live since{" "}
            <span className="font-medium text-slate-800">
              {publishedAt ? formatWhen(publishedAt) : "—"}
            </span>
            . This is the date readers and Google see.
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">New date &amp; time</span>
              <input
                type="datetime-local"
                value={draft}
                max={max}
                onChange={(e) => setDraft(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
            <button
              type="button"
              disabled={saving || !draft || draft === toLocalInput(publishedAt ?? "")}
              onClick={() => void saveDate()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Update date"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setDraft(toLocalInput(new Date()))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Now
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-slate-500">
            Publishing uses the moment you click <strong>Publish</strong> —
            including when you republish an article you unpublished earlier.
            Pick a date only to backdate it.
            {publishedAt ? (
              <>
                {" "}
                Previously published {formatWhen(publishedAt)}.
              </>
            ) : null}
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">
                Custom publish date (optional)
              </span>
              <input
                type="datetime-local"
                value={pendingDate}
                max={max}
                onChange={(e) => onPendingDateChange(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
            {pendingDate ? (
              <button
                type="button"
                onClick={() => onPendingDateChange("")}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Use publish time
              </button>
            ) : null}
          </div>
        </>
      )}

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      {note ? <p className="mt-3 text-sm text-emerald-700">{note}</p> : null}
    </section>
  );
}
