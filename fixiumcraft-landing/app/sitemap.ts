import type { MetadataRoute } from "next";
import { seo } from "@/components/contentData";

// app/sitemap.ts (file convention) — served at /sitemap.xml. The homepage
// is still the only content route (all its sections are anchors on "/"),
// but app/privacy and app/terms are separate, real routes — listed here
// per the note this comment used to leave for exactly this situation. See
// the note in layout.tsx about seo.canonicalUrl needing to be the actual
// live domain for any of this to point anywhere useful to crawlers.
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
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
