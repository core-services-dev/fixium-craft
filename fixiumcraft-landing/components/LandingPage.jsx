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
import {
  business,
  hero,
  painPoints,
  services,
  servicesSection,
  projectsGallery,
  process as processSteps,
  formService,
  quoteForm,
  guarantees,
  guaranteesSection,
  testimonials,
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
          <a href="#services" className="hover:text-slate-900">
            Services
          </a>
          <a href="#gallery" className="hover:text-slate-900">
            Recent Projects
          </a>
          <a href="#process" className="hover:text-slate-900">
            How It Works
          </a>
          <a href="#testimonials" className="hover:text-slate-900">
            Reviews
          </a>
          <a href="#faq" className="hover:text-slate-900">
            FAQ
          </a>
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
        href={business.smsHref}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-x border-slate-200 py-2.5 text-slate-700 active:bg-slate-50"
        aria-label="Text us a photo"
      >
        <IconMessage className="h-5 w-5" />
        <span className="text-[11px] font-medium">Text Photo</span>
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
        <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
          {hero.eyebrow}
        </p>
        <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base text-slate-300 sm:text-lg">
          {hero.subheadline}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#quote"
            className={`w-full px-6 py-3.5 text-center text-base shadow-lg shadow-sky-500/30 sm:w-auto ${BTN_PRIMARY}`}
          >
            {hero.primaryCta.label}
          </a>
          <div className="flex w-full gap-3 sm:w-auto">
            <a
              href={business.phoneHref}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm sm:flex-none ${BTN_OUTLINE_LIGHT}`}
            >
              <IconPhone className="h-4 w-4" /> Call
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm sm:flex-none ${BTN_OUTLINE_LIGHT_WHATSAPP}`}
            >
              <IconWhatsapp className="h-4 w-4 text-emerald-400" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mx-auto mt-9 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300 sm:text-sm">
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

function Services() {
  return (
    <section id="services" className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {servicesSection.heading}
          </h2>
          <p className="mt-3 text-slate-600">{servicesSection.subheading}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <div
                key={service.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.alt || service.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {Icon ? (
                    <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sky-600 shadow-md">
                      <Icon className="h-4 w-4" />
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <IconCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {service.startingPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recent Projects / Services Gallery                                       */
/* -------------------------------------------------------------------------- */

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
          {projectsGallery.items.map((item) => {
            const Icon = SERVICE_ICONS[item.icon];
            return (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 to-sky-900">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                  {Icon ? (
                    <Icon className="relative h-14 w-14 text-white/90 transition-transform duration-300 group-hover:scale-110" />
                  ) : null}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
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
  email: "",
  zip: "",
  services: [],
  notes: "",
};

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
      submission.append("email", formData.email);
      submission.append("zip_code", formData.zip);
      submission.append("service_needed", selectedServiceLabels.join(", "));
      submission.append("message", formData.notes);
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

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
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
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              {quoteForm.fields.email.label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required={quoteForm.fields.email.required}
              value={formData.email}
              onChange={handleChange}
              placeholder={quoteForm.fields.email.placeholder}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            <p className="mt-1 text-xs text-slate-400">
              {quoteForm.fields.email.helpText}
            </p>
          </div>

          <div>
            <label htmlFor="zip" className="text-sm font-medium text-slate-700">
              {quoteForm.fields.zip.label}
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              inputMode="numeric"
              required={quoteForm.fields.zip.required}
              value={formData.zip}
              onChange={handleChange}
              placeholder={quoteForm.fields.zip.placeholder}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">
              {quoteForm.fields.services.label}
            </legend>
            <p className="mt-0.5 text-xs text-slate-400">
              {quoteForm.fields.services.helpText}
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={quoteForm.fields.services.label}>
              {quoteForm.fields.services.options.map((opt) => {
                const selected = formData.services.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(opt.value)}
                    className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                      selected
                        ? "border-sky-500 bg-sky-500 text-white shadow-sm"
                        : "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-600"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {selected && <IconCheck className="h-3.5 w-3.5" />}
                      {opt.label}
                    </span>
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

          <div>
            <label htmlFor="photo" className="text-sm font-medium text-slate-700">
              {quoteForm.fields.photo.label}
            </label>
            <label
              htmlFor="photo"
              className="mt-1.5 flex cursor-pointer items-center justify-between rounded-lg border border-dashed border-slate-300 px-3.5 py-2.5 text-sm text-slate-500 hover:border-sky-400 hover:text-sky-600"
            >
              <span className="truncate">
                {photoName || "Tap to attach a photo"}
              </span>
              <span className="ml-2 flex-shrink-0 text-xs font-semibold uppercase text-sky-600">
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
            <p className="mt-1 text-xs text-slate-400">
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
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {status === "error" && (
            <p className="rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
              {quoteForm.errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60 ${BTN_PRIMARY}`}
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
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
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
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            {testimonialsSection.heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                "{t.text}"
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {t.name}
              </p>
              <p className="text-xs text-slate-500">{t.location}</p>
            </div>
          ))}
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
  return (
    <footer className="bg-slate-900 px-4 py-10 pb-24 text-slate-400 lg:pb-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-lg font-bold text-white">{business.name}</p>
        <p className="mx-auto mt-2 max-w-md text-sm">
          Serving {business.serviceArea} &middot; {business.hours}
        </p>
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
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <Hero />
      <PainPoints />
      <Services />
      <Gallery />
      <Process />
      <QuoteForm />
      <Guarantees />
      <Testimonials />
      <FAQ />
      <Footer />
      <StickyMobileBar />
    </main>
  );
}
