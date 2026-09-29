import Image from "next/image";
import type { ComponentType } from "react";
import { AutoModelerScreen } from "@/components/screens/AutoModelerScreen";
import { ChessScreen } from "@/components/screens/ChessScreen";
import { PolyBotScreen } from "@/components/screens/PolyBotScreen";
import { ScaledCanvas } from "@/components/screens/ScaledCanvas";
import { SellStoreScreen } from "@/components/screens/SellStoreScreen";
import type { Project } from "@/data/projects";

const codedScreens: Record<string, ComponentType> = {
  "auto-modeler-evolve": AutoModelerScreen,
  "sell-store": SellStoreScreen,
  "poly-workflow-bot": PolyBotScreen,
  "multiplayer-chess": ChessScreen,
};

const chrome = {
  browser: "border-b border-line bg-[rgba(246,248,250,0.92)] text-muted",
  terminal: "border-b border-white/5 bg-[#161b22] text-[#8b949e]",
  app: "border-b border-white/5 bg-[#121212] text-[#a7a7a7]",
} as const;

export function ProjectFrame({
  project,
  sizes = "(min-width: 1024px) 620px, 100vw",
  priority = false,
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
}) {
  const { screen } = project;
  const Coded = codedScreens[project.slug];
  const label = project.live ? "Live site" : screen.image ? "Real screenshot" : "Interface preview";

  return (
    <div className="screen-frame">
      <div className={`relative flex items-center gap-3 px-4 py-2.5 ${chrome[screen.frame]}`}>
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        {screen.frame === "browser" ? (
          <div className="mono mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1 text-[0.65rem] text-ink-soft">
            {project.live ? (
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 shrink-0 fill-current opacity-60" aria-hidden>
                <path d="M8 1a4 4 0 0 0-4 4v2H3v8h10V7h-1V5a4 4 0 0 0-4-4Zm-2 6V5a2 2 0 1 1 4 0v2H6Z" />
              </svg>
            ) : null}
            <span className="truncate">{screen.title}</span>
          </div>
        ) : (
          <p className="mono mx-auto min-w-0 truncate text-[0.65rem]">{screen.title}</p>
        )}

        <span className="mono hidden shrink-0 items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.12em] sm:inline-flex">
          <span
            className={`h-1.5 w-1.5 rounded-full ${project.live ? "bg-[#28c840]" : screen.image ? "bg-accent" : "bg-current opacity-50"}`}
          />
          {label}
        </span>
      </div>

      <div
        className={`relative aspect-[16/10] overflow-hidden ${screen.theme === "dark" ? "bg-[#0d1117]" : "bg-[#f6f7f9]"}`}
      >
        {screen.image ? (
          <Image
            src={screen.image}
            alt={`${project.title} running`}
            fill
            sizes={sizes}
            priority={priority}
            className="screen-media object-cover object-top"
          />
        ) : Coded ? (
          <div className="screen-media absolute inset-0">
            <ScaledCanvas>
              <Coded />
            </ScaledCanvas>
          </div>
        ) : null}
        <div className="screen-glare" aria-hidden />
      </div>
    </div>
  );
}
