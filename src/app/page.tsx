import { BrainCircuitIcon, BriefcaseIcon, Building2Icon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";
import { FeaturedWork } from "@/components/FeaturedWork";
import { HeroVisual } from "@/components/HeroVisual";
import { TechMarquee } from "@/components/TechMarquee";
import { TrackRecord } from "@/components/TrackRecord";
import { featuredProjects } from "@/data/projects";
import { focusAreas } from "@/data/skills";
import { site } from "@/data/site";

const credentials = [
  { label: "Experience", value: "8+ years", icon: BriefcaseIcon },
  { label: "Focus", value: "Full-Stack AI", icon: BrainCircuitIcon },
  { label: "Base", value: "Sydney · Remote", icon: MapPinIcon },
  { label: "Industries", value: "AI · Telecom · Logistics", icon: Building2Icon },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden">
        <div className="shell relative grid min-h-[calc(100svh-4.5rem)] content-center items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow reveal">Senior engineer · available for hire</p>
            <h1 className="display text-gradient reveal reveal-delay-1 mt-6 text-[clamp(3.4rem,8.5vw,6.4rem)] leading-[0.92]">
              {site.name}
            </h1>
            <p className="display reveal reveal-delay-2 mt-4 text-[clamp(1.6rem,3vw,2.25rem)] leading-tight text-ink-soft">
              <span className="accent-serif">Senior</span> Full-Stack AI Engineer
            </p>
            <p className="lede reveal reveal-delay-3 mt-6 max-w-xl">{site.tagline}</p>
            <div className="reveal reveal-delay-4 mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-primary">
                Explore selected work
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Discuss a project
              </Link>
            </div>
          </div>

          <div className="reveal reveal-delay-5 mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </section>

      <section id="credentials" className="border-y border-line bg-white/45 backdrop-blur-md">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={[
                  "flex items-start gap-3.5 px-3 py-6 sm:items-center sm:px-5",
                  index % 2 === 0 ? "border-r border-line" : "",
                  index < 2 ? "border-b border-line lg:border-b-0" : "",
                  index < 3 ? "lg:border-r" : "lg:border-r-0",
                ].join(" ")}
              >
                <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-accent-deep shadow-[0_0_0_1px_rgba(8,16,24,0.07),0_4px_12px_-6px_rgba(8,16,24,0.2)] sm:grid">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </p>
                  <p className="display mt-1.5 text-base leading-snug tabular-nums text-ink sm:text-lg xl:text-xl">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <TrackRecord />

      <TechMarquee />

      <section className="shell py-20 md:py-28">
        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-4 text-4xl text-ink md:text-5xl">
              Products, shown <span className="accent-serif">running</span>
            </h2>
            <p className="lede mt-4 max-w-xl">
              Agents, evaluation loops, and full-stack products, each on its first running screen.
            </p>
          </div>
          <Link href="/projects" className="link-arrow shrink-0">
            View all projects
            <span aria-hidden>→</span>
          </Link>
        </div>
        <FeaturedWork projects={featuredProjects} />
      </section>

      <section className="shell pb-8 pt-4 md:pb-12">
        <div className="max-w-2xl">
          <p className="eyebrow">Capabilities</p>
          <h2 className="display mt-4 text-4xl text-ink md:text-5xl">
            How I create <span className="accent-serif">leverage</span> for clients
          </h2>
        </div>
        <div className="mt-12 grid gap-0 md:grid-cols-3">
          {focusAreas.map((item, index) => (
            <article
              key={item.title}
              className={`border-t border-line py-8 md:border-t-0 md:border-l md:px-7 md:py-2 first:md:border-l-0 first:md:pl-0`}
            >
              <p className="mono text-[0.72rem] text-accent-deep">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-4 text-2xl text-ink md:text-[1.7rem]">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="panel-dark overflow-hidden rounded-[1.85rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-white/10 px-7 py-12 md:px-12 lg:border-b-0 lg:border-r">
              <p className="mono text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(232,240,246,0.55)]">
                Next engagement
              </p>
              <h2 className="display mt-5 text-4xl text-white md:text-5xl">
                Ready for production work — <span className="accent-serif">not demos</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[rgba(232,240,246,0.68)]">
                Freelancer.com projects, AI training platforms, and remote product teams. Direct
                channels only: GitHub, email, phone, LinkedIn.
              </p>
              <p className="mono mt-6 text-[0.75rem] text-[rgba(232,240,246,0.5)]">
                {site.availability}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-light">
                  Get in touch
                  <span className="btn-arrow" aria-hidden>
                    →
                  </span>
                </Link>
                <Link href="/resume" className="btn btn-ghost">
                  Download resume
                </Link>
              </div>
            </div>
            <div className="[&_a]:border-white/10 [&_a:hover]:bg-white/5 [&_p.text-accent-deep]:text-[rgba(126,210,214,0.95)] [&_p.text-ink]:text-[#e8f0f6] [&_p.text-muted]:text-[rgba(232,240,246,0.55)]">
              <ContactLinks compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
