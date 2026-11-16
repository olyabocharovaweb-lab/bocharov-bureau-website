import { industries } from "@/content/home";

/** Figma: Industries (256:68634) — pt 140, px 40, gap 24, Heading/H1. */
export function Industries() {
  return (
    <section className="flex w-full flex-col items-start gap-24 px-40 pt-section">
      <p className="whitespace-nowrap text-text-secondary mono-label">{industries.label}</p>
      <p className="w-full text-text-primary heading-h1">{industries.text}</p>
    </section>
  );
}
