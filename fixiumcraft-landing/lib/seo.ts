import type { Metadata } from "next";
import { business } from "@/components/contentData";

// lib/seo.ts
//
// Shared social-card metadata. A page that sets its own `openGraph` object
// does NOT inherit the og:image that app/opengraph-image.tsx adds at the
// root, so every such page has to name the image itself. One constant keeps
// them all pointing at the same 1200x630 card.

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${business.name} \u2014 Furniture Assembly & Home Repairs, Done Right`,
};

export function socialMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: business.name,
      locale: "en_US",
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
