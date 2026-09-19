import type { Metadata } from "next";
import "./globals.css";
import { business, seo } from "@/components/contentData";

// metadataBase lets every relative URL below (canonical, openGraph.url,
// and the auto-injected opengraph-image.tsx tags) resolve to an absolute
// one without repeating the domain everywhere. NOTE: seo.canonicalUrl is
// currently the aspirational custom domain (fixiumcraft.com) — if that
// domain isn't live yet and the site is only reachable at its Vercel URL
// (e.g. https://fixium-craft.vercel.app), update seo.canonicalUrl in
// contentData.js to match whatever's actually live, or none of this
// (sitemap, robots, canonical, JSON-LD url) points anywhere useful to
// Google yet.
export const metadata: Metadata = {
  metadataBase: new URL(seo.canonicalUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
    // og:image itself comes from app/opengraph-image.tsx — Next.js
    // generates it and injects the og:image/og:image:width/height/type
    // tags automatically, no manual reference needed here.
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    // Same story as above: twitter:image is auto-injected from
    // opengraph-image.tsx (there's no separate twitter-image.tsx, and
    // Next falls back to opengraph-image for Twitter when one isn't set).
  },
  verification: {
    google: "1A0C3cEVRYG-iN5migckdRiDpysWGYZWgdnUA_0MzaA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
