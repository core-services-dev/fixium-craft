import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNav, StickyMobileBar } from "./SiteNav";
import { SiteFooterMini } from "./SiteChrome";
import WorkGallery from "./WorkGallery";
import { areaServedSchema, business, neighborhoods, seo, servicePillars } from "./contentData";

// ServicePillarPage.tsx
//
// Server-rendered template for the 3 pillar pages under /services/<slug>
// (data: `servicePillars` in contentData.js). One component, three pages:
// headline + local intro, itemized task list, FAQ accordion (native
// <details>, no JS), service-area badges, and a text/photo CTA banner.

const BTN_PRIMARY =
  "rounded-lg bg-blue-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-500";
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
    // Typed per page (Locksmith on the locksmith page, etc.); the shared @id
    // ties it to the one business entity defined on the homepage.
    provider: {
      "@type": page.providerType,
      "@id": `${seo.canonicalUrl}/#business`,
      name: business.name,
      url: `${base}/`,
      telephone: business.phoneSchema,
    },
    areaServed: areaServedSchema(),
    description: page.metaDescription,
    url: `${base}/services/${slug}`,
    // Real starting prices, as an offer catalog (Offer + PriceSpecification).
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: page.title,
      itemListElement: (page.pricing || []).map((tier) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: tier.label, description: tier.note },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: Number(tier.price.replace(/[^0-9.]/g, "")),
          priceCurrency: "USD",
        },
      })),
    },
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
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-16 text-white md:py-24">
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
          <p className="mt-4 text-sm font-semibold text-blue-300">{page.startingPrice}</p>
          {page.badges && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {page.badges.map((badge) => (
                <li
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white sm:text-sm"
                >
                  <span aria-hidden="true">{badge.icon}</span>
                  {badge.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Same-day callout, pricing cards and visual showcase */}
      <div className="px-4 pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {page.callout && (
            <div className="flex flex-col gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-base font-bold text-amber-900 sm:text-lg">
                  <span aria-hidden="true">&#9889; </span>
                  {page.callout.title}
                </p>
                <p className="mt-1 text-sm text-amber-900/80">{page.callout.body}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <a
                  href={business.phoneHref}
                  className="rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Call {business.phoneDisplay}
                </a>
                <a
                  href={business.smsHref}
                  className="rounded-lg border border-amber-400 bg-white px-5 py-3 text-center text-sm font-semibold text-amber-900 hover:bg-amber-100"
                >
                  Text Us
                </a>
              </div>
            </div>
          )}

          {page.pricing && (
            <section aria-labelledby="pricing-heading">
              <h2 id="pricing-heading" className="text-xl font-bold sm:text-2xl">
                {page.pricingHeading}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.pricing.map((tier) => (
                  <div
                    key={tier.label}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-slate-900">{tier.label}</p>
                    <p className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Starting at
                      </span>
                      <span className="text-3xl font-extrabold text-blue-800">{tier.price}</span>
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{tier.note}</p>
                    <Link
                      href="/#quote"
                      className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-center text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
                    >
                      Get this quote
                    </Link>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Flat-rate and quoted upfront. Final price depends on the job; send a photo for an exact number.
              </p>
            </section>
          )}

          {page.showcase && (
            <section aria-labelledby="showcase-heading">
              <h2 id="showcase-heading" className="text-xl font-bold sm:text-2xl">
                {page.showcaseHeading}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {page.showcase.map((card) => (
                  <div
                    key={card.title}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-700 to-blue-900">
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt={card.alt || card.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover"
                        />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white/90"
                        >
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                          <circle cx="12" cy="16" r="1" />
                        </svg>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm font-bold text-slate-900 sm:text-base">{card.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Task list */}
          <section>
            <h2 className="text-xl font-bold sm:text-2xl">
              {page.includedHeading || "What's Included"}
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {page.taskGroups.map((group) => (
                <div key={group.heading} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-base font-bold text-slate-900">{group.heading}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 text-blue-700">
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

        </div>
      </div>

      <WorkGallery
        id="gallery"
        categories={page.galleryCategories}
        heading={page.galleryHeading}
        subheading="Real jobs we've done. Tap any photo to enlarge."
        className="bg-slate-50"
      />

      <div className="px-4 pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {page.brands && (
            <section aria-labelledby="brands-heading">
              <h2 id="brands-heading" className="text-xl font-bold sm:text-2xl">
                {page.brandsHeading}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {page.brands.map((brand) => (
                  <li
                    key={brand}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Brand names belong to their respective owners. Fixium Craft is an independent installer and is not
                affiliated with these brands.
              </p>
            </section>
          )}

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
                      className="shrink-0 text-xl leading-none text-blue-700 transition-transform group-open:rotate-45"
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
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
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
      <section className="bg-slate-900 px-4 py-16 text-center text-white md:py-20">
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
