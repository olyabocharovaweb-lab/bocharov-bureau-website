import { cn } from "@/lib/cn";

export type StatCardProps = {
  /** Figma text property `Value` */
  value?: string;
  /** Figma text property `Label` */
  label?: string;
  /** Figma text property `Note` */
  note?: string;
  className?: string;
};

/**
 * Figma: Stat card (260:49) — bg/surface, p 28, gap 14, radius/md, value Display/S.
 * Mobile / tablet (331:6331): p 20, value Numeral/M (36). 1024–1439 keeps Numeral/M too: four cards in a row are
 * too narrow there for Display/S values like «128 px» (IndustryLens). Label wraps below 1024.
 */
export function StatCard({
  value = "160+",
  label = "Screens",
  note = "23 core screens, every state, light & dark",
  className,
}: StatCardProps) {
  return (
    <div className={cn("flex flex-col items-start gap-14 rounded-md bg-bg-surface p-20 lg:p-28", className)}>
      <p className="whitespace-nowrap text-text-primary numeral-m xl:display-s">{value}</p>
      <p className="text-text-primary label-l lg:whitespace-nowrap">{label}</p>
      <p className="w-full text-text-secondary body-xs">{note}</p>
    </div>
  );
}
