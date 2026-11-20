"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrent, navLinks } from "@/lib/config";
import { cn } from "@/lib/cn";

/**
 * Figma: Nav / Mobile (328:16), used below 1024.
 * - State=Top (scrollY ≤ 76): full width, color/bg/page, px 20 / py 16, wordmark + 44 × 44 menu button.
 * - State=Scrolled: compact pill centred 12 from the top — hug width, gap 48, padding 4 / 6 / 4 / 20,
 *   radius/full, .glass (color/bg/glass 80% + blur 16, shadow; solid glass without backdrop-filter).
 * The header is fixed; a 76px sentinel in the flow reserves its space (no layout shift) and an
 * IntersectionObserver on it switches the state — no scroll listener. No transition (iteration rule).
 * Menu (no Figma frame yet — interim, 2026-11-20): the button opens a full-screen panel (bg/page) under the header
 * with the main links from lib/config.ts (navLinks) in Heading/H2, gap 16, page padding; the current page gets
 * aria-current. Closes on a link, the button, Escape or a route change; page scroll is locked while open.
 * Icon: two lines → × (stroke 1.5). No animation.
 */
export function NavMobile({ className }: { className?: string }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // The page the menu was opened on; a route change (a link, the back button) closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const toggle = () => setOpenOn(isOpen ? null : pathname);

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
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={toggle}
            className="flex size-hit shrink-0 items-center justify-center text-text-primary"
          >
            {/* Figma icon/menu: 24 × 24, two lines, stroke 1.5; open → × */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={isOpen ? "M6 6L18 18M18 6L6 18" : "M3 8H21M3 16H21"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="fixed inset-0 z-30 flex flex-col bg-bg-page px-20 pt-nav-mobile md:px-32"
        >
          <ul className="flex flex-col items-start gap-16 pt-40">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpenOn(null)}
                  aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                  className="text-text-primary heading-h2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
