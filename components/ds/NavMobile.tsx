"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Figma: Nav / Mobile (328:16), used below 1024.
 * - State=Top (scrollY ≤ 76): full width, color/bg/page, px 20 / py 16, wordmark + 44 × 44 menu button.
 * - State=Scrolled: compact pill centred 12 from the top — hug width, gap 48, padding 4 / 6 / 4 / 20,
 *   radius/full, .glass (color/bg/glass 80% + blur 16, shadow; solid glass without backdrop-filter).
 * The header is fixed; a 76px sentinel in the flow reserves its space (no layout shift) and an
 * IntersectionObserver on it switches the state — no scroll listener. No transition (iteration rule).
 * Menu: the button exists (aria-expanded="false"); the menu screen comes in a later iteration.
 */
export function NavMobile({ className }: { className?: string }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={className}>
      <div ref={sentinel} aria-hidden="true" className="h-nav-mobile" />
      <header
        data-state={scrolled ? "scrolled" : "top"}
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex h-nav-mobile",
          scrolled ? "items-start justify-center p-12" : "items-center bg-bg-page px-20 py-16 md:px-32",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            scrolled ? "glass gap-48 rounded-full py-4 pr-6 pl-20" : "w-full justify-between",
          )}
        >
          <Link href="/" className="whitespace-nowrap text-text-primary heading-h6 font-semibold">Bocharov®Bureau</Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            className="flex size-hit shrink-0 items-center justify-center text-text-primary"
          >
            {/* Figma icon/menu: 24 × 24, two lines, stroke 1.5 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 8H21M3 16H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
