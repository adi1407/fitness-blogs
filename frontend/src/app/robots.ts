import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/og` stays crawlable: social crawlers (e.g. Twitterbot) honour robots.txt for share images.
      disallow: ["/account", "/login", "/auth/", "/api/", "/preview/", "/search?"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
