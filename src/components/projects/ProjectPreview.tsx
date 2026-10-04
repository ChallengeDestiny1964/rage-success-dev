import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectPreview({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <div className="preview">
      <Image
        src={project.image}
        alt={`${project.title} running live`}
        fill
        sizes="(min-width: 1280px) 580px, (min-width: 768px) 46vw, 92vw"
        preload={eager}
        className="preview-shot object-cover"
      />
      <span className="preview-open" aria-hidden>
        Open live
        <ArrowUpRightIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    </div>
  );
}
