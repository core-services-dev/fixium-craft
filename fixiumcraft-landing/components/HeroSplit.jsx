"use client";

// HeroSplit.jsx — Approach 1: two-column hero (text left, photo right).
// Stacks on mobile (text first, so the CTA stays above the fold) and goes
// side by side from `lg`. All copy comes from contentData.js, so the text
// stays in one place.

import Image from "next/image";
import { BadgeCheck, Clock, ShieldCheck, Star, Tag, MessageSquareText } from "lucide-react";
import { business, hero } from "./contentData";

const TRUST_ICONS = { pricing: Tag, rating: Star, insured: ShieldCheck, sameday: Clock, background: BadgeCheck };

const PRICE_CHIPS = [
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
    <section className="bg-slate-900 px-4 py-10 text-white md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: copy, CTAs, prices, trust */}
        <div className="text-center lg:text-left">
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-slate-300 sm:text-lg lg:mx-0">
            {hero.subheadline}
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row lg:mx-0">
            <a
              href={hero.primaryCta.href}
              className="rounded-lg bg-cta px-8 py-4 text-center text-base font-semibold text-slate-950 shadow-lg shadow-black/25 ring-1 ring-orange-300/40 transition hover:bg-cta-hover"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={business.smsHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
            >
              <MessageSquareText className="h-5 w-5 shrink-0" aria-hidden="true" />
              {hero.secondaryCtas[0].label}
            </a>
          </div>

          <ul aria-label="Starting prices" className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {PRICE_CHIPS.map((c) => (
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

          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-left text-sm font-medium text-slate-200 sm:grid-cols-2">
            {hero.trustBar.map((item) => {
              const Icon = TRUST_ICONS[item.id];
              return (
                <li key={item.id} className="inline-flex items-center gap-2">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${item.id === "rating" ? "fill-amber-400 text-amber-400" : "text-blue-300"}`}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: photo. `fill` needs a positioned parent with a size: aspect ratio gives it one. */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
          <Image
            src="/images/hero-handyman.jpg"
            alt="Fixium Craft technician assembling a dresser on a protective mat in a bright living room, with a wall-mounted TV and smart lock in the background"
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
