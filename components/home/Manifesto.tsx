import { manifesto } from "@/content/home";
import { RevealText } from "./RevealText";

/**
 * Figma: Manifesto (256:68196) — px 40, gap 32, Heading/H1 Large.
 * Decisions 2026-11-16 (client, ref. outcrowd.io):
 * - whole sentence in color/text/primary (Figma has the second half grey);
 * - the block pins (sticky, centred in the viewport) while a spacer of
 *   --spacing-manifesto-track scrolls past; the text reveals over that long scroll.
 *   Centring replaces Figma's pt 160. Reduced motion → no pin, no spacer, pt 160 as Figma.
 */
export function Manifesto() {
  return (
    <section data-reveal-track="" className="relative w-full">
      <div className="flex w-full flex-col items-start gap-32 px-40 pt-160 motion-safe:sticky motion-safe:top-0 motion-safe:min-h-svh motion-safe:justify-center motion-safe:pt-0">
        <p className="whitespace-nowrap text-text-secondary mono-label">{manifesto.label}</p>
        <RevealText
          className="w-full heading-h1-large"
          segments={[
            { text: manifesto.lead, className: "text-text-primary" },
            { text: manifesto.rest, className: "text-text-primary" },
          ]}
        />
      </div>
      <div aria-hidden="true" className="hidden h-manifesto-track motion-safe:block" />
    </section>
  );
}
