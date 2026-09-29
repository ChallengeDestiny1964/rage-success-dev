import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line/70">
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3.5">
            <LogoMark className="h-11 w-11" />
            <p className="display text-3xl text-ink">{site.name}</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {site.title}
            <span className="mx-2 opacity-40">·</span>
            {site.location}
          </p>
          <p className="mono mt-4 text-[0.7rem] tracking-wide text-muted">
            Built with precision — Next.js · TypeScript
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted">
          <a className="transition hover:text-accent-deep" href={site.contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="transition hover:text-accent-deep" href={`mailto:${site.contact.email}`}>
            Email
          </a>
          <a className="transition hover:text-accent-deep" href={site.contact.phoneHref}>
            Phone
          </a>
          <a className="transition hover:text-accent-deep" href={site.contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link className="transition hover:text-accent-deep" href="/resume">
            Resume
          </Link>
        </nav>
      </div>
    </footer>
  );
}
