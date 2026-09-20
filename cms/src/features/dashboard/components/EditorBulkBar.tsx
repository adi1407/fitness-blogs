import type { Article } from "@/lib/api/client";
import type { EditorAction } from "@/features/dashboard/utils/editorTransitions";

type Props = {
  selected: Article[];
  busy: boolean;
  onClear: () => void;
  onAction: (action: EditorAction) => void;
};

/** Selection bar for bulk publish / request-changes / reject. */
export function EditorBulkBar({ selected, busy, onClear, onAction }: Props) {
  if (selected.length === 0) return null;

  return (
    <div className="sticky bottom-4 z-20 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">
          {selected.length} selected
          <button
            type="button"
            onClick={onClear}
            className="ml-3 text-xs font-semibold text-sky-700 hover:underline"
          >
            Clear
          </button>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => onAction("publish")}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Publish
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onAction("request-changes")}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
          >
            Request changes
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onAction("reject")}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
