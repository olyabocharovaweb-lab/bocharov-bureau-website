import { Button } from "@/components/ds";
import { services } from "@/content/home";
import { ServicesList } from "./ServicesList";

/** Figma: Services (256:68199) — pt 140, px 40, gap 48; rows in ServicesList (hover photo). */
export function Services() {
  return (
    <section className="flex w-full flex-col items-start gap-48 px-40 pt-section">
      <div className="flex w-full items-end justify-between">
        <h2 className="whitespace-nowrap text-text-primary display-s">{services.title}</h2>
        <div className="flex flex-col items-end gap-16">
          <p className="whitespace-nowrap text-text-secondary mono-label">{services.label}</p>
          <Button variant="Secondary" label={services.cta} />
        </div>
      </div>
      <ServicesList items={services.items} />
    </section>
  );
}
