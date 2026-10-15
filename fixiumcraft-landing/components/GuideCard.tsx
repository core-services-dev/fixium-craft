import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { GuideSummary } from "@/lib/guides";

// GuideCard.tsx
//
// One card in the guides grid. No hooks, so it works both in server
// components (related guides on service pages) and inside the client-side
// filter on /guides.

export default function GuideCard({
  guide,
  headingLevel = "h2",
}: {
  guide: GuideSummary;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
          {guide.categoryLabel}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-600">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.readTime} min read
        </span>
      </div>
      <Heading className="mt-4 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-800">
        {guide.title}
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{guide.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-800">
        Read the guide
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
