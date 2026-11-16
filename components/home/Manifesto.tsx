import { manifesto } from "@/content/home";

/**
 * Figma: Manifesto (256:68196) — pt 160, px 40, gap 32, Heading/H1 Large.
 * Second span is #9B9B9B in Figma (no variable) → color/text/tertiary (see ds-gaps).
 */
export function Manifesto() {
  return (
    <section className="flex w-full flex-col items-start gap-32 px-40 pt-160">
      <p className="whitespace-nowrap text-text-secondary mono-label">{manifesto.label}</p>
      <p className="w-full heading-h1-large">
        <span className="text-text-primary">{manifesto.lead}</span>
        <span className="text-text-tertiary">{manifesto.rest}</span>
      </p>
    </section>
  );
}
