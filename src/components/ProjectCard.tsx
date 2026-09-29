import Link from "next/link";
import { ProjectFrame } from "@/components/ProjectFrame";
import { ProjectLinkBadge } from "@/components/ProjectLinkBadge";
import { TechStack } from "@/components/TechChip";
import type { Project } from "@/data/projects";
import { getProjectHref } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = getProjectHref(project);
  const flipped = index % 2 === 1;
  const linkClass = "after:absolute after:inset-0 after:z-20";

  return (
    <article className="project-card group relative grid items-center gap-8 border-t border-line py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
      <div className={`min-w-0 ${flipped ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="mono text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-line" />
          <span className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            {project.category}
          </span>
          <ProjectLinkBadge project={project} />
        </div>

        <h3 className="display mt-5 text-[1.9rem] leading-[1.05] tracking-[-0.04em] text-ink transition group-hover:text-accent-deep md:text-[2.5rem]">
          {project.live ? (
            <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
              {project.title}
            </a>
          ) : (
            <Link href={href} className={linkClass}>
              {project.title}
            </Link>
          )}
        </h3>

        <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/80">{project.subtitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted/90">{project.outcome}</p>

        <TechStack items={project.stack} className="mt-6" />

        <p className="link-arrow mt-8">
          {project.live ? "Open the live app" : "Explore the project"}
          <span aria-hidden>{project.live ? "↗" : "→"}</span>
        </p>
      </div>

      <div className={`order-first min-w-0 ${flipped ? "lg:order-1" : "lg:order-2"}`}>
        <ProjectFrame project={project} priority={index < 2} />
      </div>
    </article>
  );
}
