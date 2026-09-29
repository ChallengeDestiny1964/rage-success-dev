import Link from "next/link";
import type { CSSProperties } from "react";
import { TechStack } from "@/components/TechChip";
import type { Experience } from "@/data/experience";
import { experience, formatTenure, yearOf } from "@/data/experience";

function initials(company: string) {
  return company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function CompanyMark({ company }: { company: string }) {
  return (
    <span className="company-mark" aria-hidden>
      {initials(company)}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="career-check" fill="none" aria-hidden>
      <path
        d="M3.5 8.4 6.4 11 12.5 4.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CareerCard({ role, featured }: { role: Experience; featured: boolean }) {
  const style = { "--brand": role.color } as CSSProperties;
  const city = role.location.split(",")[0];

  return (
    <Link
      href={`/experience#${role.slug}`}
      className={`career-card group ${featured ? "career-card-featured" : ""}`}
      style={style}
      aria-label={`${role.role} at ${role.company}, ${role.start} to ${role.end}. View full experience.`}
    >
      <div className="flex items-start justify-between gap-4">
        <CompanyMark company={role.company} />
        <span className="career-arrow" aria-hidden>
          ↗
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <h3 className="display text-[1.65rem] leading-none tracking-[-0.035em]">{role.company}</h3>
        {featured ? <span className="career-badge">Most recent</span> : null}
      </div>
      <p className="career-muted mt-2.5 text-[13px] font-medium">
        {role.sector} · {city}
      </p>

      <div className="career-divider mt-6 pt-5">
        <p className="text-[15px] font-semibold leading-snug tracking-[-0.015em]">{role.role}</p>
        <p className="career-muted mono mt-2 text-[11.5px]">
          {role.start} — {role.end}
          <span className="mx-1.5 opacity-50">·</span>
          {formatTenure(role.start, role.end)}
        </p>
      </div>

      <ul className="mt-5 space-y-2.5">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="career-highlight flex gap-2.5 text-[13.5px] leading-snug">
            <CheckIcon />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <TechStack items={role.stack} className="mt-auto pt-7" />
    </Link>
  );
}

export function TrackRecord() {
  const roles = [...experience].reverse();

  return (
    <section id="track-record" className="shell scroll-mt-20 py-20 md:py-28">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow">Track record</p>
          <h2 className="display mt-4 max-w-xl text-4xl text-ink md:text-5xl">
            Shipped inside <span className="accent-serif">ambitious</span> product teams
          </h2>
        </div>
        <div className="max-w-sm md:text-right">
          <p className="text-[15px] leading-relaxed text-muted">
            Eight years of production engineering across AI platforms, telecom-scale systems and
            logistics software.
          </p>
          <Link href="/experience" className="link-arrow mt-3">
            Full experience
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="relative mt-14 hidden lg:block" aria-hidden>
        <span className="career-rail-line" />
        <div className="relative grid grid-cols-3 gap-5">
          {roles.map((role) => (
            <div
              key={role.slug}
              className="flex items-center gap-2.5"
              style={{ "--brand": role.color } as CSSProperties}
            >
              <span className="career-node" />
              <span className="career-year mono">{yearOf(role.start)}</span>
            </div>
          ))}
        </div>
        <span className="career-now">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
          </span>
          Today · open for new work
        </span>
      </div>

      <div className="mt-8 grid gap-5 lg:mt-6 lg:grid-cols-3">
        {roles.map((role, index) => (
          <CareerCard key={role.slug} role={role} featured={index === roles.length - 1} />
        ))}
      </div>
    </section>
  );
}
