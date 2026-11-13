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

/** Figma: Stat card (260:49) — bg/surface, p 28, gap 14, radius/md. */
export function StatCard({
  value = "160+",
  label = "Screens",
  note = "23 core screens, every state, light & dark",
  className,
}: StatCardProps) {
  return (
    <div className={cn("flex flex-col items-start gap-14 rounded-md bg-bg-surface p-28", className)}>
      <p className="whitespace-nowrap text-text-primary display-s">{value}</p>
      <p className="whitespace-nowrap text-text-primary label-l">{label}</p>
      <p className="w-full text-text-secondary body-xs">{note}</p>
    </div>
  );
}
