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
  /**
   * Main components in Figma are FIXED width (174 / 184 / 157); every instance
   * on the pages is HUG. Default = hug; `fixedWidth` reproduces the main component.
   */
  fixedWidth?: boolean;
  /**
   * Not a Figma property: Primary on a dark surface (bg/page fill, text/primary label).
   * Used by the floating «Book a call» over dark sections.
   */
  inverse?: boolean;
  /** For a <button>: "submit" inside forms. */
  type?: "button" | "submit";
  className?: string;
};

const base = "inline-flex shrink-0 items-start overflow-hidden whitespace-nowrap rounded-full";

const fixedWidths: Record<ButtonStyle, string> = {
  Primary: "w-button-primary",
  Secondary: "w-button-secondary",
  Link: "w-button-link",
};

const variants: Record<ButtonStyle, string> = {
  // 260:75 — bg/inverse, px 24 py 14, gap 8, Label/M
  Primary: "gap-8 px-24 py-14 label-m",
  // 260:78 — 1px border/inverse, px 24 py 14, Label/M
  Secondary: "border border-border-inverse px-24 py-14 text-text-primary label-m",
  // 260:82 — 1px border/inverse, px 22 (no token → space/20) py 12, gap 8, Label/S
  Link: "gap-8 border border-border-inverse px-20 py-12 text-text-primary label-s",
};

export function Button({
  label = "Start a project",
  variant = "Primary",
  arrow = true,
  href,
  fixedWidth = false,
  inverse = false,
  type = "button",
  className,
}: ButtonProps) {
  const content = (
    <>
      <span>{label}</span>
      {variant === "Primary" && <span aria-hidden="true">→</span>}
      {variant === "Link" && arrow && <span aria-hidden="true">↗</span>}
    </>
  );
  const tone =
    variant === "Primary" ? (inverse ? "bg-bg-page text-text-primary" : "bg-bg-inverse text-text-inverse") : undefined;
  const classes = cn(base, variants[variant], tone, fixedWidth && fixedWidths[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {content}
    </button>
  );
}
