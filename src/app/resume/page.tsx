import type { Metadata } from "next";
import Link from "next/link";
import { education, experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Updated resume for ${site.name}, Senior Full-Stack AI Engineer.`,
};

export default function ResumePage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between print:hidden">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="display mt-5 text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.92] text-ink">
            Updated professional <span className="accent-serif">resume</span>
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Clean rewrite of the original CV for Freelancer.com and AI training platforms — clearer
            English, corrected education wording, and stronger project evidence.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/Mohamed-Rage-Resume.pdf" className="btn btn-primary" download>
            Download PDF
          </a>
          <Link href="#resume-print" className="btn btn-secondary">
            Jump to resume
          </Link>
        </div>
      </div>

      <article
        id="resume-print"
        className="surface mt-12 rounded-[1.75rem] p-6 md:p-10 print:mt-0 print:rounded-none print:border-0 print:bg-white print:p-0"
      >
        <header className="border-b border-line pb-6">
          <h2 className="display text-4xl text-ink">{site.name}</h2>
          <p className="mt-2 text-lg font-medium text-accent-deep">{site.title}</p>
          <p className="mt-3 text-sm text-muted">{site.location}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>
            <a href={site.contact.github} target="_blank" rel="noreferrer">
              {site.contact.githubLabel}
            </a>
            <a href={site.contact.linkedin} target="_blank" rel="noreferrer">
              {site.contact.linkedinLabel}
            </a>
          </div>
        </header>

        <section className="border-b border-line py-6">
          <h3 className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            Summary
          </h3>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
            {site.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="border-b border-line py-6">
          <h3 className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            Experience
          </h3>
          <div className="mt-4 space-y-6">
            {experience.map((role) => (
              <div key={`${role.company}-${role.role}`}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <p className="font-semibold text-ink">
                    {role.role}, {role.company}
                  </p>
                  <p className="text-sm text-muted">
                    {role.start} – {role.end} | {role.location}
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-line py-6">
          <h3 className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            Selected Projects
          </h3>
          <div className="mt-4 space-y-4">
            {featuredProjects.map((project) => (
              <div key={project.slug}>
                <p className="font-semibold text-ink">{project.title}</p>
                <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
                <p className="mt-2 text-sm text-muted">{project.stack.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-line py-6">
          <h3 className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            Skills
          </h3>
          <div className="mt-4 space-y-3">
            {skillGroups.map((group) => (
              <p key={group.title} className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">{group.title}: </span>
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className="pt-6">
          <h3 className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            Education
          </h3>
          <p className="mt-3 font-semibold text-ink">{education.degree}</p>
          <p className="mt-1 text-sm text-muted">
            {education.school} · {education.location}
          </p>
          <p className="mt-1 text-sm text-muted">
            {education.start} – {education.end}
          </p>
          <p className="mt-4 text-sm text-muted">Languages: English</p>
        </section>
      </article>
    </section>
  );
}
