"use client";

import { useEffect, useMemo, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";

type HomeSphereHeroProps = {
  articles: PublicBlogArticle[];
};

function toSphereImages(articles: PublicBlogArticle[]): ImageData[] {
  const base: ImageData[] = [];
  for (const a of articles) {
    const href = articleHref(a);
    if (!href) continue;
    base.push({
      id: a.id,
      src: articleImage(a),
      alt: a.featuredImageAlt || a.title,
      title: a.title,
      description:
        a.excerpt ||
        (a.categoryLabel
          ? `${a.categoryLabel}${a.readingTime ? ` · ${a.readingTime} min read` : ""}`
          : undefined),
      href,
    });
  }

  if (base.length === 0) return [];

  const target = Math.max(32, Math.min(48, base.length * 2));
  const out: ImageData[] = [];
  for (let i = 0; i < target; i++) {
    const item = base[i % base.length];
    out.push({ ...item, id: `${item.id}-${i}` });
  }
  return out;
}

function sphereSizeForWidth(w: number, h: number): number {
  const pad = w < 480 ? 12 : 24;
  const byW = w - pad * 2;
  const byH = h - 120; // leave room under fixed header
  return Math.round(Math.max(260, Math.min(byW, byH, 640)));
}

/** Full-bleed sphere hero — sphere only, no left copy column. */
export function HomeSphereHero({ articles }: HomeSphereHeroProps) {
  const pool = useMemo(() => articles.slice(0, 20), [articles]);
  const images = useMemo(() => toSphereImages(pool), [pool]);
  const [size, setSize] = useState(320);

  useEffect(() => {
    const sync = () =>
      setSize(sphereSizeForWidth(window.innerWidth, window.innerHeight));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (images.length === 0) return null;

  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#0B2533]"
      style={{ minHeight: "min(70svh, 620px)" }}
      aria-label="Latest stories sphere"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(41,182,246,0.2),transparent_62%)]" />
      <div className="relative z-10 flex w-full items-center justify-center py-6">
        <SphereImageGrid
          images={images}
          containerSize={size}
          sphereRadius={Math.round(size * 0.42)}
          dragSensitivity={0.75}
          momentumDecay={0.96}
          maxRotationSpeed={5}
          baseImageScale={size < 340 ? 0.17 : 0.145}
          hoverScale={1.25}
          perspective={1000}
          autoRotate
          autoRotateSpeed={0.18}
        />
      </div>
    </section>
  );
}
