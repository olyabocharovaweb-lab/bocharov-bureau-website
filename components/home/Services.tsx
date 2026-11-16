import { Button, Tag } from "@/components/ds";
import { services } from "@/content/home";

/** Figma: Services (256:68199) — pt 140, px 40, gap 48; rows border-t default, py 32, gap 40. */
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
      <div className="flex w-full flex-col items-start gap-48">
        {services.items.map((s) => (
          <div key={s.title} className="flex w-full items-start gap-40 border-t border-border-default py-32">
            <div className="flex w-intro-label shrink-0 items-start gap-24">
              <p className="whitespace-nowrap text-text-secondary mono-body-l">{s.letter}</p>
              <h3 className="min-w-0 flex-1 text-text-primary heading-h3">{s.title}</h3>
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-20">
              <p className="w-full text-text-secondary body-m">{s.body}</p>
              <div className="flex w-full flex-wrap items-start gap-8">
                {s.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
