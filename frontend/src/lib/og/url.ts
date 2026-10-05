export type OgUrlInput = {
  title: string;
  eyebrow?: string;
  /** Big number for result share cards, e.g. "2,150". */
  stat?: string;
  statLabel?: string;
};

/** Relative URL for the dynamic share card; resolved against `metadataBase`. */
export function ogImageUrl(input: OgUrlInput): string {
  const p = new URLSearchParams();
  p.set("title", input.title);
  if (input.eyebrow) p.set("eyebrow", input.eyebrow);
  if (input.stat) p.set("stat", input.stat);
  if (input.statLabel) p.set("label", input.statLabel);
  return `/og?${p.toString()}`;
}
