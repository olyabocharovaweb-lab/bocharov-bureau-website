import { ButtonLink } from "@/components/ui/Button";
import { CaseCard } from "@/components/ui/CaseCard";
import { cases, type CaseStudy } from "@/content/cases";
import { selectedWork } from "@/content/home";

/** Groups consecutive "half" cards into rows of two, keeps "wide" cards on their own row. */
function toRows(list: CaseStudy[]) {
  const rows: CaseStudy[][] = [];
  for (const item of list) {
    const last = rows.at(-1);
    if (item.layout === "half" && last && last[0].layout === "half" && last.length < 2) {
      last.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}

export function SelectedWork() {
  let index = 0;
  return (
    <section id="work" aria-labelledby="work-title" className="flex flex-col gap-12 px-gutter pt-section">
      <div className="flex items-end justify-between gap-6">
        <h2 id="work-title" data-split className="text-h-lg font-semibold tracking-display">
          {selectedWork.title}
        </h2>
        <ButtonLink href="/work" className="mb-1">
          {selectedWork.cta}
        </ButtonLink>
      </div>

      <div className="flex flex-col gap-12">
        {toRows(cases).map((row) => (
          <div key={row[0].slug} className={row.length > 1 ? "grid gap-12 md:grid-cols-2 md:gap-grid" : ""}>
            {row.map((item) => (
              <CaseCard key={item.slug} item={item} index={index++} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
