import Link from "next/link";
import { cn } from "@/lib/cn";

/** Figma: Button (260:83) — component set, property `Style`. */
export type ButtonStyle = "Primary" | "Secondary" | "Link";

export type ButtonProps = {
  /** Figma text property `Label` */
  label?: string;
  /** Figma variant `Style` */
  variant?: ButtonStyle;
  /** Figma boolean `Arrow` — in Figma it toggles only the ↗ of Style=Link. */
  arrow?: boolean;
  href?: string;
  className?: string;
};

/** Fixed width as in Figma (FIXED sizing on each variant); content is left-aligned and clipped. */
const base = "inline-flex shrink-0 items-start overflow-hidden whitespace-nowrap rounded-full";

const variants: Record<ButtonStyle, string> = {
  // 260:75 — bg/inverse, px 24 py 14, gap 8, Label/M
  Primary: "w-button-primary gap-8 bg-bg-inverse px-24 py-14 text-text-inverse label-m",
  // 260:78 — 1px border/inverse, px 24 py 14, Label/M
  Secondary: "w-button-secondary border border-border-inverse px-24 py-14 text-text-primary label-m",
  // 260:82 — 1px border/inverse, px 22 (no token → space/20) py 12, gap 8, Label/S
  Link: "w-button-link gap-8 border border-border-inverse px-20 py-12 text-text-primary label-s",
};

export function Button({ label = "Start a project", variant = "Primary", arrow = true, href, className }: ButtonProps) {
  const content = (
    <>
      <span>{label}</span>
      {variant === "Primary" && <span aria-hidden="true">→</span>}
      {variant === "Link" && arrow && <span aria-hidden="true">↗</span>}
    </>
  );
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {content}
    </button>
  );
}
