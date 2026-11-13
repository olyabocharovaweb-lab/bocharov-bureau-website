import { cn } from "@/lib/cn";

export type TagProps = {
  /** Figma text property `Label` */
  label?: string;
  className?: string;
};

/** Figma: Tag (260:36) — pill, 1px border/strong, px 14, py 7 (gap → 6), Body/2XS. */
export function Tag({ label = "Product strategy", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-start whitespace-nowrap rounded-full border border-border-strong px-14 py-6 text-text-primary body-2xs",
        className,
      )}
    >
      {label}
    </span>
  );
}
