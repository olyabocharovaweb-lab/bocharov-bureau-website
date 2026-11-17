import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Figma variant `Spacing`: Section = 180 top padding, Subsection = 120. */
export type SectionIntroSpacing = "Section" | "Subsection";

export type SectionIntroProps = {
  /** Figma text property `Label` (whitespace preserved, e.g. "/ 1   Section") */
  label?: string;
  /** Figma text property `Body` */
  body?: ReactNode;
  /** Figma variant `Spacing` */
  spacing?: SectionIntroSpacing;
  /** Extra content under the body (body column has gap 28 in Figma) */
  children?: ReactNode;
  className?: string;
};

/**
 * Figma: Section intro (260:96) — desktop: label column 560 + body column (fill), gap 24, px 40.
 * Mobile «Section intro — mobile» (331:6442): label above the body, gap 16, pt 72 for both spacings, px 20
 * (32 on tablet).
 */
export function SectionIntro({ label = "/ 1   Section", body = "Body copy", spacing = "Section", children, className }: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-start gap-16 px-20 pt-72 md:px-32 lg:flex-row lg:gap-24 lg:px-40",
        spacing === "Section" ? "lg:pt-180" : "lg:pt-120",
        className,
      )}
    >
      <div className="flex w-full flex-col items-start lg:w-intro-label lg:shrink-0">
        <p className="whitespace-pre text-text-secondary mono-label">{label}</p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-28">
        <div className="w-full text-text-primary body-l">{body}</div>
        {children}
      </div>
    </div>
  );
}
