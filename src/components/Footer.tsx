import { ArrowUpIcon, ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { siGithub } from "simple-icons";
import { CopyEmail } from "@/components/footer/CopyEmail";
import { HideOnPaths } from "@/components/footer/HideOnPaths";
import { SydneyTime } from "@/components/footer/SydneyTime";
import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const socials: { label: string; href: string; icon: ReactNode }[] = [
  { label: "GitHub", href: site.contact.github, icon: <BrandIcon path={siGithub.path} /> },
  { label: "LinkedIn", href: site.contact.linkedin, icon: <BrandIcon path={LINKEDIN_PATH} /> },
  {
    label: "Email",
    href: `mailto:${site.contact.email}`,
    icon: <MailIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden />,
  },
  {
    label: "Phone",
    href: site.contact.phoneHref,
    icon: <PhoneIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden />,
  },
];

const links = site.nav.filter((item) => item.href !== "/");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="shell">
        <HideOnPaths paths={["/contact"]}>
          <section className="grid gap-10 border-t border-line py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <p className="footer-status">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                Available for new projects
              </p>
              <h2 className="display mt-5 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-none text-ink">
                Let&apos;s build something <span className="accent-serif">real.</span>
              </h2>
              <div className="mt-8 flex items-center gap-3">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="footer-mail min-w-0 text-[clamp(1.05rem,2.3vw,1.5rem)]"
                >
                  <span className="footer-mail-text truncate">{site.contact.email}</span>
                  <span className="footer-mail-arrow" aria-hidden>
                    <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </a>
                <CopyEmail email={site.contact.email} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
              <Link href="/resume" className="btn btn-secondary">
                View resume
              </Link>
            </div>
          </section>
        </HideOnPaths>

        <div className="flex flex-col gap-8 border-t border-line py-10 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="logo-link inline-flex items-center gap-3" aria-label={`${site.name} — home`}>
            <LogoMark className="h-9 w-9" />
            <span className="leading-tight">
              <span className="display block text-[0.95rem] text-ink">{site.name}</span>
              <span className="block text-[0.75rem] text-muted">{site.title}</span>
            </span>
          </Link>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-3 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-7">
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2" aria-label="Social and contact links">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="footer-icon-btn"
                  aria-label={social.label}
                  title={social.label}
                  {...(social.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              Sydney
              <span className="text-ink-soft">
                <SydneyTime />
              </span>
            </p>
            <a href="#top" className="footer-top">
              Back to top
              <ArrowUpIcon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
