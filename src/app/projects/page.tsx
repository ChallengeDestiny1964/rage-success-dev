import type { Metadata } from "next";
import { FeaturedWork } from "@/components/FeaturedWork";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected full-stack, AI agent, and product engineering projects by Mohamed Rage, shown running.",
};

export default function ProjectsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <p className="eyebrow">Projects</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.92] text-ink">
          Products, shown <span className="accent-serif">running</span>
        </h1>
        <p className="lede mt-6 max-w-2xl">
          Every project is shown on its first running screen. Projects marked Live open the
          running app; the rest open a full case study.
        </p>
      </div>

      <div className="shell mt-10">
        <FeaturedWork projects={projects} />
      </div>
    </section>
  );
}
