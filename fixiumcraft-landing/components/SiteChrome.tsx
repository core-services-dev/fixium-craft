import Link from "next/link";
import BrandLink from "./BrandLink";
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
  "rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-600";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <BrandLink className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 transition-opacity hover:opacity-80" />
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
        <nav
          aria-label="Footer"
          className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm"
        >
          <Link href="/guides" className="hover:text-white">
            Helpful Guides
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="/accessibility" className="hover:text-white">
            Accessibility
          </Link>
        </nav>
        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
