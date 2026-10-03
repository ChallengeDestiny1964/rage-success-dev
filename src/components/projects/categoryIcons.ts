import { BotIcon, BrainCircuitIcon, GlobeIcon, LayoutGridIcon, SmartphoneIcon } from "lucide-react";
import type { ProjectCategory } from "@/data/projects";

export const categoryIcons = {
  all: LayoutGridIcon,
  ai: BrainCircuitIcon,
  web: GlobeIcon,
  mobile: SmartphoneIcon,
  bot: BotIcon,
} satisfies Record<ProjectCategory | "all", unknown>;
