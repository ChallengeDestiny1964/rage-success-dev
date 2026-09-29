"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function AvailabilityDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  // Storing the path the menu was opened on closes it automatically after navigation.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-3">
      <div className="shell">
        <div className="header-bar relative flex h-[3.75rem] items-center justify-between gap-4 rounded-[1.15rem] pl-2.5 pr-2">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="logo-link group rounded-xl pr-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Logo />
          </Link>

          <nav
            aria-label="Primary"
            className="nav-track absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full p-1 lg:flex"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[12.5px] font-medium tracking-[-0.01em] text-muted xl:flex">
              <AvailabilityDot />
              Available for projects
            </span>
            <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Hire me
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-open={open}
              className="menu-toggle lg:hidden"
              onClick={() => setOpenPath(open ? null : pathname)}
            >
              <span className="menu-line" />
              <span className="menu-line" />
            </button>
          </div>

          <span className="header-progress" aria-hidden />
        </div>

        {open ? (
          <div id="mobile-menu" className="mobile-menu mt-2 rounded-[1.15rem] p-2 lg:hidden">
            <nav aria-label="Mobile" className="flex flex-col">
              {site.nav.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`mobile-menu-item flex items-center justify-between rounded-xl px-3.5 py-3 text-[15px] font-medium tracking-[-0.01em] transition ${
                      active ? "bg-white text-ink shadow-[0_1px_2px_rgba(8,16,24,0.08)]" : "text-ink-soft hover:bg-white/70"
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <span className="flex items-center gap-3">
                      <span className="mono text-[10.5px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                      {item.label}
                    </span>
                    <span className={active ? "text-accent" : "text-muted/60"} aria-hidden>
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-2 pb-1 pt-3">
              <span className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
                <AvailabilityDot />
                Available for projects
              </span>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Hire me
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
