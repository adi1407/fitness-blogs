import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogArticleView } from "@/features/blog/components/BlogArticleView";
import { fetchPublishedArticleBySlug } from "@/lib/api/blog";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await fetchPublishedArticleBySlug(slug);
  if (!payload) {
    return { title: "Article not found", robots: { index: false } };
  }
  const { article } = payload;

  const title = article.metaTitle || article.title;
  const description =
    article.metaDescription ||
    article.excerpt ||
    article.quickAnswer ||
    "Educational fitness article from FitKnowledge.";

  return {
    title,
    description,
    robots:
      article.robotsIndex === false
        ? { index: false, follow: true }
        : undefined,
    alternates: {
      canonical: article.path ?? undefined,
    },
    openGraph: {
      title,
      description,
      url: article.path ?? undefined,
      type: "article",
      images: article.ogImage || article.featuredImage
        ? [article.ogImage || article.featuredImage!]
        : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    slug,
  } = await params;

  if (!isBlogCategorySlug(categorySlug)) notFound();

  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) notFound();

  const payload = await fetchPublishedArticleBySlug(slug);
  if (!payload?.article?.slug) notFound();
  const { article, related } = payload;

  if (
    article.categorySlug &&
    article.subcategorySlug &&
    (article.categorySlug !== categorySlug ||
      article.subcategorySlug !== subcategorySlug)
  ) {
    redirect(
      `/blog/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`,
    );
  }

  return (
    <BlogArticleView
      article={article}
      related={related}
      categoryLabel={category.label}
      subcategoryLabel={subcategory.label}
      categorySlug={category.slug}
      subcategorySlug={subcategory.slug}
    />
  );
}
