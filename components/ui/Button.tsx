import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "outline" | "solid";

const base =
  "group/btn relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink px-[22px] text-btn font-medium whitespace-nowrap transition-colors duration-500 ease-out-expo";

const variants: Record<Variant, string> = {
  outline: "py-3 text-ink hover:bg-ink hover:text-paper",
  solid: "py-[11px] bg-ink text-paper hover:bg-paper hover:text-ink",
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

/** Text slides up on hover, a copy slides in from below. */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}

export function ButtonLink({
  variant = "outline",
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <Label>{children}</Label>
    </Link>
  );
}

export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], "disabled:opacity-50", className)} {...props}>
      <Label>{children}</Label>
    </button>
  );
}
