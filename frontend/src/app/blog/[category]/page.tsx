import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
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
  if (!CATEGORIES.has(category)) return { title: "Blog" };
  return {
    title: `${category.replace(/-/g, " ")} articles`,
    robots: { index: true },
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
    redirect(
      `/blog/${article.categorySlug}/${article.subcategorySlug}/${article.slug}/${article.articleNumber}`,
    );
  }

  if (!CATEGORIES.has(category)) notFound();

  if (category === "muscle-building") redirect("/muscle-building");
  if (category === "weight-loss") redirect("/weight-loss");
  if (category === "nutrition") redirect("/nutrition");

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
