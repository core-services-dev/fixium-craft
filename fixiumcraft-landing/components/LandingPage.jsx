"use client";

// LandingPage.jsx
//
// Mobile-first, single-page landing component for a furniture assembly /
// handyman services business. All copy, service data, and contact info
// live in `contentData.js` — this file is purely layout + interactivity.
//
// Note: written as .jsx per the requested deliverable name. Since the stack
// is TypeScript, this drops in as-is if renamed to `LandingPage.tsx` (no
// TS-only syntax is used); for stricter typing, add prop/state types and a
// `ContentData` interface mirroring the shape of `contentData.js`.
//
// Usage (Next.js App Router):
//   // app/page.jsx
//   import LandingPage from "@/components/LandingPage";
//   export default function Page() { return <LandingPage />; }

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Build-time JSON import (webpack/Turbopack resolve this to a plain JS
// module, no runtime fs access) — keeps the footer's version string in
// sync with package.json without hardcoding a second copy of it.
import packageJson from "../package.json";
import {
  business,
  navSection,
  aboutSection,
  hero,
  serviceAreasSection,
  painPoints,
  services,
  servicesSection,
  complementaryServicesSection,
  pricingTrustSection,
  discountOffer,
  projectsGallery,
  process as processSteps,
  formService,
  quoteForm,
  guarantees,
  guaranteesSection,
  qualityGuaranteeSection,
  googleReviews,
  testimonialsSection,
  faq,
  faqSection,
  footer,
} from "./contentData";

/* -------------------------------------------------------------------------- */
/*  Shared button styles                                                     */
/*                                                                             */
/*  One place for CTA styling so the Header, Hero, and Quote form all render */
/*  the same button language (radius, weight, transition) instead of each   */
/*  drifting on its own. Layout-specific bits (width, size) stay inline.    */
/* -------------------------------------------------------------------------- */

const BTN_PRIMARY =
  "rounded-lg bg-sky-500 font-semibold text-white transition hover:bg-sky-400";
const BTN_OUTLINE_LIGHT =
  "rounded-lg border border-white/20 bg-white/5 font-semibold text-white transition hover:bg-white/10";
const BTN_OUTLINE_LIGHT_WHATSAPP =
  "rounded-lg border border-emerald-400/30 bg-white/5 font-semibold text-white transition hover:bg-emerald-400/10";
const BTN_OUTLINE_DARK =
  "rounded-lg border border-slate-200 font-semibold text-slate-700 transition hover:bg-slate-50";

/* -------------------------------------------------------------------------- */
/*  Shared form input style                                                   */
/*                                                                             */
/*  One place for every Quote form text/email/tel/textarea input: generous   */
/*  padding, rounded corners, and a clearly visible resting border plus a    */
/*  high-contrast focus ring, instead of each field re-declaring its own.    */
/* -------------------------------------------------------------------------- */

const INPUT_BASE =
  "mt-1.5 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100";

/* -------------------------------------------------------------------------- */
/*  Icons (inline SVG — no external icon library dependency)                  */
/* -------------------------------------------------------------------------- */

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.17.01.41-.07.64.49.24.58.81 2.01.88 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.89 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function IconMessage(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconCamera(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function IconTag(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.59 13.41 12 22l-9-9V4h9l8.59 8.59a2 2 0 0 1 0 2.82Z" />
      <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

// A generic flat-pack box, used only for the Gallery's "Before" toggle
// state — deliberately generic/iconographic, never a stand-in photo for
// a real completed job (see the note on GalleryCard() below).
function IconBox(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8" />
      <path d="M12 13v9" />
    </svg>
  );
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconStar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.3 6.1 20.5l1.3-6.6-4.9-4.5 6.6-.8z" />
    </svg>
  );
}

function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Shared icon set used both by the Services grid and the Recent Projects
// gallery (gallery items reference the same category keys, plus a couple
// of their own: "wardrobe" and "ac").
const SERVICE_ICONS = {
  assembly: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  mounting: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  repairs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  wardrobe: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="1.5" />
      <path d="M12 2v20" />
      <circle cx="9.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  ac: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="18" rx="1.5" />
      <rect x="4.5" y="8.5" width="15" height="7" rx="1" />
      <path d="M7 11h9M7 13.5h9" />
    </svg>
  ),
  lock: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  wallmount: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="13" rx="1.5" />
      <path d="M4.5 13.5l4-4a1.5 1.5 0 0 1 2.12 0L13 11.88l1.5-1.5a1.5 1.5 0 0 1 2.12 0l2.88 2.88" />
      <circle cx="9" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <path d="M12 17v3M8.5 20h7" />
    </svg>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <a
          href="#top"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo-icon.png"
            alt={`${business.name} logo`}
            width={44}
            height={44}
            priority
            className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
          />
          <span className="leading-none">{business.name}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navSection.items.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
            title={business.phoneDisplay}
            className={`hidden items-center gap-1.5 px-3 py-2 text-sm sm:flex ${BTN_OUTLINE_DARK}`}
          >
            <IconPhone className="h-4 w-4" />
            <span>Call</span>
          </a>
          <a href="#quote" className={`px-3.5 py-2 text-sm ${BTN_PRIMARY}`}>
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sticky mobile action bar                                                  */
/* -------------------------------------------------------------------------- */

function StickyMobileBar() {
  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-slate-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden"
    >
      <a
        href={business.phoneHref}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-slate-700 active:bg-slate-50"
        aria-label="Call us"
      >
        <IconPhone className="h-5 w-5" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href="#quote"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-x border-slate-200 py-2.5 text-slate-700 active:bg-slate-50"
        aria-label="Get a quote"
      >
        <IconTag className="h-5 w-5" />
        <span className="text-[11px] font-medium">Get Quote</span>
      </a>
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-emerald-500 py-2.5 text-white active:bg-emerald-600"
        aria-label="Message us on WhatsApp"
      >
        <IconWhatsapp className="h-5 w-5" />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-800 px-4 pb-14 pt-10 text-white sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 inline-block whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300">
          {hero.eyebrow}
        </p>
        <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base text-slate-300 sm:text-lg">
          {hero.subheadline}
        </p>
        {hero.supportingCopy && (
          <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-slate-400 sm:text-base">
            {hero.supportingCopy}
          </p>
        )}

        {/* Single primary visual button — Call/WhatsApp are still one tap
            away, just demoted to lightweight text links underneath instead
            of competing full-size buttons, per the reduced-cognitive-load
            request. */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href="#quote"
            className={`w-full max-w-xs px-6 py-3.5 text-center text-base shadow-lg shadow-sky-500/30 sm:w-auto sm:px-10 ${BTN_PRIMARY}`}
          >
            {hero.primaryCta.label}
          </a>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <IconPhone className="h-4 w-4" /> Call
            </a>
            <span aria-hidden="true" className="text-slate-600">
              |
            </span>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <IconWhatsapp className="h-4 w-4 text-emerald-400" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300 sm:text-sm">
          {hero.trustBadges.map((badge) => (
            <span key={badge.id} className="inline-flex items-center gap-1.5">
              <IconCheck className="h-3.5 w-3.5 text-emerald-400" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Service areas banner                                                      */
/*                                                                             */
/*  Sits right below the Hero so visitors immediately see their town is      */
/*  covered, instead of having to scroll or infer it from the eyebrow text.  */
/* -------------------------------------------------------------------------- */

function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="border-b border-slate-100 bg-white px-4 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
          {serviceAreasSection.heading}
        </h2>
        <p className="mt-3 text-slate-600">{serviceAreasSection.subheading}</p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {serviceAreasSection.areas.map((area, index) => (
            <li
              key={area}
              className={
                index === 0
                  ? "inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
                  : "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              }
            >
              <IconMapPin
                className={index === 0 ? "h-4 w-4" : "h-4 w-4 text-sky-500"}
              />
              {area}
            </li>
          ))}
        </ul>

        <a
          href={serviceAreasSection.cta.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:underline"
        >
          {serviceAreasSection.cta.label} &rarr;
        </a>

        {/* Keyword-rich internal links to the dedicated service+location
            pages — anchor text is the actual long-tail phrase being
            targeted, not generic "click here" copy. */}
        <p className="mx-auto mt-6 max-w-2xl text-xs text-slate-500">
          Popular searches we cover:{" "}
          {serviceAreasSection.popularSearches.map((item, index) => (
            <span key={item.href}>
              {index > 0 && ", "}
              <Link href={item.href} className="font-medium text-sky-600 hover:underline">
                {item.label}
              </Link>
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pain points / solution                                                    */
/* -------------------------------------------------------------------------- */

function PainPoints() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {painPoints.heading}
          </h2>
          <p className="mt-3 text-slate-600">{painPoints.subheading}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {painPoints.items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-semibold text-rose-600">
                {item.problem}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services grid                                                             */
/* -------------------------------------------------------------------------- */

function CompactServiceCard({ service }) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
          {Icon ? (
            <Icon className="h-5 w-5" />
          ) : (
            <IconBox className="h-5 w-5" />
          )}
        </span>
        <h3 className="text-base font-semibold text-slate-900">
          {service.title}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {service.description}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <span className="text-sm font-semibold text-slate-900">
          {service.startingPrice}
        </span>
        {service.learnMoreHref && (
          <Link
            href={service.learnMoreHref}
            className="text-sm font-medium text-sky-600 hover:underline"
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

// Featured, single-service breakdown for Furniture Assembly -- the
// primary service and main SEO/conversion focus of the homepage. Same
// image-resilience pattern as the old ServiceCard (gradient+icon base
// layer always renders, real photo fades in on top, onError just keeps
// the base layer showing), scaled up into a two-column featured block
// with the service's four `subsections` (see contentData.js) rendered
// as H3-level sub-cards underneath.
function AssemblyBreakdown() {
  const service = services.find((s) => s.id === "assembly");
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <section id="services" className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {servicesSection.heading}
          </h2>
          <p className="mt-3 text-slate-600">{servicesSection.subheading}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[320px]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-sky-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                {Icon ? (
                  <Icon className="relative h-16 w-16 text-white/90" />
                ) : (
                  <IconBox className="relative h-16 w-16 text-white/70" />
                )}
              </div>

              {service.image && !imageFailed && (
                <Image
                  src={service.image}
                  alt={service.alt || service.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 object-cover"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
                Our Core Service
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {service.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-900">
                  {service.startingPrice}
                </span>
              </div>
              {service.learnMoreHref && (
                <Link
                  href={service.learnMoreHref}
                  className="mt-3 inline-block text-sm font-medium text-sky-600 hover:underline"
                >
                  Learn more about {service.title} in Pittsburgh &rarr;
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2">
            {service.subsections.map((sub) => (
              <div key={sub.title} className="bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900">
                  {sub.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {sub.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Secondary, lower-emphasis grid for the other 5 services[] entries --
// positioned as convenient add-ons to an assembly visit rather than
// equal, standalone offerings. Uses the lighter CompactServiceCard
// (no large photo) to keep the visual hierarchy clearly subordinate to
// AssemblyBreakdown() above.
function ComplementaryServices() {
  const addOns = services.filter((service) => service.id !== "assembly");

  return (
    <section className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {complementaryServicesSection.heading}
          </h2>
          <p className="mt-3 text-slate-600">
            {complementaryServicesSection.subheading}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((service) => (
            <CompactServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Upfront & Fixed Pricing — trust badge, what's always included, CTA      */
/* -------------------------------------------------------------------------- */

function PricingTrust() {
  return (
    <section className="bg-white px-4 pb-14 sm:pb-20">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {pricingTrustSection.heading}
          </h2>
          <p className="mt-3 text-slate-600">{pricingTrustSection.subheading}</p>
        </div>

        {/* No-surprise guarantee badge — solid, high-contrast pill (same
            pattern as the Hero's rating badge) so it reads as a distinct
            trust signal rather than blending into the page copy. */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-center text-sm font-bold text-emerald-900 sm:px-5 sm:py-3 sm:text-base">
            <span aria-hidden="true">{pricingTrustSection.badge.icon}</span>
            <span>{pricingTrustSection.badge.label}</span>
            <span aria-hidden="true" className="hidden text-emerald-300 sm:inline">
              |
            </span>
            <span className="w-full text-center text-xs font-semibold text-emerald-700 sm:w-auto sm:text-sm">
              {pricingTrustSection.badge.sublabel}
            </span>
          </div>
        </div>

        {/* Military / senior / first responder discount — a second,
            distinct badge (amber instead of emerald) so it reads as its
            own offer rather than part of the upfront-pricing guarantee
            above it. */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-sm font-bold text-amber-900 sm:px-5 sm:py-3 sm:text-base">
            <span aria-hidden="true">{discountOffer.icon}</span>
            <span>{discountOffer.label}</span>
          </div>
        </div>

        {/* What's always included — grounded in the same facts shown
            elsewhere on the site (QualityGuarantee's laser-level/clean-up
            items, the wall-anchoring FAQ), just surfaced here too, right
            next to the prices themselves. */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h3 className="text-center text-xs font-bold uppercase tracking-wide text-slate-500 sm:text-sm">
            {pricingTrustSection.includedHeading}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pricingTrustSection.included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <IconCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Instant, photo-based quote CTA */}
        <div className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-balance text-base text-slate-600 sm:text-lg">
            {pricingTrustSection.cta.text}
          </p>
          <a
            href="#quote"
            className={`mt-5 inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base ${BTN_PRIMARY}`}
          >
            {pricingTrustSection.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recent Projects / Services Gallery                                       */
/* -------------------------------------------------------------------------- */

// One gallery card, with its own Before/After toggle state. Kept as a
// dedicated component (rather than inline in Gallery()'s .map()) because
// it needs its own useState — each card's toggle is independent of the
// others.
function GalleryCard({ item }) {
  // No before/after toggle — a single static project photo per card. The
  // gradient+icon base layer always renders first (so the card is never
  // blank), and the real photo fades in on top of it once it loads; if
  // the file is missing or fails to load, onError just leaves that layer
  // transparent and the base layer keeps showing — no broken-image icon,
  // no build or load error.
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = SERVICE_ICONS[item.icon];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="p-3 pb-0">
        <span className="inline-block max-w-full rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase leading-snug tracking-wide text-slate-700 sm:text-[11px]">
          {item.category}
        </span>

        {/* Image container: fixed 4:3 aspect ratio, subtle rounded
            corners. */}
        <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-sky-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
            {Icon ? (
              <Icon className="relative h-14 w-14 text-white/90 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <IconBox className="relative h-14 w-14 text-white/70" />
            )}
          </div>

          {item.image && !imageFailed && (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 object-cover"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.description}</p>
      </div>
    </div>
  );
}


function Gallery() {
  return (
    <section id="gallery" className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {projectsGallery.heading}
          </h2>
          <p className="mt-3 text-slate-600">{projectsGallery.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projectsGallery.items.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3-step process                                                            */
/* -------------------------------------------------------------------------- */

function Process() {
  return (
    <section id="process" className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {processSteps.heading}
          </h2>
          <p className="mt-3 text-slate-600">{processSteps.subheading}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {processSteps.steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quote request form                                                        */
/* -------------------------------------------------------------------------- */

// How long the success confirmation stays up before auto-resetting, in ms.
const SUCCESS_AUTO_DISMISS_MS = 6000;

const EMPTY_FORM_DATA = {
  name: "",
  phone: "",
  services: [],
  notes: "",
  preferredContactMethod: quoteForm.fields.preferredContactMethod.defaultValue || "text",
  discountFirstTime: false,
  discountMilitaryFirstResponder: false,
  discountSenior: false,
};

// Maps each `discounts` entry id (contentData.js) to the formData key that
// tracks its checkbox state -- keeps the 3 checkboxes data-driven (one
// render loop) while each still has its own named, stable formData field.
const DISCOUNT_FORM_KEYS = [
  { id: "firstTime", formKey: "discountFirstTime" },
  { id: "militaryFirstResponder", formKey: "discountMilitaryFirstResponder" },
  { id: "senior", formKey: "discountSenior" },
];

function QuoteForm() {
  const [formData, setFormData] = useState(EMPTY_FORM_DATA);
  const [photoName, setPhotoName] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  // Separate from `status` — this flags the one client-side validation rule
  // (at least one service picked) without borrowing the server-error UI.
  const [servicesTouched, setServicesTouched] = useState(false);
  const autoDismissTimer = useRef(null);

  // Fully resets the form back to a blank, ready-for-a-new-request state.
  // Used by both the modal's Close (X) button and the auto-dismiss timer
  // below, so either path leaves things in the same clean state.
  function resetForm() {
    if (autoDismissTimer.current) {
      clearTimeout(autoDismissTimer.current);
      autoDismissTimer.current = null;
    }
    setFormData(EMPTY_FORM_DATA);
    setPhotoName("");
    setPhotoFile(null);
    setStatus("idle");
    setServicesTouched(false);
  }

  // Toggles one service value in/out of the selected array — pill buttons
  // call this directly instead of going through handleChange, since there's
  // no single input carrying the value.
  function toggleService(value) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((v) => v !== value)
        : [...prev.services, value],
    }));
  }

  // After a successful submission, auto-reset a few seconds later so a
  // returning visitor (or the same customer requesting a second job) sees
  // a fresh form rather than a stale success message. Cleared on unmount
  // or if status changes again before it fires (e.g. the user closes it
  // manually via resetForm, which already clears the timer itself).
  useEffect(() => {
    if (status === "success") {
      autoDismissTimer.current = setTimeout(resetForm, SUCCESS_AUTO_DISMISS_MS);
    }
    return () => {
      if (autoDismissTimer.current) {
        clearTimeout(autoDismissTimer.current);
        autoDismissTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files && e.target.files[0];
    setPhotoName(file ? file.name : "");
    setPhotoFile(file || null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side gate: at least one service must be picked. This isn't a
    // native `required` attribute (there's no single input to hang it off
    // of), so it's checked by hand before the request goes out.
    if (formData.services.length === 0) {
      setServicesTouched(true);
      return;
    }
    setStatus("submitting");

    // Turn the selected values into their display labels, in the order the
    // options are defined, so both the Telegram alert and the email land
    // with a clean, human-readable summary — e.g. "Furniture Assembly, TV
    // & Wall Mounting" — instead of raw value slugs.
    const selectedServiceLabels = quoteForm.fields.services.options
      .filter((opt) => formData.services.includes(opt.value))
      .map((opt) => opt.label);

    // Posts to our own Next.js Route Handler (formService.apiEndpoint,
    // i.e. app/api/quote/route.ts) rather than calling a third-party API
    // straight from the browser. That route fans the lead out server-side
    // to Telegram (instant alert) and Web3Forms (email) — see the long
    // comment on `formService` in contentData.js for why, and why no
    // access key needs to travel in this request at all anymore.
    try {
      const submission = new FormData();
      submission.append("subject", formService.subject(formData.name));
      submission.append("from_name", business.name);
      submission.append("name", formData.name);
      submission.append("phone", formData.phone);
      submission.append("service_needed", selectedServiceLabels.join(", "));
      submission.append("message", formData.notes);
      submission.append("preferred_contact_method", formData.preferredContactMethod);
      // 3 individual discount flags instead of one combined boolean -- the
      // server only ever applies a single 10% discount per job even if
      // more than one is checked (see discountMicrocopy in contentData.js).
      submission.append("discount_first_time", formData.discountFirstTime ? "true" : "false");
      submission.append(
        "discount_military_first_responder",
        formData.discountMilitaryFirstResponder ? "true" : "false"
      );
      submission.append("discount_senior", formData.discountSenior ? "true" : "false");
      submission.append("botcheck", ""); // honeypot — must stay empty
      if (photoFile) {
        submission.append("attachment", photoFile);
      }

      const response = await fetch(formService.apiEndpoint, {
        method: "POST",
        body: submission,
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setStatus("success");
      } else {
        // eslint-disable-next-line no-console
        console.error("Quote request failed:", result);
        setStatus("error");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Quote form submission error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="quote" className="bg-slate-900 px-4 py-14 sm:py-20">
        <div className="relative mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <button
            type="button"
            onClick={resetForm}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <IconX className="h-4 w-4" />
          </button>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <IconCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {quoteForm.successMessage}
          </h3>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="bg-slate-900 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-md">
        <div className="text-center text-white">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">
            {quoteForm.heading}
          </h2>
          <p className="mt-3 text-slate-300">{quoteForm.subheading}</p>
        </div>

        {/* Military / senior / first responder discount banner — same
            badge shown in the Pricing & Guarantee section, repeated here
            so it's visible right where someone is about to submit a
            request, not just further up the page. */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-xs font-bold text-amber-200 sm:px-5 sm:text-sm">
            <span aria-hidden="true">{discountOffer.icon}</span>
            <span>{discountOffer.label}</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              {quoteForm.fields.name.label}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required={quoteForm.fields.name.required}
              value={formData.name}
              onChange={handleChange}
              placeholder={quoteForm.fields.name.placeholder}
              className={INPUT_BASE}
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-slate-700">
              {quoteForm.fields.phone.label}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required={quoteForm.fields.phone.required}
              value={formData.phone}
              onChange={handleChange}
              placeholder={quoteForm.fields.phone.placeholder}
              className={INPUT_BASE}
            />
            {quoteForm.fields.phone.helpText && (
              <p className="mt-1.5 text-xs font-medium text-slate-500">
                {quoteForm.fields.phone.helpText}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">
              {quoteForm.fields.services.label}
            </legend>
            <p className="mt-0.5 text-xs text-slate-400">
              {quoteForm.fields.services.helpText}
            </p>
            {/* Large, tappable visual cards instead of small text pills --
                each shows an icon, the service name, and its real starting
                price so a visitor can pick a service without typing a
                word. Multi-select stays exactly as before (toggleService
                just flips membership in formData.services); only the
                visual treatment changed. */}
            <div
              className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3"
              role="group"
              aria-label={quoteForm.fields.services.label}
            >
              {quoteForm.fields.services.options.map((opt) => {
                const selected = formData.services.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(opt.value)}
                    className={`relative flex flex-col items-start gap-1 rounded-2xl border-2 p-3.5 text-left transition sm:p-4 ${
                      selected
                        ? "border-sky-500 bg-sky-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/40"
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white">
                        <IconCheck className="h-3 w-3" />
                      </span>
                    )}
                    {opt.emoji && (
                      <span aria-hidden="true" className="text-2xl leading-none sm:text-3xl">
                        {opt.emoji}
                      </span>
                    )}
                    <span className="text-sm font-semibold leading-snug text-slate-900">
                      {opt.label}
                    </span>
                    {opt.price && (
                      <span className="text-xs font-medium text-sky-600">{opt.price}</span>
                    )}
                  </button>
                );
              })}
            </div>
            {servicesTouched && formData.services.length === 0 && (
              <p className="mt-2 text-xs font-medium text-rose-600">
                {quoteForm.fields.services.errorMessage}
              </p>
            )}
          </fieldset>

          {/* Deliberately the most visually prominent field in the form —
              a photo is the single biggest lever on lead quality (an
              accurate flat-rate quote vs. a rough guess), so it gets a
              highlighted card, an icon, and a "Recommended" badge instead
              of blending in with the optional fields around it. */}
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="photo" className="text-sm font-medium text-slate-700">
                {quoteForm.fields.photo.label}
              </label>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                ⭐ Recommended for Fastest Response
              </span>
            </div>
            <label
              htmlFor="photo"
              className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-sky-300 bg-sky-50 px-3.5 py-3 text-sm text-sky-700 transition hover:border-sky-400 hover:bg-sky-100"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sky-600 shadow-sm">
                <IconCamera className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">
                  {photoName || "Tap to attach a photo"}
                </span>
              </span>
              <span className="flex-shrink-0 text-xs font-semibold uppercase text-sky-600">
                Browse
              </span>
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <p className="mt-1.5 text-xs font-medium text-slate-500">
              {quoteForm.fields.photo.helpText}
            </p>
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-medium text-slate-700">
              {quoteForm.fields.notes.label}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder={quoteForm.fields.notes.placeholder}
              className={`${INPUT_BASE} resize-none`}
            />
            {quoteForm.fields.notes.helpText && (
              <p className="mt-1 text-xs text-slate-400">
                {quoteForm.fields.notes.helpText}
              </p>
            )}
          </div>

          {/* Preferred Contact Method — a simple 3-way pill group, same
              toggle pattern as the service pills above but single-select. */}
          <fieldset>
            <legend className="text-sm font-medium text-slate-700">
              {quoteForm.fields.preferredContactMethod.label}
            </legend>
            {quoteForm.fields.preferredContactMethod.helpText && (
              <p className="mt-0.5 text-xs text-slate-400">
                {quoteForm.fields.preferredContactMethod.helpText}
              </p>
            )}
            <div className="mt-3 grid grid-cols-3 gap-2.5" role="group" aria-label={quoteForm.fields.preferredContactMethod.label}>
              {quoteForm.fields.preferredContactMethod.options.map((opt) => {
                const selected = formData.preferredContactMethod === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, preferredContactMethod: opt.value }))
                    }
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm font-semibold transition ${
                      selected
                        ? "border-sky-500 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50/40"
                    }`}
                  >
                    {opt.emoji && <span aria-hidden="true" className="text-lg leading-none">{opt.emoji}</span>}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 3 individual, self-reported opt-in discount checkboxes — no ID
              or proof asked for here, same as everything else in this
              form; we just take the customer's word for it. Only one 10%
              discount applies per job even if more than one is checked
              (see the microcopy rendered below the checkboxes). */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-700">
              {quoteForm.fields.discounts.label}
            </legend>
            {DISCOUNT_FORM_KEYS.map(({ id, formKey }) => {
              const option = quoteForm.fields.discounts.options.find((o) => o.id === id);
              if (!option) return null;
              return (
                <label
                  key={id}
                  htmlFor={`discount-${id}`}
                  className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-900 transition hover:border-amber-300 hover:bg-amber-100"
                >
                  <input
                    id={`discount-${id}`}
                    name={`discount-${id}`}
                    type="checkbox"
                    checked={formData[formKey]}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [formKey]: e.target.checked }))
                    }
                    className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-amber-300 text-amber-600 focus:ring-amber-400"
                  />
                  <span className="font-medium">{option.label}</span>
                </label>
              );
            })}
            {quoteForm.fields.discounts.microcopy && (
              <p className="pt-0.5 text-xs font-medium text-amber-700">
                {quoteForm.fields.discounts.microcopy}
              </p>
            )}
          </fieldset>

          {status === "error" && (
            <p className="rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
              {quoteForm.errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`w-full px-4 py-3.5 text-base shadow-lg shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${BTN_PRIMARY}`}
          >
            {status === "submitting" ? "Sending..." : quoteForm.submitLabel}
          </button>

          <p className="text-center text-xs text-slate-400">
            {quoteForm.disclaimer}
          </p>
        </form>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trust signals / guarantees                                                */
/* -------------------------------------------------------------------------- */

function Guarantees() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {guaranteesSection.heading}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {guarantees.map((g) => (
            <div key={g.id} className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IconCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {g.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quality/equipment guarantee — the standards behind the guarantees above   */
/* -------------------------------------------------------------------------- */

function QualityGuarantee() {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {qualityGuaranteeSection.heading}
          </h2>
          <p className="mt-3 text-slate-600">{qualityGuaranteeSection.subheading}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {qualityGuaranteeSection.items.map((item) => (
            <div key={item.id} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IconCheck className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {item.label}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

function About() {
  return (
    <section id="about" className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 sm:items-center sm:gap-12">
        <div>
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {aboutSection.heading}
          </h2>
          <div className="mt-4 space-y-4">
            {aboutSection.body.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          {guarantees.map((g) => (
            <div key={g.id} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IconCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{g.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{g.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

// Google Reviews trust section. Deliberately shows only the real, verified
// rating (see localBusinessSchema.aggregateRating in contentData.js) --
// no invented customer quotes, names, or review counts. Once real reviews
// exist, swap this stat card for an embed of the actual Google reviews
// (or individual real quotes) rather than reintroducing placeholder text.
function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
          {testimonialsSection.heading}
        </h2>
        {testimonialsSection.subheading && (
          <p className="mt-3 text-slate-600">{testimonialsSection.subheading}</p>
        )}

        <div className="mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: googleReviews.stars }).map((_, i) => (
              <IconStar key={i} className="h-5 w-5" />
            ))}
          </div>
          <span className="text-lg font-bold text-slate-900">
            {googleReviews.value} / 5
          </span>
          <span className="text-sm font-medium text-slate-500">
            ({googleReviews.reviewCount} {googleReviews.sourceLabel})
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ accordion                                                             */
/* -------------------------------------------------------------------------- */

function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {faqSection.heading}
          </h2>
        </div>

        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-slate-900 sm:text-base">
                    {item.question}
                  </span>
                  <IconChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  const rawCommitSha =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_COMMIT_SHA ||
    "";
  const shortCommitSha = rawCommitSha ? rawCommitSha.slice(0, 7) : "";

  return (
    <footer className="bg-slate-900 px-4 py-10 pb-24 text-slate-400 lg:pb-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-lg font-bold text-white">{business.name}</p>
        <p className="mx-auto mt-2 max-w-md text-sm">
          Serving {business.serviceArea} &middot; {business.hours}
        </p>
        <nav
          aria-label="Page sections"
          className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm"
        >
          {footer.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <nav
          aria-label="Service areas"
          className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs"
        >
          {footer.servicePageLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <a href={business.phoneHref} className="hover:text-white">
            {business.phoneDisplay}
          </a>
          <span aria-hidden="true">&middot;</span>
          <a href={`mailto:${business.email}`} className="hover:text-white">
            {business.email}
          </a>
        </div>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          {footer.legalLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-4">
              {index > 0 && <span aria-hidden="true">&middot;</span>}
              <Link href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        {/* Subtle build/version marker — deliberately the most muted text on
            the page (darker than the copyright line above it) so it never
            competes for attention, but gives a quick rollback reference
            point when checking which deploy is live. Commit SHA is only
            present on Vercel builds (see next.config.ts); it's silently
            omitted in local dev instead of showing a broken/empty value. */}
        <p className="mt-2 text-[11px] text-slate-600">
          v{packageJson.version}
          {shortCommitSha ? ` (${shortCommitSha})` : ""}
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <main id="top" className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <Hero />
      <ServiceAreas />
      <PainPoints />
      <AssemblyBreakdown />
      <ComplementaryServices />
      <PricingTrust />
      <Gallery />
      <Process />
      <QuoteForm />
      <Guarantees />
      <QualityGuarantee />
      <Testimonials />
      <About />
      <FAQ />
      <Footer />
      <StickyMobileBar />
    </main>
  );
}
