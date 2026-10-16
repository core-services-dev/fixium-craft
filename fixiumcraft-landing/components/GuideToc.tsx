"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListOrdered } from "lucide-react";

// GuideToc.tsx
//
// "On this page" navigation for a guide. Two variants rendered by the page:
// a collapsible list above the article on small screens, and a sticky
// sidebar with scroll-spy highlighting on desktop.

type Item = { id: string; label: string };

export default function GuideToc({
  items,
  variant,
}: {
  items: Item[];
  variant: "mobile" | "desktop";
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const key = items.map((i) => i.id).join(",");

  useEffect(() => {
    if (variant !== "desktop") return;
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, variant]);

  if (variant === "mobile") {
    return (
      <details className="group rounded-xl border border-slate-200 bg-slate-50 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
          <ListOrdered className="h-4 w-4 text-blue-800" aria-hidden="true" />
          On this page
          <span
            aria-hidden="true"
            className="ml-auto text-xl leading-none text-blue-800 transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <ol className="space-y-0.5 border-t border-slate-200 px-2 py-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-white hover:text-blue-800"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-600">On this page</p>
      <ol className="mt-3 border-l border-slate-200">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition ${
                  isActive
                    ? "border-blue-800 font-semibold text-blue-800"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 rounded-xl bg-slate-900 p-4 text-white">
        <p className="text-sm font-semibold">Rather have a pro handle it?</p>
        <p className="mt-1 text-xs text-slate-300">Flat-rate quotes, fully insured.</p>
        <Link
          href="/#quote"
          className="mt-3 block rounded-lg bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-600"
        >
          Get a Free Quote
        </Link>
      </div>
    </nav>
  );
}
