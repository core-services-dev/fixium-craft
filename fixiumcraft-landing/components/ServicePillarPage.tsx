import { OG_IMAGE } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNav, StickyMobileBar } from "./SiteNav";
import { SiteFooterMini } from "./SiteChrome";
import WorkGallery from "./WorkGallery";
import TrustStrip from "./TrustStrip";
import PriceEstimator from "./PriceEstimator";
import RelatedGuides from "./RelatedGuides";
import { areaServedSchema, business, neighborhoods, seo, servicePillars } from "./contentData";

// ServicePillarPage.tsx
//
// Server-rendered template for the 3 pillar pages under /services/<slug>
// (data: `servicePillars` in contentData.js). One component, three pages:
// headline + local intro, itemized task list, FAQ accordion (native
// <details>, no JS), service-area badges, and a text/photo CTA banner.

const BTN_PRIMARY =
  "rounded-lg bg-cta px-6 py-3.5 text-center text-base font-semibold text-slate-950 shadow-lg shadow-orange-600/30 ring-1 ring-orange-300/40 transition hover:bg-cta-hover";
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
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [OG_IMAGE.url],
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
    // The shared @id ties this to the one business entity defined on the
    // homepage, which has the single type HomeAndConstructionBusiness.
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
    "@id": `${base}/services/${slug}#service`,
    mainEntityOfPage: `${base}/services/${slug}`,
    image: `${base}${page.image}`,
    termsOfService: `${base}/terms`,
    // One-line price summary next to the per-tier catalog below.
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Number(page.startingPrice.replace(/[^0-9.]/g, "")),
      offerCount: (page.pricing || []).length || 1,
      url: `${base}/services/${slug}`,
    },
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
      { "@type": "ListItem", position: 2, name: "Services", item: `${base}/services` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${base}/services/${slug}` },
    ],
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50 pb-16 font-sans text-slate-900 lg:pb-0">
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
            <Link href="/services" className="hover:text-white">
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
              Get an Instant Quote
            </Link>
            <a href={business.smsHref} className={BTN_OUTLINE_LIGHT}>
              Text Photo for Estimate
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
          <div className="mt-5"><TrustStrip tone="dark" /></div>
        </div>
      </section>

      {/* Pricing cards */}
      <div className="px-4 pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {page.pricing && (
            <section aria-labelledby="pricing-heading">
              <h2 id="pricing-heading" className="text-xl font-bold sm:text-2xl">
                {page.pricingHeading}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.pricing.map((tier) => (
                  <div
                    key={tier.label}
                    className="surface-card surface-card-hover flex flex-col p-5"
                  >
                    <p className="text-sm font-semibold text-slate-900">{tier.label}</p>
                    <p className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
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
              <p className="mt-3 text-xs text-slate-600">
                Flat-rate and quoted upfront. Final price depends on the job; send a photo for an exact number.
              </p>
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
                <div key={group.heading} className="surface-card p-5">
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

      <div className="mx-auto max-w-4xl px-4 pt-12 empty:hidden">
        <PriceEstimator slug={slug} label={page.navLabel} />
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
              <p className="mt-3 text-xs text-slate-600">
                Brand names belong to their respective owners. Fixium Craft is an independent installer and is not
                affiliated with these brands.
              </p>
            </section>
          )}

          {/* FAQ accordion */}
          <section>
            <h2 className="text-xl font-bold sm:text-2xl">Frequently Asked Questions</h2>
            <div className="mt-5 surface-card divide-y divide-slate-200 overflow-hidden">
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
                  <span className="mt-1 block text-xs text-slate-600">{p.navBlurb}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Related guides (content/guides/*.md mapped to this service) */}
          <RelatedGuides serviceSlug={slug} />
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
            <Link href="/#quote" className={BTN_PRIMARY}>
              Get an Instant Quote
            </Link>
            <a href={business.smsHref} className={BTN_OUTLINE_LIGHT}>
              Text Photo for Estimate
            </a>
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
