import Link from "next/link";
import GuideCard from "./GuideCard";
import { getAllGuides, toSummary } from "@/lib/guides";

// HomeGuides.tsx
//
// "Free guides" strip for the homepage, rendered on the server and passed
// into LandingPage as `guidesSlot` (see app/page.tsx). It gives the
// homepage direct links to individual guides, not just the /guides index,
// and renders nothing when no guide maps to a service. Guides without a
// service (serviceSlug empty) are left out of this strip.

export default function HomeGuides() {
  const guides = getAllGuides()
    .filter((g) => g.serviceSlug)
    .slice(0, 3);
  if (!guides.length) return null;

  return (
    <section aria-labelledby="home-guides-heading" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="home-guides-heading"
            className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Free Home Repair &amp; Assembly Guides
          </h2>
          <p className="mt-3 text-slate-600">
            Step-by-step advice from our Pittsburgh technicians: do it yourself safely, or let us
            handle it.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={toSummary(g)} headingLevel="h3" />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/guides" className="text-sm font-semibold text-blue-800 hover:underline">
            Browse all home repair &amp; assembly guides &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
