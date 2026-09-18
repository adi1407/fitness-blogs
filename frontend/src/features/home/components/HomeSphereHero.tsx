"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

  // Fill the sphere so latest posts still look dense with a small library.
  const target = Math.max(24, base.length);
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

/** Home hero: latest blogs on an img-sphere — tap preview, then open the article. */
export function HomeSphereHero({ articles }: HomeSphereHeroProps) {
  const latest = useMemo(() => articles.slice(0, 8), [articles]);
  const images = useMemo(() => toSphereImages(latest), [latest]);
  const [size, setSize] = useState(440);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) setSize(300);
      else if (w < 768) setSize(380);
      else if (w < 1024) setSize(460);
      else setSize(520);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (images.length === 0) return null;

  const featured = latest[0];
  const featuredHref = featured ? articleHref(featured) : null;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0B2533] via-[#0B2533] to-[#123447]"
      aria-label="Latest stories sphere"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(41,182,246,0.18),transparent_65%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-10 pt-8 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:pb-14 lg:pt-12">
        <div className="z-10 max-w-xl text-center lg:flex-1 lg:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-200/90 uppercase">
            Latest
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Spin the story sphere
          </h2>
          <p className="mt-3 text-sm text-white/75 sm:text-base">
            Drag to explore recent guides. Tap a cover to preview — then open
            the full article.
          </p>
          {featured && featuredHref ? (
            <Link
              href={featuredHref}
              className="mt-6 inline-flex rounded-full bg-[#FF9800] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FFA726]"
            >
              Read newest →
            </Link>
          ) : null}
        </div>

        <div className="mt-8 flex justify-center lg:mt-0 lg:flex-1">
          <SphereImageGrid
            images={images}
            containerSize={size}
            sphereRadius={Math.round(size * 0.42)}
            dragSensitivity={0.75}
            momentumDecay={0.96}
            maxRotationSpeed={5}
            baseImageScale={0.15}
            hoverScale={1.28}
            perspective={1000}
            autoRotate
            autoRotateSpeed={0.22}
          />
        </div>
      </div>
    </section>
  );
}
