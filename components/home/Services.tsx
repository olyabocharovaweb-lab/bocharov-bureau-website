import { ServiceList } from "@/components/home/ServiceList";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/content/home";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="flex flex-col gap-12 px-gutter pt-section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="services-title" data-split className="text-h-lg font-semibold tracking-display">
          {services.title}
        </h2>
        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
          <SectionLabel>{services.label}</SectionLabel>
          <ButtonLink href="#brief">{services.cta}</ButtonLink>
        </div>
      </div>

      <ServiceList items={services.items} />
    </section>
  );
}
