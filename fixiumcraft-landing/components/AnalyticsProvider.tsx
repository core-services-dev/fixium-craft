"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { trackEvent } from "./analytics";

// AnalyticsProvider.tsx
//
// Mounted once in app/layout.tsx so it covers every route. It:
//  1. loads Vercel Web Analytics + Speed Insights (page views, Core Web Vitals),
//  2. loads Google Analytics 4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set
//     (e.g. G-XXXXXXXXXX; add it in Vercel -> Settings -> Environment Variables),
//  3. tracks click-to-call / text / WhatsApp taps site-wide with ONE
//     document-level listener, so no individual link needs wiring and new
//     links are covered automatically.
// Quote-form submissions are tracked in QuoteForm (LandingPage.jsx).

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function placementOf(el: Element): string {
  if (el.closest('nav[aria-label="Quick contact actions"]')) return "sticky_bar";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return el.closest("[id]")?.id || "page";
}

export default function AnalyticsProvider() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      let name: string | null = null;
      if (href.startsWith("tel:")) name = "phone_click";
      else if (href.startsWith("sms:")) name = "sms_click";
      else if (href.includes("wa.me/")) name = "whatsapp_click";
      if (!name) return;
      trackEvent(name, { placement: placementOf(link), page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
