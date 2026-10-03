"use client";

import { useEffect } from "react";

/* -------------------------------------------------------------------------- */
/*  ScrollToTop                                                               */
/*                                                                             */
/*  Forces every full page load / hard refresh to start at the very top of   */
/*  the document, overriding two browser behaviors that otherwise land the   */
/*  visitor partway down the page:                                           */
/*                                                                             */
/*  1. Native hash auto-scroll. Every in-page nav/CTA link here is a plain   */
/*     `<a href="#quote">`-style anchor (Navbar, Hero, StickyMobileBar,      */
/*     etc.), so clicking one leaves that hash in the URL bar. Reloading the */
/*     page afterward makes the browser jump straight back to that element  */
/*     on load -- which can land near the Quote form or Footer instead of   */
/*     the Hero, exactly the symptom this fixes.                            */
/*  2. Scroll-position (bfcache/back-forward) restoration, which can         */
/*     reapply a previous scroll offset on reload in some browsers.          */
/*                                                                             */
/*  Mounted once in the root layout so it covers every route (the home page */
/*  and every standalone service/legal page), not just LandingPage.jsx.      */
/* -------------------------------------------------------------------------- */
export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Run now, and again on the next animation frame -- the second pass
    // wins against the browser's own post-load hash scroll, which can
    // happen a tick after this effect first runs.
    window.scrollTo(0, 0);
    const raf = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return null;
}
