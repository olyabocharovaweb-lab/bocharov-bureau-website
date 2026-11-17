import { cn } from "@/lib/cn";

export type MediaCaptionProps = {
  /** Figma text property `Caption` */
  caption?: string;
  /** Figma text property `Number` */
  number?: string;
  className?: string;
};

/** Figma: Media caption (260:44) — Mono/Caption, text/secondary, space-between. */
export function MediaCaption({
  caption = "Welcome · first conversation, animated",
  number = "07 — 08",
  className,
}: MediaCaptionProps) {
  return (
    <div className={cn("flex w-full items-start justify-between gap-4 text-text-secondary mono-caption", className)}>
      {/* Caption wraps on narrow screens; the number stays on its line. */}
      <p className="min-w-0">{caption}</p>
      <p className="shrink-0 whitespace-nowrap">{number}</p>
    </div>
  );
}
