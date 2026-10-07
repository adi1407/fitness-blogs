import { BRAND_NAME } from "@/lib/brand";
import { getPublicSiteUrl } from "@/lib/siteUrl";

export const SITE_URL = getPublicSiteUrl();

/** Stable JSON-LD node ids so every page can reference the one Organization / WebSite. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_LOGO_URL = `${SITE_URL}/brand/logofitness.png`;

/**
 * Next.js replaces (does not merge) a page's `openGraph` with the root layout's,
 * so every page that sets its own `openGraph` must spread these first.
 */
export const OG_DEFAULTS = {
  siteName: BRAND_NAME,
  locale: "en_IN",
} as const;

/** Publisher / author reference to the site-wide Organization node. */
export const ORG_REF = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: ORG_LOGO_URL },
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** BreadcrumbList from ordered `[name, path]` pairs. */
export function breadcrumbLd(trail: ReadonlyArray<readonly [string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

/** CollectionPage whose main entity is an ordered list of linked pages. */
export function collectionPageLd(opts: {
  name: string;
  description: string;
  path: string;
  items: ReadonlyArray<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function faqPageLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const BRAND_SUFFIX = new RegExp(`\\s*[|–—-]\\s*${BRAND_NAME}(\\s+\\w+)?\\s*$`, "i");

/**
 * CMS/seed meta titles sometimes already end in "| fitlives" (or "| fitlives Recipes");
 * the root layout template appends the brand, so strip it here to avoid doubling.
 */
export function pageTitle(raw: string): string {
  const stripped = raw.replace(BRAND_SUFFIX, "").trim();
  return stripped || raw.trim();
}
