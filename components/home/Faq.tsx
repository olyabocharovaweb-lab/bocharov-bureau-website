"use client";

import { useId, useState } from "react";
import { faq } from "@/content/home";

export function Faq() {
  const items = faq.items.filter((i): i is { question: string; answer: string } => Boolean(i.answer));
  // As in Figma: answered items start expanded.
  const [open, setOpen] = useState<Set<number>>(() => new Set(items.map((_, i) => i)));
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section aria-labelledby="faq-title" className="flex flex-col px-gutter pt-section">
      <h2 id="faq-title" data-split className="text-h-md font-semibold tracking-tight">
        {faq.title}
      </h2>
      <ul className="pt-10">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li key={item.question} className="border-t border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex w-full items-start justify-between gap-6 py-7 text-left text-faq font-medium tracking-soft"
                >
                  <span>{item.question}</span>
                  <span aria-hidden className="relative mt-[0.55em] block h-px w-[0.9em] shrink-0 bg-current">
                    <span
                      className="absolute inset-0 bg-current transition-transform duration-500 ease-out-expo"
                      style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className="grid transition-[grid-template-rows,margin] duration-600 ease-out-expo"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", marginTop: isOpen ? -16 : 0 }}
              >
                <div className="overflow-hidden">
                  <p className="pb-7 text-quote leading-[1.5] text-muted">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
