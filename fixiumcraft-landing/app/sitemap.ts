import type { MetadataRoute } from "next";
import { seo, servicePillars } from "@/components/contentData";
import { getAllGuides } from "@/lib/guides";
import { AREAS } from "@/components/areasData";

// app/sitemap.ts (file convention) — served at /sitemap.xml.
//
// lastModified used to be `new Date()` for most entries, which stamps every
// URL as "changed just now" on every deploy; search engines learn to ignore
// lastmod when it is always today. These are real content dates now: bump
// SITE_UPDATED when the homepage or service copy changes, LEGAL_UPDATED when
// the privacy/terms text changes. Guides keep using their own "updated"
// frontmatter date.
const SITE_UPDATED = new Date("2026-10-18T00:00:00Z");
const LEGAL_UPDATED = new Date("2026-09-22T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  return [
    {
      url: `${base}/`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Hub page that links to every service page.
    {
      url: `${base}/services`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    // One entry per servicePillars slug, so a new dedicated page added there
    // automatically shows up here too.
    ...servicePillars.map((page) => ({
      url: `${base}/services/${page.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${base}${page.image}`],
    })),
    // Neighborhood pages appear here only once marked ready in areasData.ts.
    ...AREAS.filter((a) => a.ready).map((a) => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Knowledge base: the index plus one entry per file in content/guides/,
    // dated by each guide's own "updated" frontmatter.
    {
      url: `${base}/guides`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...getAllGuides().map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: new Date(`${g.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/privacy`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/accessibility`,
      lastModified: new Date("2026-10-17T00:00:00Z"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
