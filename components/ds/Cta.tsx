import { cn } from "@/lib/cn";
import { Button } from "./Button";

export type CtaProps = {
  /** Figma text property `Heading` (line breaks preserved) */
  heading?: string;
  className?: string;
};

/** Figma: CTA (260:107) — pt 160, px 40, Display/M heading, Primary + Secondary buttons. */
export function Cta({ heading = "Building an\nAI product?", className }: CtaProps) {
  return (
    <section className={cn("flex w-full items-end justify-between px-40 pt-160", className)}>
      <h2 className="whitespace-pre-line text-text-primary display-m">{heading}</h2>
      <div className="flex shrink-0 flex-col items-end gap-10">
        <div className="flex items-start gap-10">
          <Button variant="Primary" label="Start a project" />
          <Button variant="Secondary" label="Book a 30-min call" />
        </div>
        <p className="whitespace-nowrap text-text-secondary body-2xs">First concepts in 5 days · reply within 24 h</p>
      </div>
    </section>
  );
}
