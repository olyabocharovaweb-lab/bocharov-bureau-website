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
    <div className={cn("flex w-full items-start justify-between text-text-secondary mono-caption", className)}>
      <p>{caption}</p>
      <p className="whitespace-nowrap">{number}</p>
    </div>
  );
}
