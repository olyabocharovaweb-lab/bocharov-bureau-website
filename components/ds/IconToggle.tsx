import { cn } from "@/lib/cn";

export type IconToggleProps = {
  /** Figma variant `State`: Closed = plus, Open = minus (vertical bar hidden). */
  open?: boolean;
  className?: string;
};

/**
 * Figma: Icon / Toggle (327:13) — 24 × 24, two bars, stroke 1.5 (square caps), color/text/primary.
 * One SVG; the vertical bar is scaled to 0 when open. Decorative: the state is announced
 * by the button that contains it (aria-expanded).
 */
export function IconToggle({ open = false, className }: IconToggleProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 text-text-primary", className)}
    >
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path
        d="M12 4V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        className={cn("origin-center", open && "scale-y-0")}
        style={{ transformBox: "fill-box" }}
      />
    </svg>
  );
}
