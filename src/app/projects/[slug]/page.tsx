import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectFrame } from "@/components/ProjectFrame";
import { ProjectLinkBadge } from "@/components/ProjectLinkBadge";
import { TechStack } from "@/components/TechChip";
import { getProject, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.subtitle };
}

export default async function ProjectShowcasePage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="py-14 md:py-20">
      <div className="shell">
        <Link href="/projects" className="link-arrow">
          <span aria-hidden>←</span>
          All projects
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            {project.category}
          </span>
          <ProjectLinkBadge project={project} />
        </div>
        <h1 className="display mt-5 max-w-4xl text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-ink">
          {project.title}
        </h1>
        <p className="lede mt-6 max-w-2xl text-lg">{project.subtitle}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
              Open the live app
              <span className="btn-arrow btn-arrow-out" aria-hidden>
                ↗
              </span>
            </a>
          ) : null}
          <Link href="/contact" className={project.live ? "btn btn-secondary" : "btn btn-primary"}>
            Discuss a similar build
          </Link>
        </div>
      </div>

      <div className="shell-wide mt-14">
        <div className="group">
          <ProjectFrame project={project} priority sizes="(min-width: 1280px) 1280px, 100vw" />
        </div>
      </div>

      <div className="shell">
        <TechStack items={project.stack} className="mt-8" />

        <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-8">
          {[
            { title: "Problem", body: project.problem },
            { title: "Approach", body: project.approach },
            { title: "Outcome", body: project.outcome },
          ].map((block, blockIndex) => (
            <section key={block.title}>
              <p className="mono text-[0.72rem] text-accent-deep">
                {String(blockIndex + 1).padStart(2, "0")}
              </p>
              <h2 className="display mt-3 text-2xl text-ink">{block.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{block.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-14 border-t border-line pt-12">
          <h2 className="display text-3xl text-ink">
            Engineering <span className="accent-serif">highlights</span>
          </h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-line bg-white/55 px-4 py-4 text-sm leading-relaxed text-muted backdrop-blur-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-16 flex items-center justify-between gap-6 border-t border-line pt-10"
        >
          <div>
            <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Next project</p>
            <p className="display mt-2 text-2xl text-ink transition group-hover:text-accent-deep md:text-3xl">
              {next.title}
            </p>
          </div>
          <span className="link-arrow text-lg">→</span>
        </Link>
      </div>
    </article>
  );
}
