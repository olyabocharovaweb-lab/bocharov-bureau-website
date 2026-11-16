import { numbers } from "@/content/home";
import { CountUp } from "./CountUp";

/**
 * Figma: In numbers (256:68281) — pt 140, px 40, gap 48; three cards gap 12.
 * Cards are frames, not «Stat card» instances (Display/M, H6, Body/S, gap 20).
 * Card fill = color/bg/surface (neutral/50).
 * Motion (client request 2026-11-17, Figma Motion note «лічильники від 0»): numbers count up from 0 once in view.
 */
export function InNumbers() {
  return (
    <section className="flex w-full flex-col items-start gap-48 px-40 pt-section">
      <p className="whitespace-nowrap text-text-secondary mono-label">{numbers.label}</p>
      <div className="flex w-full items-stretch gap-12">
        {numbers.items.map((n) => (
          <div key={n.label} className="flex min-w-0 flex-1 flex-col items-start gap-20 rounded-md bg-bg-surface p-28">
            <p className="w-full text-text-primary display-m">
              <CountUp to={n.to} decimals={n.decimals} suffix={n.suffix} />
            </p>
            <p className="w-full text-text-primary heading-h6">{n.label}</p>
            <p className="w-full text-text-secondary body-s">{n.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
