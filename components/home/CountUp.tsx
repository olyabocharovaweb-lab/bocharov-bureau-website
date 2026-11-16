"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  /** Final number, e.g. 700, 5, 93 */
  to: number;
  /** Digits after the decimal point, e.g. 1 for «5.0» */
  decimals?: number;
  /** Text after the number, e.g. «+» or «%» */
  suffix?: string;
  /** Duration in ms */
  duration?: number;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `to` once, when the number scrolls into view.
 * The final value is reserved invisibly in the same grid cell, so the card never
 * changes width while counting. SSR / no JS / reduced motion → final value straight away.
 */
export function CountUp({ to, decimals = 0, suffix = "", duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const num = numRef.current;
    if (!el || !num) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) => n.toFixed(decimals) + suffix;
    let frame = 0;
    let started = false;
    // Start from 0 and wait until the number is in view (the text is written straight to the DOM).
    num.textContent = format(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          num.textContent = format(to * easeOutCubic(t));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, decimals, suffix, duration]);

  const finalText = to.toFixed(decimals) + suffix;

  return (
    <span ref={ref} className={`inline-grid ${className ?? ""}`} aria-label={finalText}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {finalText}
      </span>
      <span ref={numRef} aria-hidden="true" className="col-start-1 row-start-1">
        {finalText}
      </span>
    </span>
  );
}
