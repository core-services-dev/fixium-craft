import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SiteNav, StickyMobileBar } from "@/components/SiteNav";
import { SiteFooterMini } from "@/components/SiteChrome";
import GuideCard from "@/components/GuideCard";
import GuidesBrowser from "@/components/GuidesBrowser";
import { business, seo } from "@/components/contentData";
import { getActiveCategories, getAllGuides, toSummary } from "@/lib/guides";

const title = `Home Repair, Assembly & Smart Lock Guides | ${business.name}`;
const description =
  "Free step-by-step guides from Pittsburgh handyman, furniture assembly and locksmith pros: flat-pack assembly, drywall repair, safe car door tips and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides" },
  openGraph: {
    title,
    description,
    url: "/guides",
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

const BTN_PRIMARY =
  "rounded-lg bg-cta px-6 py-3.5 text-center text-base font-semibold text-slate-950 shadow-lg shadow-orange-600/30 ring-1 ring-orange-300/40 transition hover:bg-cta-hover";
const BTN_OUTLINE_LIGHT =
  "rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10";

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  const summaries = guides.map(toSummary);
  const categories = getActiveCategories(guides);
  const base = seo.canonicalUrl.replace(/\/$/, "");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Useful Guides & Knowledge Base",
      description,
      url: `${base}/guides`,
      isPartOf: { "@type": "WebSite", name: business.name, url: `${base}/` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: guides.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}/guides/${g.slug}`,
          name: g.title,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${base}/guides` },
      ],
    },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50 pb-16 font-sans text-slate-900 lg:pb-0">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
        />
      ))}

      <SiteNav />

      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-800 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&rsaquo;</li>
              <li aria-current="page" className="font-medium text-slate-900">
                Guides
              </li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Useful Guides &amp; Knowledge Base
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Practical, step-by-step advice from the {business.name} team on furniture assembly,
            home repairs and everyday home tasks. Do it yourself safely, or let us handle it.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {guides.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
            New guides are on the way. Check back soon.
          </p>
        ) : (
          <Suspense
            fallback={
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {summaries.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            }
          >
            <GuidesBrowser guides={summaries} categories={categories} />
          </Suspense>
        )}
      </section>

      <section className="bg-slate-900 px-4 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance text-2xl font-extrabold sm:text-3xl">
            Would you rather have a pro do it?
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Send us a quick text or photo and we&apos;ll get back to you fast with a flat-rate
            quote. Fully insured, background-checked technicians.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/#quote" className={BTN_PRIMARY}>
              Get a Free Quote
            </Link>
            <a href={business.phoneHref} className={BTN_OUTLINE_LIGHT}>
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <SiteFooterMini />
      <StickyMobileBar />
    </main>
  );
}
