import { cn } from "@/lib/cn";

/** Links are not clickable in iteration 1 (decision 2026-11-13). */
const links = ["Work", "Services", "Awards", "Contact"];

/**
 * Figma: Nav (260:10) — px 40, py 30 (no token → space/28), space-between.
 * Wordmark: Inter Semi Bold 20 / -3% has no text style → Heading/H6 + semibold (approved, see ds-gaps).
 */
export function Nav({ className }: { className?: string }) {
  return (
    <header className={cn("flex w-full items-center justify-between px-40 py-28 text-text-primary", className)}>
      <p className="whitespace-nowrap heading-h6 font-semibold">Bocharov®Bureau</p>
      <nav aria-label="Primary">
        <ul className="flex items-start gap-32 label-m">
          {links.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
