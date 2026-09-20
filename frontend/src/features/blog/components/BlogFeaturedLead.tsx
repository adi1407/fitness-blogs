import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import {
  articleHref,
  articleImage,
} from "@/features/home/utils/articleMedia";

type Props = {
  article: PublicBlogArticle;
};

/** MNT-style featured lead story for the `/blog` hub. */
export function BlogFeaturedLead({ article }: Props) {
  const href = articleHref(article);
  if (!href) return null;

  const image = articleImage(article);
  const alt =
    article.featuredImageAlt?.trim() ||
    article.title ||
    "Featured article";

  return (
    <section aria-label="Featured guide" className="border-b border-border pb-10">
      <p className="fk-meta text-foreground">Featured</p>
      <Link
        href={href}
        className="group mt-4 grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10"
      >
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {article.categoryLabel ? (
              <span className="font-semibold uppercase tracking-wide text-accent">
                {article.categoryLabel}
              </span>
            ) : null}
            {article.subcategoryLabel ? (
              <span>· {article.subcategoryLabel}</span>
            ) : null}
            {article.readingTime > 0 ? (
              <span>· {article.readingTime} min read</span>
            ) : null}
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground transition group-hover:text-primary sm:text-4xl">
            {article.title}
          </h2>
          {article.excerpt || article.quickAnswer ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {article.excerpt || article.quickAnswer}
            </p>
          ) : null}
          {article.authorName ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Written by{" "}
              <span className="font-medium text-foreground">
                {article.authorName}
              </span>
            </p>
          ) : null}
          <span className="mt-6 inline-flex text-sm font-semibold text-primary group-hover:underline">
            Read article →
          </span>
        </div>
      </Link>
    </section>
  );
}
