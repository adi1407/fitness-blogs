import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";

type HomeLatestListProps = {
  articles: PublicBlogArticle[];
};

export function HomeLatestList({ articles }: HomeLatestListProps) {
  const items = articles.slice(0, 5);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Latest
        </h2>
        <Link
          href="/blog"
          className="text-sm font-semibold text-primary hover:underline"
        >
          View all →
        </Link>
      </div>

      <ul className="mt-6 divide-y divide-border border-t border-border">
        {items.map((article, i) => {
          const href = articleHref(article);
          if (!href) return null;
          return (
            <li key={article.id}>
              <Link
                href={href}
                className="group flex gap-4 py-5 transition hover:bg-brand-50/40 sm:gap-6"
              >
                <span className="hidden w-8 shrink-0 pt-1 text-sm font-semibold text-muted-foreground sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={articleImage(article)}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded-lg object-cover sm:h-24 sm:w-36"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {article.categoryLabel ? (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-foreground ring-1 ring-brand-100">
                        {article.categoryLabel}
                      </span>
                    ) : null}
                    {article.readingTime > 0 ? (
                      <span>{article.readingTime} min read</span>
                    ) : null}
                  </div>
                  <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                    {article.title}
                  </h3>
                  {article.excerpt ? (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
