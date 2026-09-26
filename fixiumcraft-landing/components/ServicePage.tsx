import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooterMini, BTN_PRIMARY } from "./SiteChrome";
import { business, neighborhoods, seo, services, servicePages } from "./contentData";

// ServicePage.tsx
//
// Shared renderer for the dedicated service+location pages (see
// `servicePages` in contentData.js) — one component driven by a `slug`,
// rather than 5 near-duplicate route files, so copy/schema logic only
// exists in one place. Each app/<slug>/page.tsx is a thin wrapper that
// imports `getServicePageMetadata` for its `metadata` export and renders
// <ServicePage slug="..." />.

function getServicePage(slug: string) {
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) {
    throw new Error(`No servicePages entry for slug "${slug}" in contentData.js`);
  }
  return page;
}

export function getServicePageMetadata(slug: string): Metadata {
  const page = getServicePage(slug);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${slug}`,
      siteName: business.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default function ServicePage({ slug }: { slug: string }) {
  const page = getServicePage(slug);
  const service = page.serviceId ? services.find((s) => s.id === page.serviceId) ?? null : null;

  const areaServed = [
    { "@type": "City", name: `${business.address.city}, ${business.address.state}` },
    ...neighborhoods.map((name) => ({
      "@type": "Place",
      name: `${name}, ${business.address.state}`,
    })),
  ];

  // References the single LocalBusiness node (by @id) defined once in
  // contentData.js's localBusinessSchema, rather than duplicating that
  // whole block on every one of these pages.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: service ? service.title : "Handyman Services",
    provider: { "@id": `${seo.canonicalUrl}/#business` },
    areaServed,
    description: page.metaDescription,
    url: `${seo.canonicalUrl}/${slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      {/* Server-rendered JSON-LD, same pattern as app/page.tsx's
          localBusinessSchema script — present in the initial HTML with no
          hydration involved. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SiteHeader />

      <article className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {page.h1}
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {page.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {service && (
            <section className="mt-10">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                What&apos;s Included
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 text-sky-500">
                      &bull;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-slate-900 sm:text-base">
                {service.startingPrice}
              </p>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Areas We Serve</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {business.address.city}, {business.address.state}, and nearby: {neighborhoods.join(", ")}.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-5">
              {page.faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    {item.question}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 border-t border-slate-200 pt-8 text-center">
            <Link href="/#quote" className={BTN_PRIMARY}>
              Get a Free Quote
            </Link>
            <p className="mt-4">
              <Link href="/" className="text-sm font-medium text-sky-600 hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </article>

      <SiteFooterMini />
    </main>
  );
}
