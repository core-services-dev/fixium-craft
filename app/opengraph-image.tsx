import { ImageResponse } from "next/og";
import { business, hero } from "@/components/contentData";

// app/opengraph-image.tsx (file convention) — Next.js renders this at
// build time and automatically injects the resulting og:image /
// og:image:width / og:image:height / og:image:type tags (and, absent a
// separate twitter-image.tsx, the twitter:image tags too). See the note
// on `openGraph`/`twitter` in layout.tsx — this is *why* those don't
// reference an image manually.
export const alt = `${business.name} — ${business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          // Same dark gradient as the page's Hero section, for visual
          // consistency between a shared link's preview and the site itself.
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7dd3fc",
            marginBottom: 24,
          }}
        >
          {business.name}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          {hero.headline}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#cbd5e1",
            marginTop: 32,
          }}
        >
          {business.serviceArea}
        </div>
      </div>
    ),
    { ...size }
  );
}
