"use client";

// BrandLink.jsx
//
// Logo + brand name, linking to the homepage root ("/"). On the homepage
// itself a plain <Link href="/"> would only drop the hash or do nothing, so
// the click handler smooth-scrolls to the very top and clears any hash/query
// (e.g. #quote) from the URL. From any other page it is a normal client-side
// navigation to "/" (which opens at the top). Modified clicks (new tab etc.)
// are left to the browser.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "./contentData";

export default function BrandLink({
  className = "",
  onNavigate = /** @type {(() => void) | undefined} */ (undefined),
}) {
  const pathname = usePathname();

  function handleClick(e) {
    if (onNavigate) onNavigate();
    if (pathname !== "/") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (window.location.hash || window.location.search) {
      window.history.replaceState(null, "", "/");
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <Link href="/" onClick={handleClick} aria-label={`${business.name} home`} className={className}>
      <Image
        src="/logo-icon.png"
        alt=""
        width={44}
        height={44}
        priority
        className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
      />
      <span className="leading-none">{business.name}</span>
    </Link>
  );
}
