import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";
import { CaseCard } from "@/components/ui/CaseCard";
import { cases } from "@/content/cases";

export const metadata: Metadata = { title: "Work", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return (
    <StubPage label="Work" title="Work">
      <div className="grid gap-12 md:grid-cols-2 md:gap-grid">
        {cases.map((c, i) => (
          <CaseCard key={c.slug} item={{ ...c, layout: "half" }} index={i} />
        ))}
      </div>
    </StubPage>
  );
}
