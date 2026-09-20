export type NoteTemplate = { id: string; label: string; body: string };

export const DEFAULT_NOTE_TEMPLATES: NoteTemplate[] = [
  {
    id: "sources",
    label: "Add sources",
    body: "Please add credible sources (and links where possible) to support key claims before resubmitting.",
  },
  {
    id: "quick-answer",
    label: "Strengthen quick answer",
    body: "Please tighten the Quick Answer so it directly addresses the search intent in 2–4 clear sentences.",
  },
  {
    id: "cover",
    label: "Fix featured image / alt",
    body: "Please add a featured image and descriptive alt text suitable for the article hero and social share.",
  },
  {
    id: "disclaimer",
    label: "Clarify educational tone",
    body: "Please soften any medical/cure framing and keep educational language plus a consult-a-professional note where relevant.",
  },
  {
    id: "depth",
    label: "Expand body depth",
    body: "Please expand the body with practical steps, tables or examples, and clearer internal links to tools/guides.",
  },
];

const TEMPLATES_KEY = "cms_editor_note_templates";

export function loadNoteTemplates(): NoteTemplate[] {
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    if (!raw) return DEFAULT_NOTE_TEMPLATES;
    const parsed = JSON.parse(raw) as NoteTemplate[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_NOTE_TEMPLATES;
    }
    return parsed;
  } catch {
    return DEFAULT_NOTE_TEMPLATES;
  }
}

export function saveNoteTemplates(templates: NoteTemplate[]) {
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  } catch {
    /* ignore */
  }
}
