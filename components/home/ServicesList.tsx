"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Tag } from "@/components/ds";
import { playHoverTick } from "@/lib/hover-sound";
import { cn } from "@/lib/cn";

/** Figma «Photo U1» rotation −3° (Figma is counter-clockwise positive) → CSS +3deg. */
const BASE_TILT = 3;

export type ServiceItem = { letter: string; title: string; body: string; tags: string[]; photo: string };

/**
 * Figma: «Services list» (312:5004) — rows flush, px 24 / py 40, radius/lg, transparent;
 * label column 560, gap 260, copy column fill (540). Divider = .service-row::before
 * (globals.css). Hover: row → color/bg/surface, its own and the next row's divider hidden
 * (no transition). The row's photo appears and follows the cursor, and a soft tick plays. Photo frame per Figma «Photo U1» (307:8638): 220 × 290, tilted 3° clockwise
 * (Figma rotation −3°); movement adds a little extra tilt. Only on devices with a real
 * pointer; with reduced motion the photo is shown without following/tilting.
 */
export function ServicesList({ items }: { items: ServiceItem[] }) {
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Desktop layout with a real pointer only — no hover photo on touch / mobile.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cursor follow: target = pointer, shown eases toward it; tilt from horizontal speed.
  useEffect(() => {
    if (!enabled) return;
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0, ty = 0, x = 0, y = 0, rot = BASE_TILT, frame = 0, primed = false;

    const tick = () => {
      const k = still ? 1 : 0.16;
      const dx = tx - x;
      x += dx * k;
      y += (ty - y) * k;
      const targetRot = BASE_TILT + (still ? 0 : Math.max(-8, Math.min(8, dx * 0.12)));
      rot += (targetRot - rot) * 0.14;
      float.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(rot - BASE_TILT) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!primed) {
        x = tx;
        y = ty;
        primed = true;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      primed = false;
    };
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  const enter = (i: number) => {
    if (!enabled) return;
    setActive(i);
    playHoverTick();
  };

  return (
    // «Services list» (312:5004): 24 wider than the content on each side, rows flush (no gap).
    // Mobile (322:5657): content width, rows stacked; desktop: 24 wider each side.
    <div
      ref={listRef}
      className="relative flex flex-col items-stretch self-stretch lg:-mx-24"
      onPointerLeave={() => setActive(-1)}
    >
      {items.map((s, i) => (
        // Whole row is one link (service pages don't exist yet → anchor to itself as a stub).
        // Mobile (322:5658): py 24, gap 16, letter + Heading/H5 on a baseline; desktop: two columns.
        <a
          key={s.title}
          id={`service-${s.letter.charAt(0).toLowerCase()}`}
          href={`#service-${s.letter.charAt(0).toLowerCase()}`}
          onPointerEnter={() => enter(i)}
          className="service-row relative flex flex-col items-start gap-16 py-24 lg:flex-row lg:gap-service-gap lg:rounded-lg lg:px-24 lg:py-40"
        >
          <div className="flex w-full items-baseline gap-12 lg:w-intro-label lg:shrink-0 lg:items-start lg:gap-24">
            <p className="whitespace-nowrap text-text-secondary mono-body-l">{s.letter}</p>
            <h3 className="min-w-0 flex-1 text-text-primary heading-h5 lg:heading-h3">{s.title}</h3>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-20">
            <p className="w-full text-text-secondary body-m">{s.body}</p>
            <div className="flex w-full flex-wrap items-start gap-8">
              {s.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        </a>
      ))}

      {/* Floating photo that follows the cursor */}
      {enabled && (
        <div ref={floatRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-10 w-hover-photo">
          <div
            className={cn(
              "relative aspect-hover-photo w-full scale-90 overflow-hidden rounded-sm opacity-0 transition",
              active >= 0 && "scale-100 opacity-100",
            )}
          >
            {items.map((s, i) => (
              <Image
                key={s.title}
                src={s.photo}
                alt=""
                fill
                sizes="220px"
                className={cn("object-cover transition-opacity", active === i ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
