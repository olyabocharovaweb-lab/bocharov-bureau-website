import { cn } from "@/lib/cn";

export type CreditsRowProps = {
  /** Figma text property `Role` */
  role?: string;
  /** Figma text property `Name` */
  name?: string;
  className?: string;
};

/** Figma: Credits row (260:53) — top border/default, py 12, space-between. */
export function CreditsRow({ role = "Creative direction", name = "Olya Bocharova", className }: CreditsRowProps) {
  return (
    <div className={cn("flex w-full items-start justify-between gap-16 border-t border-border-default py-12", className)}>
      <p className="shrink-0 text-text-secondary body-s">{role}</p>
      {/* The name may wrap on narrow screens. */}
      <p className="min-w-0 text-right text-text-primary label-m">{name}</p>
    </div>
  );
}
