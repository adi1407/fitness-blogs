import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { apiUpload } from "@/lib/api/client";

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

type UploadResult = {
  url: string;
  guidance?: {
    inArticle?: { note?: string; recommendedWidthPx?: string };
  };
};

/** Article body editor — TipTap with insert-image-at-cursor from files. */
const RichTextEditor = forwardRef<RichTextEditorHandle, Props>(
  function RichTextEditor(
    { value, onChange, disabled, placeholder, labelHint },
    ref,
  ) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Image.configure({
          inline: false,
          allowBase64: false,
          HTMLAttributes: {
            class: "cms-article-image",
          },
        }),
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

    async function insertImageFromFile(file: File) {
      if (!editor || disabled) return;
      setUploadError("");
      setUploading(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const data = await apiUpload<UploadResult>("/uploads/image", form);
        const alt =
          window.prompt("Image alt text (describe the image for accessibility)", "") ??
          "";
        editor
          .chain()
          .focus()
          .setImage({ src: data.url, alt: alt.trim() || file.name })
          .run();
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }

    return (
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {labelHint ? (
          <p className="px-3 pt-2 text-xs text-slate-500">{labelHint}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 bg-slate-50 px-2 py-2">
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
              editor
                ?.chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }}
            label="Link"
          />
          <ToolbarBtn
            disabled={disabled || uploading}
            onClick={() => fileInputRef.current?.click()}
            label={uploading ? "Uploading…" : "Add image"}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void insertImageFromFile(file);
            }}
          />
        </div>
        <p className="border-b border-slate-100 bg-amber-50 px-3 py-2 text-xs text-amber-950">
          <strong>Image size:</strong> upload JPEG/PNG/WebP/GIF up to{" "}
          <strong>5&nbsp;MB</strong>. Best look on desktop monitors:{" "}
          <strong>1600–1920px wide</strong> (16:9 or 3:2 landscape). The image
          inserts at your cursor and scales full-width on the site.
        </p>
        {uploadError ? (
          <p className="border-b border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
            {uploadError}
          </p>
        ) : null}
        <EditorContent
          editor={editor}
          className="cms-rich-editor min-h-[320px] px-4 py-3 text-sm leading-relaxed prose prose-sm max-w-none [&_.tiptap]:min-h-[280px] [&_.tiptap]:outline-none [&_img.cms-article-image]:my-4 [&_img.cms-article-image]:max-h-[28rem] [&_img.cms-article-image]:w-full [&_img.cms-article-image]:rounded-lg [&_img.cms-article-image]:object-contain"
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
