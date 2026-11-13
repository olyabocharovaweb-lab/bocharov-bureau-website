import Link from "next/link";
import { cn } from "@/lib/cn";

const links = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "#" },
  { label: "Awards", href: "#" },
  { label: "Contact", href: "#" },
];

/**
 * Figma: Nav (260:10) — px 40, py 30 (gap → 28), space-between.
 * Wordmark: Inter Semi Bold 20 / -3% has no text style → Heading/H6 + semibold (see ds-gaps).
 */
export function Nav({ className }: { className?: string }) {
  return (
    <header className={cn("flex w-full items-center justify-between px-40 py-28 text-text-primary", className)}>
      <Link href="/" className="whitespace-nowrap heading-h6 font-semibold">
        Bocharov®Bureau
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-start gap-32 label-m">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
