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
    <div className={cn("flex w-full items-start justify-between border-t border-border-default py-12", className)}>
      <p className="text-text-secondary body-s">{role}</p>
      <p className="text-right text-text-primary label-m">{name}</p>
    </div>
  );
}
