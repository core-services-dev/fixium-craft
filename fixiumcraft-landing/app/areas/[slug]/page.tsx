import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { business, seo, servicePillars } from "@/components/contentData";
import { socialMetadata } from "@/lib/seo";
import { AREAS } from "@/components/areasData";
import { SiteHeader, SiteFooterMini } from "@/components/SiteChrome";

// app/areas/[slug]/page.tsx — data lives in components/areasData.ts (ready:false => noindex).
export const dynamicParams = false;
export const generateStaticParams = () => AREAS.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) return {};
  const title = a.metaTitle ?? `Handyman, Furniture Assembly & Locksmith in ${a.name}, Pittsburgh | Fixium Craft`;
  const description =
    a.description ??
    `Flat-rate handyman (from $49), furniture assembly (from $59) and scheduled locksmith (from $79) in ${a.name}, Pittsburgh.`;
  return { title, description, alternates: { canonical: `/areas/${a.slug}` }, robots: a.ready ? undefined : { index: false, follow: true }, ...socialMetadata({ title, description, path: `/areas/${a.slug}` }) };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) notFound();

  // Pages with full content (sections) get the long layout; others keep the short fallback.
  if (!a.sections) {
    return (
      <main id="main-content" className="min-h-screen bg-slate-50 pb-16 lg:pb-0">
        <SiteHeader />
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-extrabold text-slate-900">Home Services in {a.name}, Pittsburgh</h1>
          <ul className="mt-6 space-y-2 text-slate-700">{a.localFacts.map((f) => <li key={f}>{f}</li>)}</ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {servicePillars.map((p) => (
              <Link key={p.slug} href={`/services/${p.slug}`} className="surface-card surface-card-hover p-4 font-semibold text-slate-900">
                {p.navLabel} <span className="text-slate-600">· {p.startingPrice}</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-600">Call {business.phoneDisplay}</p>
        </div>
        <SiteFooterMini />
      </main>
    );
  }

  const base = seo.canonicalUrl.replace(/\/$/, "");
  const pillar = servicePillars.find((p) => p.slug === a.service);
  const url = `${base}/areas/${a.slug}`;
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: a.h1 ?? `Home services in ${a.name}, Pittsburgh`,
      serviceType: pillar?.title ?? "Furniture assembly",
      provider: { "@id": `${base}/#business` },
      areaServed: { "@type": "Place", name: `${a.name}, Pittsburgh, PA` },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        ...(pillar ? [{ "@type": "ListItem", position: 2, name: pillar.title, item: `${base}/services/${pillar.slug}` }] : []),
        { "@type": "ListItem", position: pillar ? 3 : 2, name: a.h1 ?? a.name, item: url },
      ],
    },
  ];
  if (a.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 pb-16 lg:pb-0">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">{a.h1 ?? `Home Services in ${a.name}, Pittsburgh`}</h1>
        {a.intro ? <p className="mt-4 text-lg text-slate-700">{a.intro}</p> : null}

        {a.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-balance text-2xl font-bold text-slate-900">{s.heading}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-3 text-slate-700">{p}</p>
            ))}
            {s.bullets?.length ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
          </section>
        ))}

        {a.faqs?.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <dl className="mt-4 space-y-5">
              {a.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold text-slate-900">{f.question}</dt>
                  <dd className="mt-1 text-slate-700">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="mt-12 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Book {pillar ? pillar.navLabel.toLowerCase() : "a visit"} in {a.name}</h2>
          <p className="mt-3 text-slate-200">
            {pillar ? (
              <>
                See the full <Link href={`/services/${pillar.slug}`} className="font-semibold underline underline-offset-2">{pillar.navLabel.toLowerCase()} service</Link> for prices and details, or{" "}
              </>
            ) : null}
            <Link href="/#quote" className="font-semibold underline underline-offset-2">request a quote</Link> with a photo of what you need. We confirm the price and the time before we come.
          </p>
          {a.guide ? (
            <p className="mt-3 text-sm text-slate-300">
              Related guide: <Link href={`/guides/${a.guide.slug}`} className="underline underline-offset-2">{a.guide.label}</Link>
            </p>
          ) : null}
          <p className="mt-5 font-semibold">
            <a href={business.phoneHref} className="underline underline-offset-2">{business.phoneDisplay}</a>
            <span className="font-normal text-slate-300"> · {business.hours}, by appointment</span>
          </p>
        </section>
      </div>
      <SiteFooterMini />
    </main>
  );
}
