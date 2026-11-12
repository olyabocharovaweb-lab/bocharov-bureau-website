"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/cn";

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out-expo hover:after:origin-left hover:after:scale-x-100",
        active && "after:scale-x-100",
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu on Escape (links close it on click).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="relative z-40 flex h-[var(--header-h)] items-center justify-between px-gutter">
      <Link
        href="/"
        className="text-[20px] leading-none font-semibold tracking-snug"
        aria-label="Bocharov Bureau — home"
      >
        Bocharov®Bureau
      </Link>

      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex gap-8 text-small leading-[1.2] font-medium">
          {mainNav.map((item) => (
            <li key={item.href}>
              <NavLink {...item} active={isActive(item.href)} />
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="relative z-50 -mr-2 px-2 py-2 text-small font-medium md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-40 bg-paper px-gutter pt-[calc(var(--header-h)+24px)] md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-2 text-h-md font-semibold tracking-tight">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
