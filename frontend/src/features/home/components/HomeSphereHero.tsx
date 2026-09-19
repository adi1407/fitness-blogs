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

  const target = Math.max(36, base.length * 2);
  const out: ImageData[] = [];
  for (let i = 0; i < target; i++) {
    const item = base[i % base.length];
    out.push({
      ...item,
      id: `${item.id}-${i}`,
    });
  }
  return out;
}

function sphereSizeForWidth(w: number): number {
  // Fill the hero viewport — almost full width, capped by height.
  const byWidth = Math.min(w - 16, 900);
  const byHeight = Math.min(window.innerHeight * 0.72, 720);
  return Math.round(Math.min(byWidth, byHeight, w < 480 ? w - 8 : byWidth));
}

/** Full-bleed sphere hero — no left copy; covers the entire first viewport band. */
export function HomeSphereHero({ articles }: HomeSphereHeroProps) {
  const latest = useMemo(() => articles.slice(0, 20), [articles]);
  const images = useMemo(() => toSphereImages(latest), [latest]);
  const [size, setSize] = useState(360);

  useEffect(() => {
    const sync = () => setSize(sphereSizeForWidth(window.innerWidth));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (images.length === 0) return null;

  return (
    <section
      className="relative flex min-h-[min(78svh,720px)] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B2533] via-[#0B2533] to-[#123447]"
      aria-label="Latest stories sphere"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(41,182,246,0.22),transparent_60%)]" />
      <div className="relative z-10 flex w-full max-w-full items-center justify-center px-1 py-4 sm:px-2 sm:py-6">
        <SphereImageGrid
          images={images}
          containerSize={size}
          sphereRadius={Math.round(size * 0.44)}
          dragSensitivity={0.8}
          momentumDecay={0.96}
          maxRotationSpeed={5}
          baseImageScale={size < 360 ? 0.16 : 0.14}
          hoverScale={1.3}
          perspective={1100}
          autoRotate
          autoRotateSpeed={0.2}
          className="max-w-full"
        />
      </div>
    </section>
  );
}
