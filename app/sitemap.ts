import type { MetadataRoute } from "next";
import { seo } from "@/components/contentData";

// app/sitemap.ts (file convention) — served at /sitemap.xml. This is a
// single-page site (all sections are anchors on "/"), so there's only one
// URL to list; add entries here if separate routes (e.g. a blog) are ever
// added. See the note in layout.tsx about seo.canonicalUrl needing to be
// the actual live domain for this to point anywhere useful to crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
