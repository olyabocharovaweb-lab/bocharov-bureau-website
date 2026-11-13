import Link from "next/link";
import { cn } from "@/lib/cn";

type FooterLink = { label: string; href?: string };

const columns: Array<{ title: string; links: FooterLink[] }> = [
  { title: "Social", links: [{ label: "Instagram" }, { label: "LinkedIn" }, { label: "Behance" }, { label: "Clutch" }] },
  {
    title: "Studio",
    links: [{ label: "Work", href: "/work" }, { label: "Services" }, { label: "AI Lab" }, { label: "Journal" }],
  },
  { title: "Contact", links: [{ label: "hello@[domain]" }, { label: "Europe / US" }] },
];

/** Figma: Footer (260:33) — pt 160, pb 40, px 40, gap 40; Display/Wordmark. */
export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("flex w-full flex-col items-start gap-40 px-40 pt-160 pb-40", className)}>
      <div className="flex w-full items-start gap-40">
        {columns.map((col) => (
          <div key={col.title} className="flex min-w-0 flex-1 flex-col items-start gap-10">
            <p className="text-text-secondary mono-label">{col.title}</p>
            {col.links.map((l) =>
              l.href ? (
                <Link key={l.label} href={l.href} className="text-text-primary body-base">
                  {l.label}
                </Link>
              ) : (
                <p key={l.label} className="text-text-primary body-base">
                  {l.label}
                </p>
              ),
            )}
          </div>
        ))}
      </div>
      <p className="w-full text-text-primary display-wordmark">Bocharov®</p>
      <div className="flex w-full items-start justify-between text-text-secondary mono-body">
        <p>© 2026 Bocharov. All rights reserved.</p>
        <p>Privacy · Terms</p>
      </div>
    </footer>
  );
}
