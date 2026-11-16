import { process } from "@/content/home";

/** Figma: Process (256:68589) — pt 140, px 40, gap 48; steps gap 12, border-t inverse, pt 24, gap 14. */
export function Process() {
  return (
    <section className="flex w-full flex-col items-start gap-48 px-40 pt-section">
      <h2 className="whitespace-nowrap text-text-primary display-s">{process.title}</h2>
      <div className="flex w-full items-stretch gap-12">
        {process.steps.map((s) => (
          <div key={s.number} className="flex min-w-0 flex-1 flex-col items-start gap-14 border-t border-border-inverse pt-24">
            <p className="whitespace-nowrap text-text-secondary mono-body-m">{s.number}</p>
            <h3 className="w-full text-text-primary heading-h4-small">{s.title}</h3>
            <p className="w-full text-text-secondary body-base">{s.body}</p>
            <p className="w-full text-text-primary mono-body">{s.ai}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
