// Hero: centered dark hero over a full-width photo (headline, subtitle,
// business line, two CTAs, trust bar). Self-contained:
// copy comes from `hero` in contentData.js, so the text stays editable in one
// place. The photo is decorative (alt=""), sits behind a bg-slate-950/75
// overlay, and text colors are lifted one step so contrast holds on the
// brightest parts of the photo.

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, MessageSquareText, ShieldCheck, Star, Tag } from "lucide-react";
import { business, hero } from "./contentData";

const BTN_PRIMARY_ON_DARK =
  "rounded-lg bg-cta font-semibold text-slate-950 ring-1 ring-orange-300/40 transition hover:bg-cta-hover focus-visible:ring-orange-300";
const BTN_OUTLINE_LIGHT =
  "rounded-lg border border-white/30 bg-white/10 font-semibold text-white transition hover:bg-white/20";

const HERO_TRUST_ICONS = { pricing: Tag, rating: Star, insured: ShieldCheck, sameday: Clock, background: BadgeCheck };

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 px-4 py-10 text-white md:py-24">
      {/* Background photo + dark overlay */}
      <Image
        src="/images/hero-handyman.jpg"
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/75" aria-hidden="true" />

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {hero.headline}
        </h1>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance text-base font-normal text-slate-100 sm:text-lg">
          {hero.subheadline}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-slate-300 sm:text-base">
          {hero.commercialLine}
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={hero.primaryCta.href}
            className={`px-8 py-4 text-center text-base shadow-lg shadow-black/25 ${BTN_PRIMARY_ON_DARK}`}
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={business.smsHref}
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-center text-base ${BTN_OUTLINE_LIGHT}`}
          >
            <MessageSquareText className="h-5 w-5 shrink-0" aria-hidden="true" />
            {hero.secondaryCtas[0].label}
          </a>
        </div>

        {/* Trust bar directly under the CTAs. */}
        <ul className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-3 border-t border-white/20 pt-6 text-sm font-medium text-slate-100 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/20 md:mt-12">
          {hero.trustBar.map((item) => {
            const Icon = HERO_TRUST_ICONS[item.id];
            return (
              <li key={item.id} className="inline-flex items-center gap-2 sm:px-6">
                <Icon
                  className={`h-4 w-4 ${item.id === "rating" ? "fill-amber-400 text-amber-400" : "text-blue-300"}`}
                  aria-hidden="true"
                />
                {item.label}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm text-slate-300">
          {hero.alsoLine.text}{" "}
          <Link href={hero.alsoLine.href} className="font-medium text-white underline underline-offset-2 hover:text-slate-200">
            {hero.alsoLine.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
