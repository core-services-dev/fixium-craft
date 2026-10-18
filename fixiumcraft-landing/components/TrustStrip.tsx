import { BadgeCheck, MapPin, ShieldCheck, Star, Tag } from "lucide-react";
import { googleReviews } from "./contentData";
import { trustFacts } from "./proofData";

// TrustStrip.tsx — one compact, honest row of proof for pages that currently
// show it only in prose (service pages, /services hub, guides). Server component.
export default function TrustStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const items = [
    { icon: Star, text: `${googleReviews.value} on Google (${googleReviews.reviewCount} reviews)`, href: "/#testimonials", gold: true },
    { icon: ShieldCheck, text: trustFacts.insuranceCertOnRequest ? "Fully insured · certificate on request" : "Fully insured" },
    { icon: BadgeCheck, text: "Background-checked techs" },
    { icon: Tag, text: "Flat rate quoted before we start" },
    { icon: MapPin, text: "Pittsburgh-based team" },
  ];
  return (
    <ul
      aria-label="Why customers trust Fixium Craft"
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium ${dark ? "text-slate-200" : "text-slate-700"}`}
    >
      {items.map(({ icon: Icon, text, href, gold }) => (
        <li key={text} className="inline-flex items-center gap-1.5">
          <Icon className={`h-4 w-4 ${gold ? "fill-amber-400 text-amber-400" : dark ? "text-emerald-300" : "text-emerald-600"}`} aria-hidden="true" />
          {href ? <a href={href} className="underline-offset-2 hover:underline">{text}</a> : text}
        </li>
      ))}
      {trustFacts.hicNumber ? <li className="text-xs text-slate-600">PA HIC Reg. #{trustFacts.hicNumber}</li> : null}
    </ul>
  );
}
