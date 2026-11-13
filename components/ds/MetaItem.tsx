import { cn } from "@/lib/cn";

export type MetaItemProps = {
  /** Figma text property `Label` */
  label?: string;
  /** Figma text property `Value` */
  value?: string;
  className?: string;
};

/** Figma: Meta item (260:40) — top border/inverse, pt 16, gap 6. */
export function MetaItem({ label = "Client", value = "NOVA [юр. назва]", className }: MetaItemProps) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-6 border-t border-border-inverse pt-16", className)}>
      <p className="whitespace-nowrap text-text-secondary mono-caption">{label}</p>
      <p className="whitespace-nowrap text-text-primary label-m">{value}</p>
    </div>
  );
}
