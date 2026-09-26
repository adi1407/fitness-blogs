import { useRef, useState } from "react";
import { apiUpload } from "@/lib/api/client";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  /** Shown under the field — size guidance for covers vs body images. */
  hint?: string;
};

type UploadResult = { url: string };

/**
 * URL field + “Upload from files” for featured / OG images.
 */
export function ImageUrlUploadField({
  label,
  value,
  onChange,
  disabled,
  hint = "Best: 1920×1080 (16:9), JPEG/WebP under 5 MB — sharp on desktop and social shares.",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const data = await apiUpload<UploadResult>("/uploads/image", form);
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="block text-sm font-medium">
      <span>{label}</span>
      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="https://… or upload a file"
          className="w-full flex-1 rounded-lg border border-slate-200 px-3 py-2 font-normal disabled:opacity-60"
        />
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload from files"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onFile(file);
          }}
        />
      </div>
      {hint ? (
        <p className="mt-1 text-xs font-normal text-slate-500">{hint}</p>
      ) : null}
      {error ? <p className="mt-1 text-xs font-normal text-red-600">{error}</p> : null}
      {value ? (
        <div className="mt-2 max-h-40 w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
          <img
            src={value}
            alt=""
            className="mx-auto max-h-40 w-full object-contain object-center"
          />
        </div>
      ) : null}
    </div>
  );
}
