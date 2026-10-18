import type { MetadataRoute } from "next";
import { seo, servicePillars } from "@/components/contentData";
import { getAllGuides } from "@/lib/guides";
import { AREAS } from "@/components/areasData";

// app/sitemap.ts (file convention) — served at /sitemap.xml.
//
// Fully data-driven: service pages come from servicePillars (contentData.js),
// guide posts from content/guides/*.md, and neighborhood pages from AREAS
// (only when marked ready). Adding a service, guide or ready area makes it
// appear here automatically. Real route slugs are used, e.g.
// /services/handyman-repairs (the old /services/handyman-style slugs
// 308-redirect via next.config.ts and must not be listed).
//
// lastModified is the build/revalidation time (new Date()).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Services hub + one entry per service landing page.
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...servicePillars.map((page) => ({
      url: `${base}/services/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [`${base}${page.image}`],
    })),

    // Guides index + every guide post.
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...getAllGuides().map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    // Neighborhood pages: listed only once marked ready in areasData.ts.
    ...AREAS.filter((a) => a.ready).map((a) => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    // Legal pages (rarely change, low priority).
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
