import { SectionLabel } from "@/components/ui/SectionLabel";
import { manifesto } from "@/content/home";

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-label" className="flex flex-col gap-8 px-gutter pt-section-lg">
      <SectionLabel as="h2" id="manifesto-label">
        {manifesto.label}
      </SectionLabel>
      <p data-split className="text-manifesto font-medium tracking-snug">
        {manifesto.text}
      </p>
    </section>
  );
}
