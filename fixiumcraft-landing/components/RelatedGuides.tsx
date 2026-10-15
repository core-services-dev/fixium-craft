import Link from "next/link";
import GuideCard from "./GuideCard";
import { getGuidesForService, toSummary } from "@/lib/guides";

// RelatedGuides.tsx
//
// "Related Helpful Guides" block for the bottom of a service page. Looks up
// guides whose category maps to this service (see guideCategories in
// lib/guides.ts) and renders nothing when there are none, so adding a new
// service without guides never shows an empty box.

export default function RelatedGuides({ serviceSlug }: { serviceSlug: string }) {
  const guides = getGuidesForService(serviceSlug);
  if (!guides.length) return null;

  return (
    <section aria-labelledby="related-guides-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="related-guides-heading" className="text-xl font-bold sm:text-2xl">
            Related Helpful Guides
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Step-by-step advice from our technicians, whether you do it yourself or hire us.
          </p>
        </div>
        <Link
          href="/guides"
          className="hidden shrink-0 text-sm font-semibold text-blue-800 hover:underline sm:block"
        >
          All guides
        </Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={toSummary(g)} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
