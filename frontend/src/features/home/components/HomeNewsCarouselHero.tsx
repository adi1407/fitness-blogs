"use client";

import Carousel from "@/components/ui/carousel";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";

type Props = {
  articles: PublicBlogArticle[];
};

const FALLBACK_SLIDES = [
  {
    title: "How much protein do you need?",
    button: "Read · Nutrition",
    src: "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=1400&auto=format&fit=crop",
    href: "/nutrition/protein",
  },
  {
    title: "Build muscle with progressive overload",
    button: "Read · Muscle Building",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop",
    href: "/muscle-building",
  },
  {
    title: "Sustainable fat loss basics",
    button: "Read · Weight Loss",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1400&auto=format&fit=crop",
    href: "/weight-loss",
  },
  {
    title: "Free TDEE & protein calculators",
    button: "Open tools",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop",
    href: "/tools",
  },
];

/** NewsKothari-style lead stories — full-bleed carousel above the keep band. */
export function HomeNewsCarouselHero({ articles }: Props) {
  const fromCms = articles
    .map((a) => {
      const href = articleHref(a);
      if (!href) return null;
      return {
        title: a.title,
        button: a.categoryLabel ? `Read · ${a.categoryLabel}` : "Read article",
        src: articleImage(a),
        href,
      };
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 6);

  const slides = fromCms.length > 0 ? fromCms : FALLBACK_SLIDES;

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-foreground py-10 sm:py-14"
      aria-label="Featured stories"
    >
      <div className="fk-page pb-14">
        <p className="fk-meta text-white/60">Featured</p>
        <h2 className="mt-2 max-w-xl font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Guides worth opening
        </h2>
        <div className="mt-8">
          <Carousel slides={slides} />
        </div>
      </div>
    </section>
  );
}
