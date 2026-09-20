import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import type { BlogCategoryDef } from "@/lib/blogTaxonomy";
import {
  articleHref,
  articleImage,
} from "@/features/home/utils/articleMedia";

type Props = {
  category: BlogCategoryDef;
  articles: PublicBlogArticle[];
};

/** Pillar rail — category heading + horizontal story cards (MNT-style topic section). */
export function BlogTopicRail({ category, articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="border-b border-border py-10" aria-labelledby={`rail-${category.slug}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <h2
            id={`rail-${category.slug}`}
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {category.label}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {category.description}
          </p>
        </div>
        <Link
          href={`/blog/${category.slug}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          See all →
        </Link>
      </div>

      <ul className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
        {articles.map((article) => {
          const href = articleHref(article);
          if (!href) return null;
          return (
            <li
              key={article.id}
              className="w-[min(72vw,16.5rem)] shrink-0 sm:w-auto"
            >
              <Link href={href} className="group block h-full">
                <div className="overflow-hidden rounded-lg border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={articleImage(article)}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  {article.subcategoryLabel || category.label}
                </p>
                <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                  {article.title}
                </h3>
                {article.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                ) : null}
                {article.readingTime > 0 ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {article.readingTime} min read
                  </p>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
