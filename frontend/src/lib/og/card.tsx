import { ImageResponse } from "next/og";
import { BRAND_NAME } from "@/lib/brand";
import type { OgUrlInput } from "@/lib/og/url";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const INK = "#0A0A0A";
const ACCENT = "#FF9800";
const MUTED = "#525252";

let fontPromise: Promise<ArrayBuffer | null> | null = null;

/** Roboto Slab Bold as TTF (Satori can't read woff2). Cached per server instance; null on failure. */
export function loadOgFont(): Promise<ArrayBuffer | null> {
  fontPromise ??= (async () => {
    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap",
        { headers: { "User-Agent": "Mozilla/4.0" }, cache: "force-cache" },
      ).then((r) => r.text());
      const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/)?.[1];
      if (!url) return null;
      return await fetch(url, { cache: "force-cache" }).then((r) => r.arrayBuffer());
    } catch {
      return null;
    }
  })();
  return fontPromise.then((f) => {
    if (!f) fontPromise = null;
    return f;
  });
}

export type OgCardInput = OgUrlInput & {
  /** Absolute origin used to fetch the logo. */
  origin: string;
};

function clamp(text: string, max: number) {
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

export async function renderOgCard({
  title,
  eyebrow,
  stat,
  statLabel,
  origin,
}: OgCardInput): Promise<ImageResponse> {
  const font = await loadOgFont();
  const safeTitle = clamp(title || BRAND_NAME, stat ? 70 : 110);
  const titleSize = stat ? 48 : safeTitle.length > 70 ? 56 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: "64px 72px",
          fontFamily: font ? "Roboto Slab" : "sans-serif",
          borderBottom: `16px solid ${ACCENT}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${origin}/brand/logofitness.png`} width={67} height={64} alt="" />
          <span style={{ fontSize: 40, fontWeight: 700, color: INK }}>{BRAND_NAME}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow ? (
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {clamp(eyebrow, 48)}
            </span>
          ) : null}
          <span style={{ fontSize: titleSize, fontWeight: 700, color: INK, lineHeight: 1.15 }}>
            {safeTitle}
          </span>
          {stat ? (
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 8 }}>
              <span
                style={{
                  fontSize: stat.length > 12 ? 72 : stat.length > 8 ? 96 : 120,
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1,
                }}
              >
                {clamp(stat, 22)}
              </span>
              {statLabel ? (
                <span style={{ fontSize: 34, color: MUTED }}>{clamp(statLabel, 30)}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        <span style={{ fontSize: 24, color: MUTED }}>
          fitlives.in · Evidence-informed fitness & nutrition for India
        </span>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [{ name: "Roboto Slab", data: font, weight: 700, style: "normal" }] : undefined,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}

export { ogImageUrl } from "@/lib/og/url";
