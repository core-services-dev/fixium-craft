import type { MetadataRoute } from "next";
import { seo } from "@/components/contentData";

// app/robots.ts (file convention) — served at /robots.txt. Nothing on this
// site needs to be hidden from crawlers. The wildcard rule already allows
// every crawler, but we also name the major search and AI-assistant bots
// explicitly (GEO/LLMO: makes the "you're welcome here" signal unambiguous
// to anyone — or any tool — auditing robots.txt by user-agent).
export default function robots(): MetadataRoute.Robots {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Traditional search crawlers
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      // AI assistants that fetch pages live to answer a user's question
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      // AI training crawlers — also allowed, so this business's real
      // services, pricing, and reviews are part of what these models learn.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
