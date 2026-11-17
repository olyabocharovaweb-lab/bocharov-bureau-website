import { industries } from "@/content/home";

/**
 * Figma: Industries — desktop 256:68634 (pt 140, px 40, gap 24, Heading/H1);
 * mobile 322:6057 (pt 72, px 20, gap 16, Heading/H5 Large, wraps).
 */
export function Industries() {
  return (
    <section className="flex w-full flex-col items-start gap-16 px-20 pt-72 md:px-32 lg:gap-24 lg:px-40 lg:pt-section">
      <p className="whitespace-nowrap text-text-secondary mono-label">{industries.label}</p>
      <p className="w-full text-text-primary heading-h5-large lg:heading-h1">{industries.text}</p>
    </section>
  );
}
