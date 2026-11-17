"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type RevealSegment = { text: string; className?: string };

type RevealTextProps = {
  segments: RevealSegment[];
  className?: string;
  /** How many characters the soft leading edge spans. */
  fade?: number;
};

/**
 * Scroll-linked text reveal: characters appear one after another while the block
 * scrolls through the viewport, with a soft gradient on the leading edge.
 *
 * No animation library and no CSS transitions: JS writes one custom property
 * (--reveal, 0…1) on the container, and every character computes its own opacity
 * from it in CSS. Without JS, or with prefers-reduced-motion, the text is fully shown.
 */
export function RevealText({ segments, className, fade = 64 }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  // Characters, grouped by word so words never break in the middle.
  let index = 0;
  const words: Array<{ chars: Array<{ ch: string; i: number }>; className?: string; space: boolean }> = [];
  for (const seg of segments) {
    const parts = seg.text.split(/(\s+)/);
    for (const part of parts) {
      if (part === "") continue;
      if (/^\s+$/.test(part)) {
        words.push({ chars: [{ ch: " ", i: index++ }], className: seg.className, space: true });
      } else {
        words.push({ chars: [...part].map((ch) => ({ ch, i: index++ })), className: seg.className, space: false });
      }
    }
  }
  const total = index;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Target follows scroll; the shown value eases toward it every frame (smooth catch-up).
    let target = 0;
    let shown = 0;
    let frame = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // No pin: the reveal uses the whole natural pass of the text through the viewport —
      // 0 when its top enters at the bottom edge, 1 when its bottom reaches 30% from the top.
      const start = vh;
      const end = vh * 0.3;
      const travel = start - end + rect.height;
      target = Math.min(1, Math.max(0, (start - rect.top) / travel));
    };
    const tick = () => {
      shown += (target - shown) * 0.06;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      el.style.setProperty("--reveal", shown.toFixed(4));
      frame = shown === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    measure();
    shown = target;
    el.style.setProperty("--reveal", shown.toFixed(4));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p
      ref={ref}
      className={className}
      // Fully revealed by default (SSR, no JS, reduced motion).
      style={{ ["--reveal" as string]: 1, ["--reveal-total" as string]: total + fade, ["--reveal-fade" as string]: fade }}
    >
      {/* Screen readers get the sentence once (aria-label is not allowed on <p>). */}
      <span className="sr-only">{segments.map((s) => s.text).join("")}</span>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true" className={cn(!w.space && "whitespace-nowrap", w.className)}>
          {w.chars.map(({ ch, i }) => (
            <span key={i} className="reveal-char" style={{ ["--i" as string]: i }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
