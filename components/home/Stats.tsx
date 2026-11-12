import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats } from "@/content/home";

/** Hidden by `siteConfig.flags.showStats` until the XX placeholders are replaced. */
export function Stats() {
  return (
    <section aria-labelledby="stats-label" className="flex flex-col gap-12 px-gutter pt-section">
      <SectionLabel as="h2" id="stats-label">
        {stats.label}
      </SectionLabel>
      <ul className="grid gap-grid md:grid-cols-3">
        {stats.items.map((s) => (
          <li
            key={s.title}
            data-reveal="fade"
            className="flex flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-7"
          >
            <p className="text-stat font-semibold tracking-stat" data-count>
              {s.value}
            </p>
            <h3 className="text-lead leading-[1.21] font-medium">{s.title}</h3>
            <p className="text-small text-muted">{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
