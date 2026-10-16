import { useMemo, useState } from "react";

const SITE =
  (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(
    /\/$/,
    "",
  ) ?? "https://fitlives.in";

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "youtube", label: "YouTube" },
  { id: "x", label: "X" },
] as const;

type Platform = (typeof PLATFORMS)[number]["id"];

type Props = {
  title: string;
  path: string | null;
  slug?: string | null;
  blurb?: string;
  disabled?: boolean;
};

function campaignSlug(title: string, slug?: string | null) {
  const raw = (slug || title || "post")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return raw || "post";
}

function buildCaption(title: string, blurb: string, url: string) {
  const body = blurb.trim()
    ? blurb.trim().slice(0, 120).replace(/\s+\S*$/, "") +
      (blurb.trim().length > 120 ? "…" : "")
    : "";
  const lines = [title.trim(), body, "", `Read more: ${url}`].filter(
    (line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""),
  );
  return lines.join("\n").trim();
}

export function ShareCaptionPanel({
  title,
  path,
  slug,
  blurb = "",
  disabled,
}: Props) {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [message, setMessage] = useState("");

  const url = useMemo(() => {
    if (!path) return "";
    const campaign = campaignSlug(title, slug);
    const u = new URL(`${SITE}${path.startsWith("/") ? path : `/${path}`}`);
    u.searchParams.set("utm_source", platform);
    u.searchParams.set("utm_medium", "social");
    u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  }, [path, platform, slug, title]);

  const caption = useMemo(
    () => (url ? buildCaption(title || "fitlives", blurb, url) : ""),
    [title, blurb, url],
  );

  async function copy(text: string, okMsg: string) {
    setMessage("");
    try {
      await navigator.clipboard.writeText(text);
      setMessage(okMsg);
    } catch {
      setMessage("Could not copy — select and copy manually.");
    }
  }

  if (!path) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Share for social</h2>
        <p className="mt-1 text-sm text-slate-500">
          Save the piece so it has a public path, then copy a tracked caption.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Share for social</h2>
      <p className="mt-1 text-sm text-slate-500">
        Copy an Instagram-ready caption with UTM tags for GA attribution.
      </p>

      <label className="mt-4 block text-sm font-medium">
        Platform
        <select
          value={platform}
          disabled={disabled}
          onChange={(e) => setPlatform(e.target.value as Platform)}
          className="mt-1 w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          {PLATFORMS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-3 block text-sm font-medium">
        Tracked link
        <input
          readOnly
          value={url}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs"
        />
      </label>

      <label className="mt-3 block text-sm font-medium">
        Caption
        <textarea
          readOnly
          rows={5}
          value={caption}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
        />
      </label>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => void copy(caption, "Caption copied.")}
          className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Copy caption
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => void copy(url, "Link copied.")}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Copy link
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            void copy(`${caption}\n\n${url}`, "Caption and link copied.")
          }
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Copy both
        </button>
      </div>
      {message ? (
        <p className="mt-2 text-sm text-emerald-700">{message}</p>
      ) : null}
    </section>
  );
}
