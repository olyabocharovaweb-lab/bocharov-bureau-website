import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Placeholder page sharing the site chrome; replaced as each page is designed. */
export function StubPage({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="flex min-h-[60vh] flex-col gap-8 px-gutter pt-12 md:pt-[72px]">
      <SectionLabel>{`( ${label} )`}</SectionLabel>
      <h1 data-split className="text-h-lg font-semibold tracking-display">
        {title}
      </h1>
      {children}
      <p className="text-lead text-muted">This page is in progress.</p>
      <div>
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  );
}
