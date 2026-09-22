import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { business } from "./contentData";

// LegalPageLayout.tsx
//
// Shared shell for standalone informational pages (Privacy Policy, Terms
// of Service) that aren't part of the single-page LandingPage.jsx flow.
// Mirrors LandingPage's design tokens (colors, spacing, button styling)
// by hand, since Navbar/Footer inside LandingPage.jsx aren't exported —
// if a third legal-style page is ever added, consider exporting those
// instead of a third copy of this shell.

const BTN_PRIMARY =
  "rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400";

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
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

      <article className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

          <div className="mt-10 space-y-10">{children}</div>

          <div className="mt-12 border-t border-slate-200 pt-8 text-center">
            <Link href="/" className={BTN_PRIMARY}>
              Back to Home
            </Link>
          </div>
        </div>
      </article>

      <footer className="bg-slate-900 px-4 py-10 text-slate-400">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-lg font-bold text-white">{business.name}</p>
          <p className="mt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
