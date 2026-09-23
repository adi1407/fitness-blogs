import { notFound, redirect } from "next/navigation";
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

/** Legacy URL without article id — 301 to canonical …/slug/{articleNumber}. */
export default async function BlogArticleSlugRedirectPage({
  params,
}: PageProps) {
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
  if (!payload?.article?.slug || payload.article.articleNumber == null) {
    notFound();
  }
  const { article } = payload;

  const cat = article.categorySlug ?? categorySlug;
  const sub = article.subcategorySlug ?? subcategorySlug;
  redirect(`/blog/${cat}/${sub}/${article.slug}/${article.articleNumber}`);
}
