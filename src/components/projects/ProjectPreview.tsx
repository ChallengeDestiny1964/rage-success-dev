import { ArrowUpRightIcon, LockIcon } from "lucide-react";
import Image from "next/image";
import { domainOf, type Project } from "@/data/projects";

export function ProjectPreview({ project, eager = false }: { project: Project; eager?: boolean }) {
  const shot = (
    <Image
      src={project.image}
      alt={`${project.title} running live`}
      fill
      sizes={project.device === "mobile" ? "220px" : "(min-width: 1024px) 560px, 92vw"}
      preload={eager}
      className="preview-shot object-cover object-top"
    />
  );

  return (
    <div className="preview">
      {project.device === "mobile" ? (
        <div className="preview-phone">
          <span className="preview-island" aria-hidden />
          <div className="preview-screen">{shot}</div>
        </div>
      ) : (
        <div className="preview-browser">
          <div className="preview-bar" aria-hidden>
            <span className="preview-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="preview-url">
              <LockIcon className="h-2.5 w-2.5 shrink-0 opacity-50" strokeWidth={2.5} />
              <span className="truncate">{domainOf(project.live)}</span>
            </span>
            <span className="preview-bar-spacer" />
          </div>
          <div className="preview-screen">{shot}</div>
        </div>
      )}

      <span className="preview-open" aria-hidden>
        Open live
        <ArrowUpRightIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    </div>
  );
}
