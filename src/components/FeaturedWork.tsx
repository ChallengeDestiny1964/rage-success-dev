import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <div className="border-b border-line">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
