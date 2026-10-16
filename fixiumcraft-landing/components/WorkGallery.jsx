"use client";

// WorkGallery.jsx
//
// "Recent Work" photo gallery: filter tabs, a symmetric grid (2/3/4 columns)
// of identical square, center-cropped tiles with centered captions, a tap-to-
// enlarge lightbox, and a before/after tile type. Data lives in
// `projectsGallery` (contentData.js). Used on the homepage (all
// categories) and on each /services/<slug> page (just that pillar's
// categories, via the `categories` prop).

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { projectsGallery } from "./contentData";

const SIZES = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw";

// Centered, muted caption under each photo.
function Caption({ item }) {
  return (
    <figcaption className="mt-2 px-1 text-center text-xs font-medium leading-snug text-slate-700 md:text-sm">
      {item.title}
      {item.area ? <span className="font-normal text-slate-600"> &middot; {item.area}</span> : null}
    </figcaption>
  );
}

// Fills its (square) parent: every photo is center-cropped to the same size,
// whatever the original aspect ratio. The lightbox still shows the full photo.
function PhotoButton({ photo, label, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      aria-label={`View larger: ${label}`}
      className="group relative block h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-300"
    >
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        sizes={SIZES}
        className="object-cover object-center transition-all duration-300 group-hover:scale-[1.03]"
      />
    </button>
  );
}

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    if (!photo) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [photo, onClose]);

  if (!photo) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white hover:bg-white/20"
      >
        &times;
      </button>
      <Image
        src={photo.image}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="100vw"
        className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
      />
    </div>
  );
}

export default function WorkGallery({
  id = "gallery",
  categories = /** @type {string[] | null} */ (null), // optional: restrict to these category ids, e.g. ["locksmith"]
  initialCount = 0, // optional: show this many first, with a "Show all" button
  heading = projectsGallery.heading,
  subheading = projectsGallery.subheading,
  className = "bg-white",
}) {
  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const scoped = useMemo(
    () =>
      projectsGallery.items.filter((item) => !categories || categories.includes(item.category)),
    [categories]
  );
  const tabs = projectsGallery.categories.filter(
    (c) => c.id === "all" || scoped.some((item) => item.category === c.id)
  );
  const labelFor = (catId) =>
    projectsGallery.categories.find((c) => c.id === catId)?.label || "";
  const filtered = scoped.filter((item) => active === "all" || item.category === active);
  const limit = initialCount && !expanded ? initialCount : filtered.length;
  const visible = filtered.slice(0, limit);

  if (scoped.length === 0) return null;

  return (
    <section id={id} className={`px-4 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">{heading}</h2>
          {subheading && <p className="mt-3 text-slate-600">{subheading}</p>}
        </div>

        {tabs.length > 2 && (
          <div
            role="tablist"
            aria-label="Filter recent work"
            className="mt-8 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center"
          >
            {tabs.map((tab) => {
              const selected = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActive(tab.id);
                    setExpanded(false);
                  }}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        <div
          className={`mt-8 grid gap-4 ${
            visible.length === 1
              ? "mx-auto max-w-xs grid-cols-1"
              : visible.length === 2
                ? "mx-auto max-w-xl grid-cols-2"
                : visible.length === 3
                  ? "mx-auto max-w-3xl grid-cols-2 md:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {visible.map((item) => (
            <figure key={item.id}>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                {item.before ? (
                  <div className="grid h-full grid-cols-2 gap-px bg-white">
                    {[
                      { key: "before", label: "Before", photo: item.before },
                      { key: "after", label: "After", photo: item.after },
                    ].map(({ key, label, photo }) => (
                      <div key={key} className="relative h-full overflow-hidden">
                        <PhotoButton photo={photo} label={`${item.title} (${label.toLowerCase()})`} onOpen={setLightbox} />
                        <span
                          className={`pointer-events-none absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${
                            key === "after" ? "bg-blue-800" : "bg-slate-800/80"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <PhotoButton photo={item} label={item.title} onOpen={setLightbox} />
                )}
              </div>
              <Caption item={item} />
            </figure>
          ))}
        </div>

        {initialCount > 0 && !expanded && filtered.length > initialCount && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Show all {filtered.length} projects
            </button>
          </div>
        )}
      </div>
      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
