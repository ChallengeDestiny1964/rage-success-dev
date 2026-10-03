"use client";

import { useRef, useState, type ReactNode } from "react";
import { categories, type ProjectCategory } from "@/data/projects";
import { categoryIcons } from "./categoryIcons";

type Filter = ProjectCategory | "all";

export function ProjectExplorer({
  counts,
  children,
}: {
  counts: Record<Filter, number>;
  children: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const sectionsRef = useRef<HTMLDivElement>(null);
  const tabs = [{ id: "all" as const, label: "All" }, ...categories];

  function select(next: Filter) {
    setFilter(next);
    const top = sectionsRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top: top - 120, behavior: "smooth" });
  }

  return (
    <>
      <div className="sticky top-[5.25rem] z-30 flex justify-center md:justify-start">
        <div className="project-tabs" role="group" aria-label="Filter projects by category">
          {tabs.map((tab) => {
            const Icon = categoryIcons[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                className="project-tab"
                aria-pressed={filter === tab.id}
                onClick={() => select(tab.id)}
              >
                <Icon className="hidden h-3.5 w-3.5 sm:block" strokeWidth={2.25} aria-hidden />
                {tab.label}
                <span className="project-tab-count hidden sm:inline">{counts[tab.id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={sectionsRef} className="project-sections" data-filter={filter}>
        {children}
      </div>
    </>
  );
}
