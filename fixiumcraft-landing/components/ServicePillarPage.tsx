import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, StickyMobileBar } from "./SiteNav";
import { SiteFooterMini } from "./SiteChrome";
import { business, neighborhoods, seo, servicePillars } from "./contentData";

// ServicePillarPage.tsx
//
// Server-rendered template for the 3 pillar pages under /services/<slug>
// (data: `servicePillars` in contentData.js). One component, three pages:
// headline + local intro, itemized task list, FAQ accordion (native
// <details>, no JS), service-area badges, and a text/photo CTA banner.

const BTN_PRIMARY =
  "rounded-lg bg-sky-500 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400";
const BTN_OUTLINE_LIGHT =
  "rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10";

export function getPillar(slug: string) {
  return servicePillars.find((p) => p.slug === slug);
}

export function getPillarMetadata(slug: string): Metadata {
  const page = getPillar(slug);
  if (!page) return {};
  const url = `/services/${slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
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

export default function ServicePillarPage({ slug }: { slug: string }) {
  const page = getPillar(slug);
  if (!page) return null;

  const base = seo.canonicalUrl.replace(/\/$/, "");
  const others = servicePillars.filter((p) => p.slug !== slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.title,
    provider: { "@id": `${seo.canonicalUrl}/#business` },
    areaServed: [
      { "@type": "City", name: `${business.address.city}, ${business.address.state}` },
      ...neighborhoods.map((name) => ({
        "@type": "Place",
        name: `${name}, ${business.address.state}`,
      })),
    ],
    description: page.metaDescription,
    url: `${base}/services/${slug}`,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${base}/#services` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${base}/services/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white pb-16 font-sans text-slate-900 lg:pb-0">
      {[serviceJsonLd, faqJsonLd, breadcrumbJsonLd].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <SiteNav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 px-4 pb-12 pt-10 text-white sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/#services" className="hover:text-white">
              Services
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-slate-200">{page.title}</span>
          </nav>
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {page.h1}
          </h1>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            {page.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/#quote" className={`${BTN_PRIMARY} sm:px-8`}>
              Request a Quote
            </Link>
            <a href={business.smsHref} className={BTN_OUTLINE_LIGHT}>
              Text Us Photos for an Estimate
            </a>
          </div>
          <p className="mt-4 text-sm font-semibold text-sky-300">{page.startingPrice}</p>
        </div>
      </section>

      <div className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Task list */}
          <section>
            <h2 className="text-xl font-bold sm:text-2xl">What&apos;s Included</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {page.taskGroups.map((group) => (
                <div key={group.heading} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-base font-bold text-slate-900">{group.heading}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 text-sky-500">
                          &#10003;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ accordion */}
          <section>
            <h2 className="text-xl font-bold sm:text-2xl">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {page.faqs.map((item) => (
                <details key={item.question} className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl leading-none text-sky-500 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Areas */}
          <section>
            <h2 className="text-xl font-bold sm:text-2xl">
              Serving {business.address.city} &amp; Nearby
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[`${business.address.city}, ${business.address.state}`, ...neighborhoods].map(
                (area) => (
                  <li
                    key={area}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 sm:text-sm"
                  >
                    {area}
                  </li>
                ),
              )}
            </ul>
          </section>

          {/* Other services */}
          <section>
            <h2 className="text-xl font-bold sm:text-2xl">Other Services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-sky-50/40"
                >
                  <span className="block text-sm font-semibold text-slate-900">{p.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{p.navBlurb}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA banner */}
      <section className="bg-slate-900 px-4 py-12 text-center text-white sm:py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance text-2xl font-extrabold sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Send us a quick text or photo and we&apos;ll get back to you fast with a flat-rate
            quote.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href={business.smsHref} className={BTN_PRIMARY}>
              Text Us a Photo
            </a>
            <a href={business.phoneHref} className={BTN_OUTLINE_LIGHT}>
              Call {business.phoneDisplay}
            </a>
            <Link href="/#quote" className={BTN_OUTLINE_LIGHT}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <SiteFooterMini />
      <StickyMobileBar />
    </main>
  );
}
