import { track } from "@vercel/analytics";

// analytics.ts
//
// One helper for every custom conversion event. It fans out to whatever is
// installed: Google Analytics 4 (window.gtag, present only when
// NEXT_PUBLIC_GA_MEASUREMENT_ID is set) and Vercel Web Analytics (custom
// events need a Vercel Pro plan; page views work on every plan). Never pass
// personal data (names, phone numbers, addresses) as event parameters.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
  try {
    track(name, params);
  } catch {
    /* analytics must never break the page */
  }
}
