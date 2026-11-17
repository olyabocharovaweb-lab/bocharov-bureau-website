import { cn } from "@/lib/cn";
import { Button } from "./Button";

export type CtaProps = {
  /** Figma text property `Heading` (line breaks preserved) */
  heading?: string;
  className?: string;
};

/**
 * Figma: CTA (260:107) — desktop: pt 160, px 40, Display/M heading, Primary + Secondary buttons on the right.
 * Mobile «CTA — mobile» (331:6477): pt 72, px 20, gap 40; heading Heading/H2; buttons full width stacked
 * (gap 12), then the note on the left (gap 16).
 */
export function Cta({ heading = "Building an\nAI product?", className }: CtaProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-stretch gap-40 px-20 pt-72 md:px-32 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-40 lg:pt-160",
        className,
      )}
    >
      <h2 className="whitespace-pre-line text-text-primary heading-h2 lg:display-m">{heading}</h2>
      <div className="flex w-full flex-col items-start gap-16 lg:w-auto lg:shrink-0 lg:items-end lg:gap-10">
        <div className="flex w-full flex-col items-stretch gap-12 lg:w-auto lg:flex-row lg:items-start lg:gap-10">
          <Button variant="Primary" label="Start a project" className="justify-center lg:justify-start" />
          <Button variant="Secondary" label="Book a 30-min call" className="justify-center lg:justify-start" />
        </div>
        <p className="text-text-secondary body-2xs lg:whitespace-nowrap">First concepts in 5 days · reply within 24 h</p>
      </div>
    </section>
  );
}
