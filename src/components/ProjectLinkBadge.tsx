import type { Project } from "@/data/projects";

export function ProjectLinkBadge({ project }: { project: Project }) {
  if (project.live) {
    return (
      <span className="mono inline-flex items-center gap-1.5 rounded-md border border-[rgba(40,200,64,0.35)] bg-[rgba(40,200,64,0.08)] px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#1c7a32]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </span>
        Live
      </span>
    );
  }

  return (
    <span className="mono inline-flex items-center rounded-md border border-line bg-white/70 px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-muted">
      Case study
    </span>
  );
}
