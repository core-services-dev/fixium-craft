import type { MetadataRoute } from "next";
import { seo, servicePages } from "@/components/contentData";

// app/sitemap.ts (file convention) — served at /sitemap.xml. The homepage
// is still the main content route (all its sections are anchors on "/"),
// but app/privacy, app/terms, and the dedicated service+location pages
// under app/<slug>/page.tsx (built from `servicePages`) are separate,
// real routes — listed here per the note this comment used to leave for
// exactly this situation. See the note in layout.tsx about
// seo.canonicalUrl needing to be the actual live domain for any of this
// to point anywhere useful to crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  const lastModified = new Date();
  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // One entry per servicePages slug, so a new dedicated page added there
    // automatically shows up here too.
    ...servicePages.map((page) => ({
      url: `${base}/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
