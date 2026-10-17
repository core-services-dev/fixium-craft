import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/components/contentData";

// QuickQuoteBanner.tsx
//
// Slim "need a pro?" strip shown directly under a guide's title. Server
// component: plain links, no client JS, fixed content, so it adds nothing to
// the bundle and cannot shift the layout. Kept to one compact row (about
// 72px on a phone) so the guide itself is visible without scrolling.

type Props = {
  /** Short service name, e.g. "TV mounting". */
  label: string;
  /** Starting price exactly as shown elsewhere on the site, e.g. "From $89". */
  price: string;
};

export default function QuickQuoteBanner({ label, price }: Props) {
  return (
    <aside
      aria-label="Get a quote"
      className="mt-4 flex max-w-3xl items-center justify-between gap-3 surface-card px-3 py-2.5 text-slate-900 sm:px-4 sm:py-3"
    >
      <p className="min-w-0 leading-tight">
        <span className="block truncate text-xs text-slate-600">
          <span className="hidden sm:inline">Rather have a pro do it? </span>
          {label}
        </span>
        <span className="mt-0.5 block whitespace-nowrap text-base font-bold text-blue-800">
          {price}
          <span className="hidden text-sm font-normal text-slate-600 sm:inline"> · flat-rate &amp; fully insured</span>
        </span>
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/#quote"
          className="rounded-lg bg-cta px-3.5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Get Quote
        </Link>
        <a
          href={business.phoneHref}
          aria-label={`Call ${business.phoneDisplay}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
