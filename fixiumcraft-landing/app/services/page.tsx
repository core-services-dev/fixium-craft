import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SiteNav, StickyMobileBar } from "@/components/SiteNav";
import { SiteFooterMini } from "@/components/SiteChrome";
import GuideCard from "@/components/GuideCard";
import { business, neighborhoods, seo, servicePillars } from "@/components/contentData";
import { getAllGuides, toSummary } from "@/lib/guides";
import { socialMetadata } from "@/lib/seo";

// app/services/page.tsx
//
// Hub for the four service pages. Until now /services was a 404 even though
// every service page's breadcrumb said "Services". This page is purely
// additive: nothing existing is renamed or redirected, the four
// /services/<slug> URLs are untouched, and it links to each of them.

const price = (slug: string) => servicePillars.find((p) => p.slug === slug)?.startingPrice.toLowerCase() ?? "";

const title = `Home Services in Pittsburgh, PA | ${business.name}`;
const description = `Handyman ${price("handyman-repairs")}, furniture assembly ${price("furniture-assembly")} and TV wall mounting ${price("tv-mounting")} in Pittsburgh, PA. Flat-rate quotes, fully insured.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  ...socialMetadata({ title, description, path: "/services" }),
};

const BTN_PRIMARY =
  "rounded-lg bg-cta px-6 py-3.5 text-center text-base font-semibold text-slate-950 transition hover:bg-cta-hover";

export default function ServicesHubPage() {
  const base = seo.canonicalUrl.replace(/\/$/, "");
  const guides = getAllGuides().filter((g) => g.serviceSlug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${base}/services#page`,
      url: `${base}/services`,
      name: title,
      description,
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#business` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: servicePillars.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.h1,
          url: `${base}/services/${p.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${base}/services` },
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
                Services
              </li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Home Services in Pittsburgh, PA
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Furniture assembly, TV wall mounting and handyman repairs, all from one local team.
            Scheduled smart lock installation is also available. Every quote is flat-rate and sent before we
            start.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {servicePillars.map((p) => (
            <article
              key={p.slug}
              className="surface-card surface-card-hover group relative flex flex-col p-6"
            >
              <h2 className="text-balance text-xl font-bold leading-snug text-slate-900">
                <Link
                  href={`/services/${p.slug}`}
                  className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                >
                  {p.navLabel} in Pittsburgh
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {p.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-700" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">
                  {p.startingPrice}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 group-hover:underline">
                  See rates &amp; details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">Serving Pittsburgh &amp; Nearby</h2>
          <p className="mt-3 text-slate-600">
            We work across {neighborhoods.join(", ")}, and nearby neighborhoods. Send your ZIP code
            and we&apos;ll confirm availability.
          </p>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16" aria-labelledby="hub-guides-heading">
          <h2 id="hub-guides-heading" className="text-xl font-bold sm:text-2xl">
            Helpful Home Repair &amp; Assembly Guides
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={toSummary(g)} headingLevel="h3" />
            ))}
          </div>
          <Link
            href="/guides"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:underline"
          >
            Browse all guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      )}

      <section className="bg-slate-900 px-4 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance text-2xl font-extrabold sm:text-3xl">
            Not sure which service you need?
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Send a photo and a few details. We&apos;ll text back a flat-rate quote.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/#quote" className={BTN_PRIMARY}>
              Get a Flat-Rate Quote
            </Link>
          </div>
        </div>
      </section>

      <SiteFooterMini />
      <StickyMobileBar />
    </main>
  );
}
