import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRightIcon,
  AudioLinesIcon,
  BlocksIcon,
  BotIcon,
  BracesIcon,
  BrainCircuitIcon,
  CircleDotIcon,
  ClapperboardIcon,
  CloudIcon,
  DatabaseZapIcon,
  DramaIcon,
  FileSearchIcon,
  FlaskConicalIcon,
  Gamepad2Icon,
  GaugeIcon,
  HardDriveIcon,
  InfinityIcon,
  LayoutDashboardIcon,
  MessagesSquareIcon,
  MonitorIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  PaletteIcon,
  PenToolIcon,
  RadioTowerIcon,
  ShapesIcon,
  ShoppingBagIcon,
  SparklesIcon,
  SquareTerminalIcon,
  UsbIcon,
  WandSparklesIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAndroid,
  siAngular,
  siAnthropic,
  siClickhouse,
  siCss,
  siDart,
  siDiscord,
  siDjango,
  siDocker,
  siElixir,
  siExpo,
  siFastapi,
  siFirebase,
  siFlask,
  siFlutter,
  siGithubactions,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siGradio,
  siGraphql,
  siHaystack,
  siHtml5,
  siHuggingface,
  siIos,
  siJavascript,
  siJest,
  siKubernetes,
  siLangchain,
  siLanggraph,
  siMaterialdesign,
  siModelcontextprotocol,
  siMongodb,
  siMui,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siOpencv,
  siOpenjdk,
  siPhoenixframework,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siRubyonrails,
  siShopify,
  siSocketdotio,
  siStripe,
  siSwift,
  siTailwindcss,
  siTypescript,
  siUnity,
  siVite,
  siVuedotjs,
  siWebassembly,
  siWebgl,
} from "simple-icons";

type TechIcon =
  | { kind: "brand"; icon: SimpleIcon }
  | { kind: "concept"; icon: LucideIcon }
  | { kind: "text"; text: string };

type Tech = {
  icon: TechIcon;
  /** Icon colour. Official brand colours that are too light to read on a light tile are darkened. */
  color: string;
};

const brand = (icon: SimpleIcon, color = `#${icon.hex}`): Tech => ({
  icon: { kind: "brand", icon },
  color,
});

const concept = (icon: LucideIcon, color: string): Tech => ({
  icon: { kind: "concept", icon },
  color,
});

const tone = {
  ai: "#0e7c80",
  data: "#3a5fbf",
  product: "#b4540a",
  systems: "#475569",
  media: "#be185d",
};

