"use client";

// SiteNav.jsx
//
// Shared header + sticky mobile action bar for the homepage and every
// /services/<slug> page. Services dropdown is built from `servicePillars`
// (one source of truth); the other links come from `navSection`. All
// cross-page anchors use "/#..." with next/link (client navigation) so they
// also work from sub-pages and are not undone by ScrollToTop (which only
// resets scroll on full page loads).

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { business, navSection, servicePillars } from "./contentData";

const BTN_PRIMARY =
  "rounded-lg bg-sky-500 font-semibold text-white transition hover:bg-sky-400";
const BTN_OUTLINE_DARK =
  "rounded-lg border border-slate-200 font-semibold text-slate-700 transition hover:bg-slate-50";

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function IconPhone(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMessage(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconTag(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <path d="M7 7h.01" />
    </svg>
  );
}
function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.17.01.41-.07.64.49.24.58.81 2.01.88 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.89 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}
function IconChevronDown(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function IconMenu(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconClose(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function SiteNav() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return undefined;
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const closeAll = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3.5">
        <Link
          href="/"
          onClick={closeAll}
          className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 transition-opacity hover:opacity-80"
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
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
        >
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((o) => !o)}
              className="inline-flex items-center gap-1 hover:text-slate-900"
            >
              {navSection.servicesLabel}
              <IconChevronDown
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {servicePillars.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/services/${p.slug}`}
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2.5 hover:bg-slate-50"
                  >
                    <span className="block text-sm font-semibold text-slate-900">
                      {p.navLabel}
                    </span>
                    <span className="block text-xs text-slate-500">{p.navBlurb}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navSection.links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
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
            <span>{navSection.callLabel}</span>
          </a>
          <Link
            href={navSection.quoteCta.href}
            onClick={closeAll}
            className={`whitespace-nowrap px-3.5 py-2 text-sm ${BTN_PRIMARY}`}
          >
            <span className="sm:hidden">{navSection.quoteCta.shortLabel}</span>
            <span className="hidden sm:inline">{navSection.quoteCta.label}</span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          >
            {mobileOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden"
        >
          <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {navSection.servicesLabel}
          </p>
          <ul className="space-y-1">
            {servicePillars.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  onClick={closeAll}
                  className="block rounded-lg px-3 py-3 hover:bg-slate-50"
                >
                  <span className="block text-sm font-semibold text-slate-900">{p.navLabel}</span>
                  <span className="block text-xs text-slate-500">{p.navBlurb}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-3 border-t border-slate-100 pt-2">
            {navSection.links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={business.phoneHref}
              className={`flex items-center justify-center gap-2 px-3 py-3 text-sm ${BTN_OUTLINE_DARK}`}
            >
              <IconPhone className="h-4 w-4" /> Call
            </a>
            <a
              href={business.smsHref}
              className={`flex items-center justify-center gap-2 px-3 py-3 text-sm ${BTN_OUTLINE_DARK}`}
            >
              <IconMessage className="h-4 w-4" /> Text
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function StickyMobileBar() {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-slate-700 active:bg-slate-50";
  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-slate-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden"
    >
      <a href={business.phoneHref} className={item} aria-label="Call us">
        <IconPhone className="h-5 w-5" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a href={business.smsHref} className={`${item} border-l border-slate-200`} aria-label="Text us">
        <IconMessage className="h-5 w-5" />
        <span className="text-[11px] font-medium">Text</span>
      </a>
      <Link
        href="/#quote"
        className={`${item} border-x border-slate-200 text-sky-600`}
        aria-label="Get a free quote"
      >
        <IconTag className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Quote</span>
      </Link>
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
