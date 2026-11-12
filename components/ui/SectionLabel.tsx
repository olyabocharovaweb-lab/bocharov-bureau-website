import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** "( Manifesto )" style mono label. */
export function SectionLabel({
  as: Tag = "p",
  className,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("label-mono font-medium whitespace-nowrap", className)}>
      {children}
    </Tag>
  );
}
