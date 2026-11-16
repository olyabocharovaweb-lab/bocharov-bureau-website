"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Links are not clickable in iteration 1 (decision 2026-11-13). */
type FooterLink = { label: string };

const columns: Array<{ title: string; links: FooterLink[] }> = [
  { title: "Social", links: [{ label: "Instagram" }, { label: "LinkedIn" }, { label: "Behance" }, { label: "Clutch" }] },
  {
    title: "Studio",
    links: [{ label: "Work" }, { label: "Services" }, { label: "AI Lab" }, { label: "Journal" }],
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

  return (
    <footer
      ref={ref}
      data-surface="light"
      className={cn(
        "footer-scroll flex min-h-svh w-full flex-col items-start justify-between gap-40 px-40 pt-72 pb-40",
        className,
      )}
    >
      <div className="flex w-full items-start gap-40">
        {columns.map((col) => (
          <div key={col.title} className="flex min-w-0 flex-1 flex-col items-start gap-10">
            <p className="footer-muted mono-label">{col.title}</p>
            {col.links.map((l) => (
              <p key={l.label} className="footer-ink body-base">
                {l.label}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-start gap-40">
        <p className="footer-ink w-full display-wordmark">Bocharov®</p>
        {/* data-cta-avoid: the floating «Book a call» hides when this row reaches it. */}
        <div data-cta-avoid="" className="footer-muted flex w-full items-start justify-between mono-body">
          <p>© 2026 Bocharov. All rights reserved.</p>
          <p>Privacy · Terms</p>
        </div>
      </div>
    </footer>
  );
}
