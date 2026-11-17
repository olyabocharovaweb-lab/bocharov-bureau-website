import { manifesto } from "@/content/home";
import { RevealText } from "./RevealText";

/**
 * Figma: Manifesto (256:68196) — pt 160, px 40, gap 32, Heading/H1 Large.
 * Decision 2026-11-16: whole sentence in color/text/primary (Figma has the second half grey),
 * characters reveal with scroll, soft leading edge.
 */
export function Manifesto() {
  return (
    // Mobile 322:5648: pt 72, px 20, gap 20, Heading/H5 Large (28). Desktop: pt 160, px 40, gap 32, Heading/H1 Large.
    <section className="flex w-full flex-col items-start gap-20 px-20 pt-72 md:px-32 lg:gap-32 lg:px-40 lg:pt-160">
      <p className="whitespace-nowrap text-text-secondary mono-label">{manifesto.label}</p>
      <RevealText
        className="w-full heading-h5-large lg:heading-h1-large"
        segments={[
          { text: manifesto.lead, className: "text-text-primary" },
          { text: manifesto.rest, className: "text-text-primary" },
        ]}
      />
    </section>
  );
}
