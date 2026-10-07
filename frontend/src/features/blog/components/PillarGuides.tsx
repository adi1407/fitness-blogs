import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleHref } from "@/features/home/utils/articleMedia";
import { fetchPublishedArticles } from "@/lib/api/blog";
import { findCategory, type BlogCategorySlug } from "@/lib/blogTaxonomy";
import { collectionPageLd } from "@/lib/seo";

/** Hub pages are ISR; a new article appears on its pillar within this window. */
export const PILLAR_REVALIDATE_SECONDS = 600;

type PillarGuidesProps = {
  category: BlogCategorySlug;
  /** Restrict to these subcategories (in this order). Defaults to all. */
  subcategories?: string[];
  heading: string;
  intro: string;
  /** Pillar page path, used for the CollectionPage JSON-LD. */
  path: string;
  /** CollectionPage name/description for JSON-LD. */
  pageName: string;
  pageDescription: string;
};

type Guide = { title: string; href: string };

/**
 * Server-rendered "every guide in this topic" list for a pillar hub, grouped by
 * subcategory. Gives Google crawlable links from the hub into the whole cluster.
 */
export async function PillarGuides({
  category,
  subcategories,
  heading,
  intro,
  path,
  pageName,
  pageDescription,
}: PillarGuidesProps) {
  const def = findCategory(category);
  if (!def) return null;

  const articles = await fetchPublishedArticles({
    category,
    limit: 200,
    summary: true,
    revalidate: PILLAR_REVALIDATE_SECONDS,
  });

  const subs = subcategories
    ? subcategories
        .map((slug) => def.subcategories.find((s) => s.slug === slug))
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
    : def.subcategories;

  const groups = subs
    .map((sub) => ({
      sub,
      guides: articles
        .filter((a) => a.subcategorySlug === sub.slug)
        .map((a): Guide | null => {
          const href = articleHref(a);
          return href && a.title ? { title: a.title, href } : null;
        })
        .filter((g): g is Guide => g !== null),
    }))
    .filter((g) => g.guides.length > 0);

  if (groups.length === 0) return null;

  const items = groups.flatMap((g) =>
    g.guides.map((guide) => ({ name: guide.title, path: guide.href })),
  );

  return (
    <section id="guides" className="mt-14 scroll-mt-24">
      <JsonLd
        data={collectionPageLd({
          name: pageName,
          description: pageDescription,
          path,
          items,
        })}
      />
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">{intro}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {groups.map(({ sub, guides }) => (
          <div key={sub.slug} className="fk-panel p-5">
            <h3 className="text-lg font-semibold">
              <Link
                href={`/blog/${category}/${sub.slug}`}
                className="hover:text-accent"
              >
                {sub.label}
              </Link>
            </h3>
            <ul className="mt-3 space-y-2">
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="text-sm leading-snug text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
