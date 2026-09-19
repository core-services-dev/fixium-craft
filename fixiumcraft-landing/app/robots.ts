import type { MetadataRoute } from "next";
import { seo } from "@/components/contentData";

// app/robots.ts (file convention) — served at /robots.txt. Nothing on this
// site needs to be hidden from crawlers, so this just allows everything
// and points at the generated sitemap.
export default function robots(): MetadataRoute.Robots {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
