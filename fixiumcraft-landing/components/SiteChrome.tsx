import Link from "next/link";
import Image from "next/image";
import { business } from "./contentData";

// SiteChrome.tsx
//
// Shared header/footer + button styling for standalone routes outside the
// single-page LandingPage.jsx flow (Privacy, Terms, and the dedicated
// service+location pages under app/<slug>/page.tsx). Extracted here once a
// second consumer (ServicePage.tsx) needed the same shell LegalPageLayout.tsx
// already had — Navbar/Footer inside LandingPage.jsx itself still aren't
// exported, so this stays the one shared copy for everything else.

export const BTN_PRIMARY =
  "rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link
          href="/"
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
        </Link>
        <Link href="/" className={BTN_PRIMARY}>
          Back to Home
        </Link>
      </div>
    </header>
  );
}

export function SiteFooterMini() {
  return (
    <footer className="bg-slate-900 px-4 py-10 text-slate-400">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-lg font-bold text-white">{business.name}</p>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
