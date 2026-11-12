import { SectionLabel } from "@/components/ui/SectionLabel";
import { industries } from "@/content/home";

export function Industries() {
  return (
    <section aria-labelledby="industries-label" className="flex flex-col gap-6 px-gutter pt-section">
      <SectionLabel as="h2" id="industries-label">
        {industries.label}
      </SectionLabel>
      <p data-split className="text-industries font-medium tracking-snug">
        {industries.items.join(" / ")}
      </p>
    </section>
  );
}
