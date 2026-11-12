import Link from "next/link";
import { legalLinks, siteConfig, socialLinks, studioLinks, type NavItem } from "@/config/site";

const linkClass =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_1px]";

function FooterLink({ item }: { item: NavItem }) {
  if (!item.href) return <span>{item.label}</span>;
  const external = item.href.startsWith("http");
  return external ? (
    <a href={item.href} className={linkClass} target="_blank" rel="noopener noreferrer">
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={linkClass}>
      {item.label}
    </Link>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
      <h2 className="label-mono font-medium">{title}</h2>
      {children}
    </div>
  );
}

export function Footer() {
  // An e-mail with a "[domain]" placeholder is not linkable yet.
  const emailReady = !siteConfig.email.includes("[");
  return (
    <footer className="flex flex-col gap-10 px-gutter pt-section-lg pb-10">
      <div className="grid grid-cols-2 gap-x-10 gap-y-12 text-body leading-[1.2] md:flex md:gap-10">
        <Column title="Social">
          <ul className="flex flex-col gap-[10px]">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <FooterLink item={l} />
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Studio">
          <ul className="flex flex-col gap-[10px]">
            {studioLinks.map((l) => (
              <li key={l.label}>
                <FooterLink item={l} />
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Contact">
          <address className="flex flex-col gap-[10px] not-italic">
            {emailReady ? (
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
            ) : (
              <span>{siteConfig.email}</span>
            )}
            <span>{siteConfig.region}</span>
          </address>
        </Column>
      </div>

      <p
        aria-hidden
        data-reveal="fade"
        className="text-wordmark leading-[0.85] whitespace-nowrap select-none"
      >
        Bocharov®
      </p>

      <div className="flex flex-wrap items-start justify-between gap-4 font-mono text-mono tracking-[0.02em] text-muted">
        <p>© 2026 Bocharov. All rights reserved.</p>
        <p>
          {legalLinks.map((l, i) => (
            <span key={l.href}>
              {i > 0 && " · "}
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
