"use client";

import { useId, useState } from "react";
import { IconToggle } from "@/components/ds";
import { faq } from "@/content/home";

/**
 * Figma: FAQ — desktop 256:68670 (pt 140, px 40; list pt 40; item border-t default, py 28, gap 12;
 * question Heading/H5); mobile 322:6080 (pt 72, px 20; title Heading/H2; list pt 24; item py 20;
 * question Body/L (20), icon aligned to the top of the first line).
 * Each question is a full-width <button aria-expanded aria-controls> with Icon / Toggle (327:13).
 * Initial state as in the layout: the first two items open. No animation — the answer just shows/hides.
 * Items 3–4 have no answer in Figma yet: their button toggles only the icon state.
 */
export function Faq() {
  const [open, setOpen] = useState<boolean[]>(() => faq.items.map((item) => Boolean(item.a)));
  const base = useId();

  return (
    <section className="flex w-full flex-col items-start px-20 pt-72 md:px-32 lg:px-40 lg:pt-section">
      <h2 className="w-full text-text-primary heading-h2 lg:whitespace-nowrap lg:numeral-l">{faq.title}</h2>
      <div className="flex w-full flex-col items-start pt-24 lg:pt-40">
        {faq.items.map((item, i) => {
          const panelId = `${base}-faq-${i}`;
          const isOpen = open[i];
          return (
            <div key={item.q} className="flex w-full flex-col items-start gap-12 border-t border-border-default py-20 lg:py-28">
              <h3 className="w-full">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={item.a ? panelId : undefined}
                  onClick={() => setOpen((prev) => prev.map((v, k) => (k === i ? !v : v)))}
                  // -my-8 / py-8: the tap area grows to ≥ 44px without moving the layout.
                  className="-my-8 flex w-full items-start justify-between py-8 text-left text-text-primary"
                >
                  <span className="min-w-0 flex-1 body-l lg:heading-h5">{item.q}</span>
                  {/* Desktop keeps the row height of the old «+ / —» glyph line (Body/XL line box). */}
                  <span className="flex shrink-0 lg:block lg:body-xl">
                    <IconToggle open={isOpen} className="lg:inline-block lg:align-middle" />
                  </span>
                </button>
              </h3>
              {item.a && (
                <p id={panelId} hidden={!isOpen} className="w-full text-text-secondary body-m-small">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
