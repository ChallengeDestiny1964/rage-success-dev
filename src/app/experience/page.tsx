import type { Metadata } from "next";
import { education, experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience for Mohamed Rage across Relevance AI, Telstra, and WiseTech Global.",
};

export default function ExperiencePage() {
  return (
    <section className="shell py-16 md:py-24">
      <p className="eyebrow">Experience</p>
      <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.92] text-ink">
        Eight years of <span className="accent-serif">production</span> engineering
      </h1>
      <p className="lede mt-6 max-w-2xl">
        From AI product systems to large-scale full-stack delivery — with a consistent focus on
        architecture quality, debugging depth, and shippable outcomes.
      </p>

      <div className="mt-14">
        {experience.map((role, index) => (
          <article
            key={role.slug}
            id={role.slug}
            className="relative scroll-mt-28 border-t border-line py-10 pl-0 md:pl-10"
          >
            <span className="absolute left-0 top-12 hidden h-2.5 w-2.5 -translate-x-[5px] rounded-full bg-accent md:block" />
            {index < experience.length - 1 ? (
              <span className="absolute left-0 top-[3.4rem] hidden h-[calc(100%-1.2rem)] w-px bg-line md:block" />
            ) : null}
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
                  {role.company}
                </p>
                <h2 className="display mt-3 text-3xl text-ink md:text-[2rem]">{role.role}</h2>
                <p className="mt-2 text-sm text-muted">{role.location}</p>
              </div>
              <p className="mono shrink-0 text-sm text-muted">
                {role.start} – {role.end}
              </p>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{role.summary}</p>
            <ul className="mt-6 grid max-w-3xl gap-3">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="mt-2 border-t border-line py-10">
        <p className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
          Education
        </p>
        <h2 className="display mt-3 text-3xl text-ink">{education.degree}</h2>
        <p className="mt-2 text-sm text-muted">
          {education.school} · {education.location}
        </p>
        <p className="mono mt-1 text-sm text-muted">
          {education.start} – {education.end}
        </p>
      </article>
    </section>
  );
}
