import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Package, ShieldAlert, Wrench } from "lucide-react";
import { SiteNav, StickyMobileBar } from "./SiteNav";
import { SiteFooterMini } from "./SiteChrome";
import GuideToc from "./GuideToc";
import GuideCard from "./GuideCard";
import QuickQuoteBanner from "./QuickQuoteBanner";
import ExpertHelpForm from "./ExpertHelpForm";
import { business, seo, servicePillars } from "./contentData";
import {
  formatGuideDate,
  getAllGuides,
  getGuide,
  toSummary,
  type Guide,
  type GuideSection,
} from "@/lib/guides";

// GuidePage.tsx
//
// Server-rendered template for /guides/<slug> (content: content/guides/*.md,
// parsed by lib/guides.ts). Breadcrumbs, sticky table of contents, styled
// safety / tools / pro-tip callouts, native <details> FAQ (no JS), a
// conversion-focused CTA box, and HowTo + FAQPage + BreadcrumbList JSON-LD
// generated from the same parsed content as the visible text.

const BTN_OUTLINE_LIGHT =
  "rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10";

// Short service names for the quote banner under the title.
const BANNER_LABELS: Record<string, string> = {
  "furniture-assembly": "Furniture assembly",
  "tv-mounting": "TV mounting",
  "handyman-repairs": "Handyman repairs",
  locksmith: "Smart lock installs",
};

// Guides with no matching service page (e.g. the car guide) get the
// cheapest starting price on the site instead.
function lowestStartingPrice() {
  const prices = servicePillars
    .map((p) => Number(p.startingPrice.replace(/[^0-9.]/g, "")))
    .filter((n) => n > 0);
  return `From $${Math.min(...prices)}`;
}

const baseUrl = () => seo.canonicalUrl.replace(/\/$/, "");

export function getGuideMetadata(slug: string): Metadata {
  const g = getGuide(slug);
  if (!g) return {};
  const title = g.metaTitle.includes(business.name) ? g.metaTitle : `${g.metaTitle} | ${business.name}`;
  const url = `/guides/${slug}`;
  return {
    title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: g.description,
      url,
      siteName: business.name,
      locale: "en_US",
      type: "article",
      publishedTime: g.date,
      modifiedTime: g.updated,
    },
    twitter: { card: "summary_large_image", title, description: g.description },
  };
}

function buildSchemas(g: Guide) {
  const base = baseUrl();
  const url = `${base}/guides/${g.slug}`;
  const org = { "@type": "Organization", name: business.name, url: `${base}/` };
  const schemas: Record<string, unknown>[] = [];

  if (g.howToSteps.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: g.title,
      description: g.description,
      ...(g.totalTime ? { totalTime: g.totalTime } : {}),
      datePublished: g.date,
      dateModified: g.updated,
      author: org,
      publisher: org,
      mainEntityOfPage: url,
      ...(g.tools.length
        ? { tool: g.tools.map((name) => ({ "@type": "HowToTool", name })) }
        : {}),
      ...(g.supplies.length
        ? { supply: g.supplies.map((name) => ({ "@type": "HowToSupply", name })) }
        : {}),
      step: g.howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${url}#step-${i + 1}`,
      })),
    });
  }

  if (g.faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${base}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: g.categoryLabel,
        item: `${base}/guides?category=${g.category}`,
      },
      { "@type": "ListItem", position: 4, name: g.title, item: url },
    ],
  });

  return schemas;
}

function tocItems(g: Guide) {
  const label = (s: GuideSection) =>
    s.kind === "safety"
      ? "Safety first"
      : s.kind === "tools"
        ? "Tools & materials"
        : s.kind === "steps"
          ? "Step-by-step"
          : s.kind === "faq"
            ? "FAQ"
            : s.title;
  return [
    ...g.sections.map((s) => ({ id: s.id, label: label(s) })),
    { id: "get-help", label: "Get expert help" },
  ];
}

