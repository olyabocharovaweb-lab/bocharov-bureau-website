"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Only pages that exist are links (About → /about, 2026-11-19); the rest stay plain text for now. */
type FooterLink = { label: string; href?: string };

const columns: Array<{ title: string; links: FooterLink[] }> = [
  { title: "Social", links: [{ label: "Instagram" }, { label: "LinkedIn" }, { label: "Behance" }, { label: "Clutch" }] },
  {
    title: "Studio",
    links: [{ label: "Work" }, { label: "Services" }, { label: "About", href: "/about" }, { label: "AI Lab" }, { label: "Journal" }],
  },
  { title: "Contact", links: [{ label: "hello@[domain]" }, { label: "Europe / US" }] },
];

/**
 * Figma: Footer (260:33) — pb 40, px 40, gap 40; Display/Wordmark.
 * Decisions (not in Figma yet):
 * - 2026-11-16: fills the viewport (min-height 100svh) — columns at the top,
 *   wordmark + legal line pinned to the bottom.
 * - 2026-11-17: top padding 160 → 72 (columns sit higher); while the footer scrolls in,
 *   the fill follows the scroll from bg/page to bg/inverse (color-mix of the two tokens,
 *   JS writes --dark 0…1); at the halfway point the text flips text/primary → text/inverse
 *   (secondary → tertiary) via data-surface="dark" — a 700ms crossfade, not a jump — which also inverts the floating CTA.
 *   Reduced motion → stays light (Figma).
 */
export function Footer({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // 0 when the footer's top is at 75% of the viewport, 1 when it reaches 15%.
      const p = Math.min(1, Math.max(0, (vh * 0.75 - top) / (vh * 0.6)));
      el.style.setProperty("--dark", p.toFixed(3));
      const surface = p > 0.5 ? "dark" : "light";
      if (el.dataset.surface !== surface) el.dataset.surface = surface;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const backToTop = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
  };

  return (
    <footer ref={ref} data-surface="light" className={cn("footer-scroll w-full", className)}>
      {/*
        The fill spans the whole viewport width; the content is capped at the 1440 page container.
        Mobile / tablet (322:6139): always black (CSS), py 40 / px 20; Social + Studio side by side,
        Contact below (grid 2 cols, gap 32 / 20); links Body/L, step 12; bottom: legal + «Back to top»,
        then the wordmark (Display/Wordmark S). Desktop (260:33): unchanged.
      */}
      <div className="mx-auto flex min-h-svh w-full max-w-page flex-col items-start justify-between gap-40 px-20 py-40 md:px-32 lg:px-40 lg:pt-72 lg:pb-40">
        <div className="grid w-full grid-cols-2 gap-x-20 gap-y-32 lg:flex lg:items-start lg:gap-40">
          {columns.map((col) => (
            <div key={col.title} className="flex min-w-0 flex-col items-start gap-12 lg:flex-1 lg:gap-10">
              <p className="footer-muted mono-label">{col.title}</p>
              {col.links.map((l) =>
                l.href ? (
                  <Link key={l.label} href={l.href} className="footer-ink body-l lg:body-base">
                    {l.label}
                  </Link>
                ) : (
                  <p key={l.label} className="footer-ink body-l lg:body-base">
                    {l.label}
                  </p>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-start gap-24 lg:gap-40">
          <p className="footer-ink order-last w-full display-wordmark-s lg:order-none lg:display-wordmark">Bocharov®</p>
          {/* data-cta-avoid: the floating «Book a call» hides when this row reaches it. */}
          <div data-cta-avoid="" className="flex w-full items-end justify-between gap-20">
            <div className="footer-muted flex min-w-0 flex-1 flex-col items-start gap-0 mono-body lg:flex-row lg:justify-between">
              {/* Mobile (322:6159): «© 2026 Bocharov.» / «All rights reserved.» on two lines */}
              <p>
                © 2026 Bocharov.
                <br className="lg:hidden" /> All rights reserved.
              </p>
              <p>Privacy · Terms</p>
            </div>
            <button
              type="button"
              onClick={backToTop}
              className="footer-ink flex h-hit shrink-0 items-center gap-6 body-l lg:hidden"
            >
              Back to top
              {/* Figma icon/arrow-up 16 × 16, stroke 1.5 */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 13V3M12.5 7.5L8 3L3.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
