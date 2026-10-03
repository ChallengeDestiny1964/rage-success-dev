import type { Metadata } from "next";
import { categoryIcons } from "@/components/projects/categoryIcons";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { categories, projects, projectsIn } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Live AI agents, web platforms, mobile apps and bots built by Mohamed Rage, each shown on its real running screen.",
};

export default function ProjectsPage() {
  const counts = {
    all: projects.length,
    ai: projectsIn("ai").length,
    web: projectsIn("web").length,
    mobile: projectsIn("mobile").length,
    bot: projectsIn("bot").length,
  };

  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <p className="eyebrow">Projects</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.92] text-ink">
          Products, shown <span className="accent-serif">running</span>
        </h1>
        <p className="lede mt-6 max-w-2xl">
          {projects.length} live products across AI, web, mobile and bots. Every preview is the
          product&apos;s real first screen. Click any of them to open it live.
        </p>
      </div>

      <div className="shell mt-12">
        <ProjectExplorer counts={counts}>
          {categories.map((category, sectionIndex) => {
            const Icon = categoryIcons[category.id];
            const items = projectsIn(category.id);
            return (
              <section
                key={category.id}
                id={category.id}
                data-category={category.id}
                aria-labelledby={`${category.id}-title`}
                className="scroll-mt-40 pt-14"
              >
                <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="category-icon">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <h2
                        id={`${category.id}-title`}
                        className="display text-[1.6rem] leading-tight tracking-[-0.035em] text-ink md:text-[2rem]"
                      >
                        {category.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted">{category.description}</p>
                    </div>
                  </div>
                  <span className="mono hidden shrink-0 text-xs uppercase tracking-[0.14em] text-muted sm:block">
                    {String(items.length).padStart(2, "0")} live
                  </span>
                </div>

                <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10">
                  {items.map((project, i) => (
                    <ProjectTile
                      key={project.slug}
                      project={project}
                      eager={sectionIndex === 0 && i < 2}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </ProjectExplorer>
      </div>
    </section>
  );
}
