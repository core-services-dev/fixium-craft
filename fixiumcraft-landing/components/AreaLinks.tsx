import Link from "next/link";
import { readyAreasFor } from "./areasData";

// AreaLinks.tsx — "Areas we serve" links on a service page. Renders nothing until at least one
// neighborhood page for this service is marked ready in areasData.ts.
export default function AreaLinks({ serviceSlug }: { serviceSlug: string }) {
  const areas = readyAreasFor(serviceSlug);
  if (!areas.length) return null;
  return (
    <section aria-labelledby="area-links-heading">
      <h2 id="area-links-heading" className="text-xl font-bold sm:text-2xl">Neighborhoods we serve</h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-blue-800">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/areas/${a.slug}`} className="hover:underline">{a.h1 ?? a.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
