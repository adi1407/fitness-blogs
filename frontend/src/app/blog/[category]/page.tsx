import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { fetchPublishedArticleByNumber } from "@/lib/api/blog";

const CATEGORIES = new Set([
  "muscle-building",
  "weight-loss",
  "nutrition",
]);

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (/^\d{9}$/.test(category)) {
    return { title: "Article", robots: { index: false } };
  }
  if (!CATEGORIES.has(category)) return { title: "Blog", robots: { index: false } };
  return {
    title: `${category.replace(/-/g, " ")} articles`,
    alternates: { canonical: `/${category}` },
  };
}

/**
 * Category index — or resolve `/blog/{9-digit-article-number}` to the
 * canonical `/blog/{cat}/{sub}/{slug}/{articleNumber}` URL (no on-page ID UI).
 */
export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;

  if (/^\d{9}$/.test(category)) {
    const articleNumber = Number(category);
    const article = await fetchPublishedArticleByNumber(articleNumber);
    if (
      !article?.categorySlug ||
      !article.subcategorySlug ||
      !article.slug ||
      article.articleNumber == null
    ) {
      notFound();
    }
    permanentRedirect(
      `/blog/${article.categorySlug}/${article.subcategorySlug}/${article.slug}/${article.articleNumber}`,
    );
  }

  if (!CATEGORIES.has(category)) notFound();

  if (category === "muscle-building") permanentRedirect("/muscle-building");
  if (category === "weight-loss") permanentRedirect("/weight-loss");
  if (category === "nutrition") permanentRedirect("/nutrition");

  return (
    <main className="fk-page flex-1 py-16">
      <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-4 text-4xl font-semibold capitalize tracking-tight">
        {category.replace(/-/g, " ")}
      </h1>
    </main>
  );
}
