import { ArrowUpRightIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { TechStack } from "@/components/TechChip";
import { categories, domainOf, type Project } from "@/data/projects";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectTile({
  project,
  eager = false,
  index = 0,
}: {
  project: Project;
  eager?: boolean;
  index?: number;
}) {
  const category = categories.find((c) => c.id === project.category);

  return (
    <article
      className="project-block group relative h-full min-w-0"
      style={
        {
          "--tint": project.accent,
          "--i": index,
        } as CSSProperties
      }
    >
      <div className="project-block-shell">
        <ProjectPreview project={project} eager={eager} />

        <div className="project-block-body">
          <div className="project-block-meta">
            <span className="project-block-cat">
              <span className="project-block-cat-dot" aria-hidden />
              {category?.label}
            </span>
            <span className="project-block-live">
              <span className="project-block-live-dot" aria-hidden>
                <span />
              </span>
              <span className="truncate">{domainOf(project.live)}</span>
            </span>
          </div>

          <div className="project-block-heading">
            <h3 className="project-block-title">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="project-title-link after:absolute after:inset-0 after:z-20 after:content-['']"
              >
                {project.title}
                <span className="sr-only"> (opens the live product in a new tab)</span>
              </a>
            </h3>
            <span className="project-block-arrow" aria-hidden>
              <ArrowUpRightIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </div>

          <p className="project-block-copy">{project.subtitle}</p>

          <div className="project-block-stack">
            <TechStack items={project.stack} max={3} />
          </div>
        </div>
      </div>
    </article>
  );
}