function Section({ s }: { s: GuideSection }) {
  switch (s.kind) {
    case "safety":
      return (
        <section
          id={s.id}
          className="scroll-mt-24 rounded-2xl border border-rose-200 border-l-4 border-l-rose-600 bg-rose-50 p-5 sm:p-6"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold text-rose-900 sm:text-2xl">
            <ShieldAlert className="h-6 w-6 shrink-0" aria-hidden="true" />
            {s.title}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-base">
            {s.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600"
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </section>
      );

    case "tools":
      return (
        <section
          id={s.id}
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">{s.title}</h2>
            {s.time && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <Clock className="h-3.5 w-3.5 text-blue-800" aria-hidden="true" />
                {s.time}
              </span>
            )}
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {s.groups.map((group) => (
              <div key={group.title}>
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  {/tool/i.test(group.title) ? (
                    <Wrench className="h-4 w-4 text-blue-800" aria-hidden="true" />
                  ) : (
                    <Package className="h-4 w-4 text-blue-800" aria-hidden="true" />
                  )}
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-800"
                        aria-hidden="true"
                      />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "steps":
      return (
        <section id={s.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold sm:text-2xl">{s.title}</h2>
          <ol className="mt-5 space-y-5">
            {s.steps.map((step) => (
              <li
                key={step.id}
                id={step.id}
                className="scroll-mt-24 flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-800 text-sm font-bold text-white"
                >
                  {step.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold leading-snug text-slate-900">
                    <span className="sr-only">Step {step.n}: </span>
                    {step.title}
                  </h3>
                  <div
                    className="guide-prose mt-3"
                    dangerouslySetInnerHTML={{ __html: step.html }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case "faq":
      return (
        <section id={s.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold sm:text-2xl">{s.title}</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {s.items.map((item) => (
              <details key={item.question} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                  <h3 className="text-sm font-semibold sm:text-base">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl leading-none text-blue-800 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div
                  className="guide-prose mt-3"
                  dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                />
              </details>
            ))}
          </div>
        </section>
      );

    default:
      return (
        <section id={s.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold sm:text-2xl">{s.title}</h2>
          <div className="guide-prose mt-4" dangerouslySetInnerHTML={{ __html: s.html }} />
        </section>
      );
  }
}

export default function GuidePage({ slug }: { slug: string }) {
  const g = getGuide(slug);
  if (!g) return null;

  const service = servicePillars.find((p) => p.slug === g.serviceSlug);
  const more = getAllGuides()
    .filter((o) => o.slug !== g.slug)
    .sort((a, b) => Number(b.category === g.category) - Number(a.category === g.category))
    .slice(0, 3);
  const items = tocItems(g);
  const bannerLabel = service ? (BANNER_LABELS[service.slug] ?? service.navLabel) : "Home repairs & installs";
  const bannerPrice = service ? service.startingPrice : lowestStartingPrice();

  return (
    <main className="min-h-screen bg-white pb-16 font-sans text-slate-900 lg:pb-0">
      {buildSchemas(g).map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
        />
      ))}

      <SiteNav />

      {/* Header */}
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-800 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&rsaquo;</li>
              <li>
                <Link href="/guides" className="hover:text-blue-800 hover:underline">
                  Guides
                </Link>
              </li>
              <li aria-hidden="true">&rsaquo;</li>
              <li>
                <Link
                  href={`/guides?category=${g.category}`}
                  className="hover:text-blue-800 hover:underline"
                >
                  {g.categoryLabel}
                </Link>
              </li>
              <li aria-hidden="true">&rsaquo;</li>
              <li aria-current="page" className="max-w-[16rem] truncate font-medium text-slate-900 sm:max-w-md">
                {g.title}
              </li>
            </ol>
          </nav>

          <span className="mt-6 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-blue-100">
            {g.categoryLabel}
          </span>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            {g.title}
          </h1>
          <QuickQuoteBanner label={bannerLabel} price={bannerPrice} />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {g.summary}
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span>
              By the <span className="font-semibold text-slate-900">{business.name}</span> team
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>
              Updated <time dateTime={g.updated}>{formatGuideDate(g.updated)}</time>
            </span>
            <span aria-hidden="true">&middot;</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {g.readTime} min read
            </span>
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
        <article className="min-w-0 space-y-12">
          <GuideToc items={items} variant="mobile" />

          {g.introHtml && (
            <div
              className="guide-prose guide-lead"
              dangerouslySetInnerHTML={{ __html: g.introHtml }}
            />
          )}

          {g.sections.map((s) => (
            <Section key={s.id} s={s} />
          ))}

          {/* CTA */}
          <section
            id="get-help"
            className="scroll-mt-24 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-white sm:p-10"
          >
            <h2 className="text-balance text-2xl font-extrabold sm:text-3xl">
              {g.ctaTitle ?? `Need a hand? Call ${business.name}`}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {g.ctaText ??
                `Our fully insured, background-checked Pittsburgh technicians handle the job for you. Flat-rate pricing, quoted upfront.`}
            </p>
            <div className="mt-6">
              <ExpertHelpForm guideTitle={g.title} serviceLabel={service?.navLabel} />
            </div>
            <p className="mt-6 text-sm text-slate-300">Prefer to talk it through?</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <a href={business.phoneHref} className={BTN_OUTLINE_LIGHT}>
                Call {business.phoneDisplay}
              </a>
              <a href={business.smsHref} className={BTN_OUTLINE_LIGHT}>
                Text Us Photos
              </a>
            </div>
            <p className="mt-5 text-xs text-slate-300">
              Flat-rate pricing &middot; Fully insured &amp; background-checked &middot; Same-day slots
            </p>
            {service && (
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Learn more about {service.navLabel} in Pittsburgh
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </section>

          {more.length > 0 && (
            <section aria-labelledby="more-guides-heading">
              <h2 id="more-guides-heading" className="text-xl font-bold sm:text-2xl">
                More Helpful Guides
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {more.slice(0, 2).map((o) => (
                  <GuideCard key={o.slug} guide={toSummary(o)} headingLevel="h3" />
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
        </article>

        <aside className="hidden lg:block">
          <GuideToc items={items} variant="desktop" />
        </aside>
      </div>

      <SiteFooterMini />
      <StickyMobileBar />
    </main>
  );
}
