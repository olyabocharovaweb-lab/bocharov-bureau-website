import { Button } from "@/components/ds";
import { services } from "@/content/home";
import { ServicesList } from "./ServicesList";

/**
 * Figma: Services — desktop 256:68199 (pt 140, px 40, gap 48); mobile 322:5651 (pt 72, px 20, gap 32;
 * title Heading/H2, then label + button stacked). Rows in ServicesList (hover photo on desktop only).
 */
export function Services() {
  return (
    <section className="flex w-full flex-col items-start gap-32 px-20 pt-72 md:px-32 lg:gap-48 lg:px-40 lg:pt-section">
      <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-text-primary heading-h2 lg:whitespace-nowrap lg:display-s">{services.title}</h2>
        <div className="flex flex-col items-start gap-16 lg:items-end">
          <p className="whitespace-nowrap text-text-secondary mono-label">{services.label}</p>
          <Button variant="Secondary" label={services.cta} />
        </div>
      </div>
      <ServicesList items={services.items} />
    </section>
  );
}
