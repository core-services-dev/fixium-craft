import type { Metadata } from "next";
import "./globals.css";
import { business, seo } from "@/components/contentData";

// metadataBase lets every relative URL below (canonical, openGraph.url,
// and the auto-injected opengraph-image.tsx tags) resolve to an absolute
// one without repeating the domain everywhere. seo.canonicalUrl is the
// live, currently-deployed URL (https://fixium-craft.vercel.app, no
// trailing slash) — update it here (and nowhere else) if a custom domain
// is ever pointed at this deployment instead.
export const metadata: Metadata = {
  metadataBase: new URL(seo.canonicalUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  // Resolved against metadataBase into the bare origin
  // ("https://fixium-craft.vercel.app", no trailing slash) — that's
  // Next.js's own normalization for a homepage canonical URL (it always
  // collapses a root path to origin-only, by design, regardless of what
  // string is passed here), matching seo.canonicalUrl exactly.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    // Same bare-origin resolution as alternates.canonical above.
    url: "/",
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
