import { process } from "@/content/home";

/**
 * Figma: Process — desktop 256:68589 (pt 140, px 40, gap 48; 4 steps in a row, gap 12);
 * mobile 322:6012 (pt 72, px 20, gap 32; steps stacked gap 32, title Heading/H5). Tablet: 2 columns.
 * Step: border-t inverse, pt 24, gap 14.
 */
export function Process() {
  return (
    <section className="flex w-full flex-col items-start gap-32 px-20 pt-72 md:px-32 lg:gap-48 lg:px-40 lg:pt-section">
      <h2 className="text-text-primary heading-h2 lg:whitespace-nowrap lg:display-s">{process.title}</h2>
      <div className="grid w-full grid-cols-1 gap-32 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4 lg:gap-12">
        {process.steps.map((s) => (
          <div key={s.number} className="flex min-w-0 flex-col items-start gap-14 border-t border-border-inverse pt-24">
            <p className="whitespace-nowrap text-text-secondary mono-body-m">{s.number}</p>
            <h3 className="w-full text-text-primary heading-h5 lg:heading-h4-small">{s.title}</h3>
            <p className="w-full text-text-secondary body-base">{s.body}</p>
            <p className="w-full text-text-primary mono-body">{s.ai}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
