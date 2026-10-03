import type { CSSProperties } from "react";
import { TechStack } from "@/components/TechChip";
import { categories, domainOf, type Project } from "@/data/projects";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectTile({ project, eager = false }: { project: Project; eager?: boolean }) {
  const category = categories.find((c) => c.id === project.category);

  return (
    <article
      className="project-tile relative min-w-0"
      style={{ "--tint": project.accent } as CSSProperties}
    >
      <ProjectPreview project={project} eager={eager} />

      <div className="mt-5 px-1">
        <div className="mono flex items-center justify-between gap-4 text-[0.66rem] uppercase tracking-[0.14em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
            {category?.label}
          </span>
          <span className="flex min-w-0 items-center gap-1.5 normal-case tracking-normal">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="truncate">{domainOf(project.live)}</span>
          </span>
        </div>

        <h3 className="display mt-3 text-[1.6rem] leading-[1.1] tracking-[-0.035em] text-ink">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="project-title-link after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {project.title}
            <span className="sr-only"> (opens the live product in a new tab)</span>
          </a>
        </h3>
        <p className="mt-2 max-w-xl text-[0.97rem] leading-relaxed text-ink-soft/80">
          {project.subtitle}
        </p>

        <TechStack items={project.stack} max={4} className="mt-5" />
      </div>
    </article>
  );
}
