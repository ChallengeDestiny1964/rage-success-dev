import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BrandName, BrandTitle } from "@/components/BrandLetters";
import { TechStack } from "@/components/TechChip";
import { education } from "@/data/experience";
import { focusAreas, skillGroups } from "@/data/skills";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, Senior Full-Stack AI Engineer based in Sydney, Australia.`,
};

export default function AboutPage() {
  return (
    <section className="shell py-16 md:py-24">
      <p className="eyebrow">About</p>
      <BrandName className="mt-5 max-w-3xl text-[clamp(2.8rem,6vw,4.6rem)]" />
      <BrandTitle className="mt-3 text-[clamp(1.4rem,2.6vw,1.9rem)]" delayMs={280} />
      <div className="lede mt-8 max-w-2xl space-y-4">
        {site.summary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-16 grid gap-0 md:grid-cols-3">
        {focusAreas.map((item, index) => (
          <article
            key={item.title}
            className="border-t border-line py-8 md:border-t-0 md:border-l md:px-7 first:md:border-l-0 first:md:pl-0"
          >
            <p className="mono text-[0.72rem] text-accent-deep">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="display mt-4 text-2xl text-ink">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-20">
        <p className="eyebrow">Skills</p>
        <h2 className="display mt-4 text-4xl text-ink md:text-5xl">
          Stack depth clients can <span className="accent-serif">verify</span>
        </h2>
        <div className="skill-groups mt-10">
          {skillGroups.map((group, index) => (
            <article
              key={group.title}
              className="skill-group"
              data-skill={group.id}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="skill-group-shell">
                <div className="skill-group-head">
                  <span className="skill-group-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="skill-group-title">{group.title}</h3>
                </div>
                <TechStack items={group.items} layout="grid" className="mt-5" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="surface mt-16 rounded-[1.75rem] p-7 md:p-10">
        <p className="eyebrow">Education</p>
        <h2 className="display mt-4 text-3xl text-ink md:text-4xl">{education.degree}</h2>
        <p className="mt-3 text-muted">
          {education.school} · {education.location}
        </p>
        <p className="mono mt-2 text-sm text-muted">
          {education.start} – {education.end}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/experience" className="btn btn-primary">
            View experience
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
          <Link href="/resume" className="btn btn-secondary">
            Open resume
          </Link>
        </div>
      </div>
    </section>
  );
}
