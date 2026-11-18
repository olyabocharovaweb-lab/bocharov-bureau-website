"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { NavMobile } from "./NavMobile";

/** Links are not clickable in iteration 1 (decision 2026-11-13). */
const links = ["Work", "Services", "Awards", "Contact"];

function Links() {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-start gap-32 label-m">
        {links.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Figma: Nav (260:10) — px 40, py 30 (no token → space/28), space-between.
 * Wordmark: Inter Semi Bold 20 / -3% has no text style → Heading/H6 + semibold (approved, see ds-gaps).
 *
 * Desktop «scrolled» pill (client request 2026-11-17, no Figma frame — mirrors Nav / Mobile «Scrolled» 328:11):
 * once the header has scrolled out of view, a fixed pill appears centred 12 from the top — wordmark + links,
 * gap 72, padding 20 / 40 (client: taller and a bit wider), radius/full, .glass (bg/glass 80% + blur 16, shadow). The header itself stays in
 * the flow (no layout shift); an IntersectionObserver on it switches the pill — no scroll listener, no animation.
 */
export function Nav({ className }: { className?: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Below 1024: Nav / Mobile (328:16) */}
      <NavMobile className="lg:hidden" />
      <header
        ref={headerRef}
        className={cn("hidden w-full items-center justify-between px-40 py-28 text-text-primary lg:flex", className)}
      >
        <Link href="/" className="whitespace-nowrap heading-h6 font-semibold">Bocharov®Bureau</Link>
        <Links />
      </header>
      {scrolled && (
        <div className="fixed inset-x-0 top-0 z-40 hidden justify-center p-12 lg:flex">
          <div className="glass flex items-center gap-72 rounded-full px-40 py-20 text-text-primary">
            <Link href="/" className="whitespace-nowrap heading-h6 font-semibold">Bocharov®Bureau</Link>
            <Links />
          </div>
        </div>
      )}
    </>
  );
}
