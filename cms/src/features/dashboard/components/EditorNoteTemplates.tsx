import { useEffect, useState } from "react";
import {
  DEFAULT_NOTE_TEMPLATES,
  loadNoteTemplates,
  saveNoteTemplates,
  type NoteTemplate,
} from "@/features/dashboard/utils/noteTemplates";

type Props = {
  note: string;
  onNoteChange: (note: string) => void;
};

/** Local note templates for request-changes / reject. */
export function EditorNoteTemplates({ note, onNoteChange }: Props) {
  const [templates, setTemplates] = useState<NoteTemplate[]>(
    DEFAULT_NOTE_TEMPLATES,
  );
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setTemplates(loadNoteTemplates());
  }, []);

  function applyTemplate(t: NoteTemplate) {
    onNoteChange(t.body);
  }

  function updateTemplate(id: string, body: string) {
    const next = templates.map((t) => (t.id === id ? { ...t, body } : t));
    setTemplates(next);
    saveNoteTemplates(next);
  }

  function resetDefaults() {
    setTemplates(DEFAULT_NOTE_TEMPLATES);
    saveNoteTemplates(DEFAULT_NOTE_TEMPLATES);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-slate-900">Editor note</h2>
          <p className="text-xs text-slate-500">
            Used for request changes / reject. Pick a template or write your own.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="text-xs font-semibold text-sky-700 hover:underline"
        >
          {editing ? "Done editing templates" : "Edit templates"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => applyTemplate(t)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-sky-300 hover:bg-sky-50"
          >
            {t.label}
          </button>
        ))}
      </div>

      {editing ? (
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          {templates.map((t) => (
            <label key={t.id} className="block text-xs font-medium text-slate-600">
              {t.label}
              <textarea
                value={t.body}
                onChange={(e) => updateTemplate(t.id, e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900"
              />
            </label>
          ))}
          <button
            type="button"
            onClick={resetDefaults}
            className="text-xs font-semibold text-slate-500 hover:underline"
          >
            Reset to defaults
          </button>
        </div>
      ) : null}

      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        rows={3}
        placeholder="Editor note for the writer…"
        className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />
    </section>
  );
}
