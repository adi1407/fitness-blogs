type Props = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  path: string | null;
  siteOrigin: string;
  ogImage: string;
  featuredImage: string;
};

/** Google-ish snippet + OG card preview from current editor fields. */
export function SerpSocialPreview({
  title,
  metaTitle,
  metaDescription,
  path,
  siteOrigin,
  ogImage,
  featuredImage,
}: Props) {
  const displayTitle = (metaTitle || title || "Untitled").slice(0, 60);
  const displayDesc = (
    metaDescription ||
    "Add a meta description so searchers see a clear snippet."
  ).slice(0, 160);
  const url = path ? `${siteOrigin}${path}` : `${siteOrigin}/blog/…`;
  const image = ogImage || featuredImage;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">SERP &amp; social preview</h2>
      <p className="mt-1 text-sm text-slate-500">
        How this may look in Google and link previews. Title ~60 chars,
        description ~155–160.
      </p>

      <div className="mt-4 max-w-xl rounded-lg border border-slate-100 bg-slate-50/80 p-4">
        <p className="truncate text-sm text-emerald-800">{url}</p>
        <p className="mt-1 text-xl text-[#1a0dab]">{displayTitle}</p>
        <p className="mt-1 text-sm leading-snug text-slate-600">{displayDesc}</p>
        <p className="mt-2 text-xs text-slate-400">
          Title {displayTitle.length}/60 · Description {displayDesc.length}/160
        </p>
      </div>

      <div className="mt-4 max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-36 w-full object-cover" />
        ) : (
          <div className="flex h-36 items-center justify-center bg-slate-100 text-xs text-slate-400">
            No OG / featured image
          </div>
        )}
        <div className="p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {siteOrigin.replace(/^https?:\/\//, "")}
          </p>
          <p className="mt-1 font-semibold text-slate-900">{displayTitle}</p>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {displayDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
