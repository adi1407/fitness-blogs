import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export type RichTextEditorHandle = {
  getHtml: () => string;
  setHtml: (html: string) => void;
};

type Props = {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
  placeholder?: string;
  labelHint?: string;
};

/** Article body editor — TipTap (news-kothari used CKEditor; same form fields/API). */
const RichTextEditor = forwardRef<RichTextEditorHandle, Props>(
  function RichTextEditor(
    { value, onChange, disabled, placeholder, labelHint },
    ref,
  ) {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Placeholder.configure({
          placeholder: placeholder || "Write the article…",
        }),
      ],
      content: value || "",
      editable: !disabled,
      onUpdate: ({ editor: ed }) => {
        onChange(ed.getHTML());
      },
    });

    useImperativeHandle(ref, () => ({
      getHtml: () => editor?.getHTML() ?? "",
      setHtml: (html: string) => {
        editor?.commands.setContent(html || "", { emitUpdate: false });
      },
    }));

    useEffect(() => {
      if (!editor) return;
      editor.setEditable(!disabled);
    }, [disabled, editor]);

    useEffect(() => {
      if (!editor) return;
      const current = editor.getHTML();
      if ((value || "") === current) return;
      editor.commands.setContent(value || "", { emitUpdate: false });
    }, [value, editor]);

    return (
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {labelHint ? (
          <p className="px-3 pt-2 text-xs text-slate-500">{labelHint}</p>
        ) : null}
        <div className="flex flex-wrap gap-1 border-b border-slate-100 bg-slate-50 px-2 py-2">
          <ToolbarBtn
            disabled={disabled}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            label="Bold"
          />
          <ToolbarBtn
            disabled={disabled}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            label="Italic"
          />
          <ToolbarBtn
            disabled={disabled}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            label="Bullets"
          />
          <ToolbarBtn
            disabled={disabled}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            label="Numbers"
          />
          <ToolbarBtn
            disabled={disabled}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            label="H2"
          />
          <ToolbarBtn
            disabled={disabled}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            label="H3"
          />
          <ToolbarBtn
            disabled={disabled}
            onClick={() => {
              const url = window.prompt("Link URL");
              if (!url) return;
              editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }}
            label="Link"
          />
        </div>
        <EditorContent
          editor={editor}
          className="cms-rich-editor min-h-[320px] px-4 py-3 text-sm leading-relaxed prose prose-sm max-w-none [&_.tiptap]:min-h-[280px] [&_.tiptap]:outline-none"
        />
      </div>
    );
  },
);

function ToolbarBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export default RichTextEditor;
