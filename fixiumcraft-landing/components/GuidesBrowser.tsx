"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import GuideCard from "./GuideCard";
import type { GuideSummary } from "@/lib/guides";

// GuidesBrowser.tsx
//
// Category filter + card grid for /guides. Reads ?category=<slug> on load so
// breadcrumb links land on the right tab, and keeps the URL in sync with
// history.replaceState (no navigation, no refetch). Must sit inside a
// <Suspense> boundary because of useSearchParams — the page supplies a
// server-rendered, unfiltered grid as the fallback, so crawlers always get
// every guide in the HTML.

type Category = { slug: string; label: string };

export default function GuidesBrowser({
  guides,
  categories,
}: {
  guides: GuideSummary[];
  categories: Category[];
}) {
  const params = useSearchParams();
  const fromUrl = params.get("category") ?? "all";
  const [active, setActive] = useState(
    categories.some((c) => c.slug === fromUrl) ? fromUrl : "all",
  );

  const select = (slug: string) => {
    setActive(slug);
    const url = slug === "all" ? "/guides" : `/guides?category=${slug}`;
    window.history.replaceState(null, "", url);
  };

  const visible = active === "all" ? guides : guides.filter((g) => g.category === active);
  const tabs = [{ slug: "all", label: "All Guides" }, ...categories];

  return (
    <div>
      <div role="group" aria-label="Filter guides by category" className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const selected = active === t.slug;
          const count = t.slug === "all" ? guides.length : guides.filter((g) => g.category === t.slug).length;
          return (
            <button
              key={t.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => select(t.slug)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-blue-800 bg-blue-800 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-800"
              }`}
            >
              {t.label}
              <span className={`ml-2 text-xs ${selected ? "text-blue-100" : "text-slate-600"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "guide" : "guides"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          No guides in this category yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
