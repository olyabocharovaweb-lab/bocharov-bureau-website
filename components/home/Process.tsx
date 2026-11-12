import { process } from "@/content/home";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="flex flex-col gap-12 px-gutter pt-section">
      <h2 id="process-title" data-split className="text-h-lg font-semibold tracking-display">
        {process.title}
      </h2>
      <ol className="grid gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((s) => (
          <li
            key={s.index}
            data-reveal="line"
            className="relative flex flex-col gap-[14px] pt-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:bg-ink"
          >
            <span className="font-mono text-[13px] leading-[1.2] text-muted">{s.index}</span>
            <h3 className="text-step font-medium tracking-title">{s.title}</h3>
            <p className="text-body text-muted">{s.text}</p>
            <p className="font-mono text-mono leading-[1.5]">{s.ai}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
