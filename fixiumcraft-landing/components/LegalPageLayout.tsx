import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooterMini, BTN_PRIMARY } from "./SiteChrome";

// LegalPageLayout.tsx
//
// Shared shell for standalone informational pages (Privacy Policy, Terms
// of Service) that aren't part of the single-page LandingPage.jsx flow.
// Header/footer live in SiteChrome.tsx, shared with ServicePage.tsx.

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
      <SiteHeader />

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

      <SiteFooterMini />
    </main>
  );
}
