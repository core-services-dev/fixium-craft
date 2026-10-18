import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { business, servicePillars } from "@/components/contentData";
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
  const title = `Handyman, Furniture Assembly & Locksmith in ${a.name}, Pittsburgh | Fixium Craft`;
  const description = `Flat-rate handyman (from $49), furniture assembly (from $59) and scheduled locksmith (from $79) in ${a.name}, Pittsburgh.`;
  return { title, description, alternates: { canonical: `/areas/${a.slug}` }, robots: a.ready ? undefined : { index: false, follow: true }, ...socialMetadata({ title, description, path: `/areas/${a.slug}` }) };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) notFound();
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
