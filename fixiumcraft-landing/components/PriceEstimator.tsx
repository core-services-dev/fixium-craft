"use client";

import { useMemo, useState } from "react";
import { business } from "./contentData";
import { estimatorItems, estimatorMinimum } from "./proofData";

// PriceEstimator.tsx — "build your price" widget for /services/<slug>.
// Renders nothing until estimatorItems[slug] has owner-confirmed prices.
export default function PriceEstimator({ slug, label }: { slug: string; label: string }) {
  const items = estimatorItems[slug] ?? [];
  const [qty, setQty] = useState<Record<string, number>>({});
  const { total, lines } = useMemo(() => {
    const picked = items.filter((i) => (qty[i.id] ?? 0) > 0);
    const sum = picked.reduce((s, i) => s + i.price * qty[i.id], 0);
    return {
      total: picked.length ? Math.max(sum, estimatorMinimum[slug] ?? 0) : 0,
      lines: picked.map((i) => `${qty[i.id]} x ${i.label}`),
    };
  }, [items, qty, slug]);

  if (!items.length) return null;
  const set = (id: string, d: number, max = 20) =>
    setQty((q) => ({ ...q, [id]: Math.min(max, Math.max(0, (q[id] ?? 0) + d)) }));
  const body = encodeURIComponent(`Hi Fixium Craft, I'd like to book ${label}: ${lines.join(", ")} (estimate $${total}).`);

  return (
    <section id="price-estimator" aria-labelledby="estimator-h" className="surface-card p-5 sm:p-6">
      <h2 id="estimator-h" className="text-xl font-bold text-slate-900">Build your flat-rate price</h2>
      <p className="mt-1 text-sm text-slate-600">Pick what you need. This is the price we quote, not a range.</p>
      <ul className="mt-4 divide-y divide-slate-200">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-3 py-3">
            <span className="text-sm font-medium text-slate-900">{i.label}<span className="ml-2 text-slate-600">${i.price}</span></span>
            <span className="flex items-center gap-2">
              <button type="button" aria-label={`Remove one ${i.label}`} onClick={() => set(i.id, -1)}
                className="h-11 w-11 rounded-lg border border-slate-300 text-lg font-semibold text-slate-800">−</button>
              <span className="w-6 text-center tabular-nums" aria-live="polite">{qty[i.id] ?? 0}</span>
              <button type="button" aria-label={`Add one ${i.label}`} onClick={() => set(i.id, 1, i.max)}
                className="h-11 w-11 rounded-lg border border-slate-300 text-lg font-semibold text-slate-800">+</button>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        <p aria-live="polite" className="text-lg font-bold text-slate-900">
          {total ? <>Your flat rate: <span className="text-emerald-700">${total}</span></> : "Select items to see your price"}
        </p>
        {total > 0 && (
          <div className="flex gap-2">
            <a href={`${business.smsHref}?&body=${body}`} className="rounded-lg bg-cta px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cta-hover">Text to lock in this price</a>
            <a href="/#quote" className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Book online</a>
          </div>
        )}
      </div>
    </section>
  );
}
