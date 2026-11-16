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
export function RevealText({ segments, className, fade = 14 }: RevealTextProps) {
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

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the text's top reaches 85% of the viewport,
      // 1 when the text's bottom reaches 55% of the viewport.
      const start = vh * 0.85;
      const end = vh * 0.55;
      const travel = start - end + rect.height;
      const p = Math.min(1, Math.max(0, (start - rect.top) / travel));
      el.style.setProperty("--reveal", p.toFixed(4));
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
    <p
      ref={ref}
      className={className}
      // Fully revealed by default (SSR, no JS, reduced motion).
      style={{ ["--reveal" as string]: 1, ["--reveal-total" as string]: total + fade, ["--reveal-fade" as string]: fade }}
      aria-label={segments.map((s) => s.text).join("")}
    >
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
