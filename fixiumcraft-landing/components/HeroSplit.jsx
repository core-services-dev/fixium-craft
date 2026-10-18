"use client";

// Hero: the original centered dark hero (headline, subtitle, business line,
// two CTAs, clickable price chips, trust bar). Self-contained: copy comes from
// `hero` in contentData.js, so the text stays editable in one place.

import { BadgeCheck, Clock, MessageSquareText, ShieldCheck, Star, Tag } from "lucide-react";
import { business, hero } from "./contentData";

const BTN_PRIMARY_ON_DARK =
  "rounded-lg bg-cta font-semibold text-slate-950 ring-1 ring-orange-300/40 transition hover:bg-cta-hover focus-visible:ring-orange-300";
const BTN_OUTLINE_LIGHT =
  "rounded-lg border border-white/20 bg-white/5 font-semibold text-white transition hover:bg-white/10";

const HERO_TRUST_ICONS = { pricing: Tag, rating: Star, insured: ShieldCheck, sameday: Clock, background: BadgeCheck };

// Price anchors under the hero CTAs: each chip pre-selects that service in the quote form.
const HERO_PRICE_CHIPS = [
  { id: "handyman", label: "Handyman", price: "$49" },
  { id: "assembly", label: "Assembly", price: "$59" },
  { id: "locksmith", label: "Locksmith", price: "$79" },
];

// Same behaviour as selectServiceAndScroll() in LandingPage.jsx: tell the quote
// form which service to pre-select, then scroll to it.
function selectServiceAndScroll(serviceId) {
  window.dispatchEvent(new CustomEvent("fixium:select-service", { detail: { value: serviceId } }));
  const target = document.getElementById("quote");
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", "#quote");
}

export default function Hero() {
  return (
    <section className="bg-slate-900 px-4 py-10 text-white md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {hero.headline}
        </h1>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance text-base font-normal text-slate-300 sm:text-lg">
          {hero.subheadline}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-slate-400 sm:text-base">
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

        <ul aria-label="Starting prices" className="mt-6 flex flex-wrap justify-center gap-2">
          {HERO_PRICE_CHIPS.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => selectServiceAndScroll(c.id)}
                className="min-h-11 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {c.label} <span className="text-orange-300">from {c.price}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Trust bar directly under the CTAs. */}
        <ul className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-3 border-t border-white/10 pt-6 text-sm font-medium text-slate-200 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/15 md:mt-12">
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
      </div>
    </section>
  );
}
