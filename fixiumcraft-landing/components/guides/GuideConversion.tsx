import Image from "next/image";
import Link from "next/link";
import { business, projectsGallery, servicePillars } from "@/components/contentData";
import { diyVsHire } from "@/components/proofData";
import TrustStrip from "@/components/TrustStrip";

// GuideConversion.tsx — three server components for guide pages.

/** Compact mid-article nudge. The wrapper id makes the site-wide click tracker label it "guide-mid-cta". */
export function MidGuideCta({ label, price }: { label: string; price: string }) {
  return (
    <aside id="guide-mid-cta" aria-label="Hire us instead" className="surface-card border-l-4 border-l-orange-500 p-5">
      <p className="text-base font-bold text-slate-900">Short on time, or not sure you want to risk it?</p>
      <p className="mt-1 text-sm text-slate-600">
        {label} in Pittsburgh from <strong className="text-slate-900">{price.replace(/^From /, "")}</strong>, flat-rate. Text a photo and we reply with an exact price, usually within the hour.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={business.smsHref} className="rounded-lg bg-cta px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cta-hover">Text a photo for a price</a>
        <Link href="/#quote" className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Get a flat-rate quote</Link>
      </div>
    </aside>
  );
}

/** DIY vs pro comparison. Renders nothing until the owner fills diyVsHire[slug]. */
export function DiyVsHire({ serviceSlug }: { serviceSlug: string }) {
  const d = diyVsHire[serviceSlug];
  if (!d) return null;
  return (
    <section aria-labelledby="diy-vs-pro" className="grid gap-4 sm:grid-cols-2">
      <h2 id="diy-vs-pro" className="sr-only">Doing it yourself versus hiring a pro</h2>
      <div className="surface-card p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-600">Do it yourself</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">{d.diy.map((t) => <li key={t}>&bull; {t}</li>)}</ul>
      </div>
      <div className="surface-card border-emerald-300 p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-800">Hire Fixium Craft</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-800">{d.pro.map((t) => <li key={t}>&#10003; {t}</li>)}</ul>
      </div>
    </section>
  );
}

/** Up to 3 real job photos for the guide's service (none for locksmith until photos exist). */
export function GuideProof({ serviceSlug }: { serviceSlug: string }) {
  const pillar = servicePillars.find((p) => p.slug === serviceSlug);
  const cats: string[] = pillar?.galleryCategories ?? [];
  type Item = { id: string; category: string; title?: string; image?: string; alt?: string };
  const photos = (projectsGallery.items as Item[])
    .flatMap((i) => (cats.includes(i.category) && i.image ? [{ id: i.id, title: i.title ?? "", image: i.image, alt: i.alt ?? i.title ?? "" }] : []))
    .slice(0, 3);
  if (!photos.length) return null;
  return (
    <section aria-labelledby="guide-proof" className="space-y-3">
      <h2 id="guide-proof" className="text-xl font-bold text-slate-900">Recent jobs by our Pittsburgh team</h2>
      <ul className="grid grid-cols-3 gap-2 sm:gap-3">
        {photos.map((p) => (
          <li key={p.id}>
            <figure>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 220px, 33vw" className="object-cover" />
              </div>
              <figcaption className="mt-1 text-xs text-slate-600">{p.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <TrustStrip />
      <Link href={`/services/${serviceSlug}`} className="inline-block text-sm font-semibold text-blue-800 hover:underline">
        See pricing and more {pillar?.navLabel.toLowerCase()} work &rarr;
      </Link>
    </section>
  );
}