const registry: Record<string, Tech> = {
  // Languages
  Python: brand(siPython),
  TypeScript: brand(siTypescript),
  JavaScript: brand(siJavascript, "#c9a400"),
  Java: brand(siOpenjdk, "#e76f00"),
  Go: brand(siGo),
  "C#": { icon: { kind: "text", text: "C#" }, color: "#68217a" },
  CSS: brand(siCss),
  HTML5: brand(siHtml5),
  Elixir: brand(siElixir),
  Dart: brand(siDart),
  Swift: brand(siSwift),

  // Frontend & mobile
  React: brand(siReact, "#0a7ea4"),
  "React Native": brand(siReact, "#0a7ea4"),
  "Next.js": brand(siNextdotjs),
  Angular: brand(siAngular, "#dd0031"),
  "Vue.js": brand(siVuedotjs, "#2f9e6e"),
  "Tailwind CSS": brand(siTailwindcss, "#0891b2"),
  Vite: brand(siVite),
  "Material UI": brand(siMui),
  "Shopify Liquid": brand(siShopify, "#5e8e3e"),
  Unity: brand(siUnity, "#111111"),
  Flutter: brand(siFlutter),
  Expo: brand(siExpo),
  "Material 3": brand(siMaterialdesign),
  Reanimated: concept(WandSparklesIcon, "#7c3aed"),
  Skia: concept(PenToolIcon, "#db2777"),
  Canvas: concept(PenToolIcon, "#6965db"),
  WebGL: brand(siWebgl),
  Animations: concept(SparklesIcon, tone.media),
  Motion: concept(ShapesIcon, tone.media),
  Theming: concept(PaletteIcon, tone.media),
  "Responsive UI": concept(MonitorSmartphoneIcon, tone.product),
  iOS: brand(siIos),
  Android: brand(siAndroid, "#2c9e5f"),

  // Backend & APIs
  "Node.js": brand(siNodedotjs),
  NestJS: brand(siNestjs),
  FastAPI: brand(siFastapi),
  Django: brand(siDjango),
  Flask: brand(siFlask, "#2b8a99"),
  GraphQL: brand(siGraphql),
  Phoenix: brand(siPhoenixframework),
  "Ruby on Rails": brand(siRubyonrails),
  Prisma: brand(siPrisma),
  "Socket.IO": brand(siSocketdotio),
  Stripe: brand(siStripe),
  "Discord API": brand(siDiscord),
  REST: concept(ArrowLeftRightIcon, tone.data),
  APIs: concept(BracesIcon, tone.data),
  SSE: concept(RadioTowerIcon, tone.data),
  MCP: brand(siModelcontextprotocol),

  // Data & cloud
  PostgreSQL: brand(siPostgresql),
  MongoDB: brand(siMongodb),
  Redis: brand(siRedis, "#d82c20"),
  ClickHouse: brand(siClickhouse, "#c9a100"),
  Firebase: brand(siFirebase),
  Weaviate: concept(DatabaseZapIcon, "#16a34a"),
  "Vector DBs": concept(DatabaseZapIcon, tone.data),
  AWS: concept(CloudIcon, "#e68a00"),
  GCP: brand(siGooglecloud),
  Azure: concept(CloudIcon, "#0078d4"),

  // AI & LLMs
  LLMs: concept(BrainCircuitIcon, tone.ai),
  "LLM Apps": concept(MessagesSquareIcon, tone.ai),
  "AI Agents": concept(BotIcon, tone.ai),
  RAG: concept(FileSearchIcon, tone.ai),
  "Prompt Engineering": concept(SquareTerminalIcon, tone.ai),
  OpenAI: concept(SparklesIcon, "#0f8a6a"),
  "OpenAI API": concept(SparklesIcon, "#0f8a6a"),
  Anthropic: brand(siAnthropic),
  Gemini: brand(siGooglegemini, "#7a5fb0"),
  LangChain: brand(siLangchain, "#1c3c3c"),
  LangGraph: brand(siLanggraph, "#1c3c3c"),
  DSPy: concept(WorkflowIcon, tone.ai),
  Haystack: brand(siHaystack, "#0b8f80"),
  "Hugging Face": brand(siHuggingface, "#d19a00"),
  "Transformers.js": brand(siHuggingface, "#d19a00"),
  Gradio: brand(siGradio),
  Ollama: brand(siOllama),
  OpenCV: brand(siOpencv),
  WebAssembly: brand(siWebassembly),
  "ML Pipelines": concept(WorkflowIcon, tone.ai),
  Evaluation: concept(GaugeIcon, tone.ai),
  "Experiment Tracking": concept(FlaskConicalIcon, tone.ai),

  // Delivery
  Docker: brand(siDocker),
  Kubernetes: brand(siKubernetes),
  "CI/CD": concept(InfinityIcon, tone.systems),
  "GitHub Actions": brand(siGithubactions),
  Jest: brand(siJest),
  Playwright: concept(DramaIcon, "#2ead33"),
  "System Design": concept(BlocksIcon, tone.systems),

  // Product domains
  "E-commerce UX": concept(ShoppingBagIcon, tone.product),
  Automation: concept(ZapIcon, tone.product),
  "Desktop UX": concept(MonitorIcon, tone.systems),
  "Local Systems": concept(HardDriveIcon, tone.systems),
  "Multiplayer Networking": concept(NetworkIcon, tone.data),
  "Game State": concept(Gamepad2Icon, tone.media),
  "Mobile Audio": concept(AudioLinesIcon, tone.media),
  "Media APIs": concept(ClapperboardIcon, tone.media),
  Dashboard: concept(LayoutDashboardIcon, tone.product),
  ADB: concept(UsbIcon, tone.systems),
};

const fallback = concept(CircleDotIcon, tone.systems);

function Glyph({ icon }: { icon: TechIcon }) {
  if (icon.kind === "brand") {
    return (
      <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor" aria-hidden>
        <path d={icon.icon.path} />
      </svg>
    );
  }

  if (icon.kind === "concept") {
    const Icon = icon.icon;
    return <Icon className="h-[14px] w-[14px]" strokeWidth={2} aria-hidden />;
  }

  return (
    <span className="text-[9.5px] font-bold leading-none tracking-[-0.04em]" aria-hidden>
      {icon.text}
    </span>
  );
}

export function TechChip({ name, index = 0 }: { name: string; index?: number }) {
  const tech = registry[name] ?? fallback;
  const style = { "--brand": tech.color, "--i": index } as CSSProperties;

  return (
    <span className="tech-chip" style={style}>
      <span className="tech-chip-icon">
        <Glyph icon={tech.icon} />
      </span>
      {name}
    </span>
  );
}

export function TechStack({
  items,
  max,
  className = "",
}: {
  items: readonly string[];
  max?: number;
  className?: string;
}) {
  const visible = max ? items.slice(0, max) : items;
  const hidden = items.slice(visible.length);

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Tech stack">
      {visible.map((item, index) => (
        <li key={item}>
          <TechChip name={item} index={index} />
        </li>
      ))}
      {hidden.length > 0 ? (
        <li>
          <span className="tech-chip tech-chip-more" title={hidden.join(", ")}>
            +{hidden.length}
            <span className="sr-only"> more: {hidden.join(", ")}</span>
          </span>
        </li>
      ) : null}
    </ul>
  );
}
