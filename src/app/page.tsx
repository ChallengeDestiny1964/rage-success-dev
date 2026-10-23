import { BrainCircuitIcon, BriefcaseIcon, Building2Icon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { BrandName, BrandTitle } from "@/components/BrandLetters";
import { HeroVisual } from "@/components/HeroVisual";
import { categoryIcons } from "@/components/projects/categoryIcons";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { TechMarquee } from "@/components/TechMarquee";
import { TrackRecord } from "@/components/TrackRecord";
import { categories, featuredProjects, projects, projectsIn } from "@/data/projects";
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
      <section className="relative min-h-[calc(100svh-4.5rem)] overflow-x-clip">
        <div className="shell relative grid min-h-[calc(100svh-4.5rem)] content-center items-center gap-14 py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-20 lg:py-20">
          <div className="hero-copy min-w-0 max-w-xl lg:max-w-none lg:pr-2">
            <p className="eyebrow reveal">Senior engineer · available for hire</p>
            <BrandName
              className="hero-brand-name mt-6 text-[clamp(2.85rem,7vw,5.1rem)]"
              delayMs={80}
            />
            <BrandTitle
              className="mt-5 text-[clamp(1.45rem,2.8vw,2.05rem)]"
              delayMs={420}
            />
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

          <div className="hero-visual reveal reveal-delay-5 mx-auto w-full min-w-0 max-w-md px-1 sm:px-2 lg:mx-0 lg:max-w-none lg:px-0">
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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-4 text-4xl text-ink md:text-5xl">
              Products, shown <span className="accent-serif">running</span>
            </h2>
            <p className="lede mt-4 max-w-xl">
              AI agents, web platforms, mobile apps and bots, each on its live first screen. Click
              any preview to open the product.
            </p>
          </div>
          <Link href="/projects" className="link-arrow shrink-0">
            View all {projects.length} projects
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            return (
              <li key={category.id}>
                <Link
                  href={`/projects#${category.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-soft shadow-[inset_0_0_0_1px_rgba(8,16,24,0.08)] transition hover:bg-white hover:text-ink"
                >
                  <Icon className="h-3.5 w-3.5 text-accent-deep" strokeWidth={2.25} aria-hidden />
                  {category.label}
                  <span className="mono text-[0.68rem] text-muted">
                    {projectsIn(category.id).length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid auto-rows-fr gap-x-7 gap-y-8 md:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
          {featuredProjects.map((project, i) => (
            <ProjectTile key={project.slug} project={project} index={i} />
          ))}
        </div>
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
    </>
  );
}
