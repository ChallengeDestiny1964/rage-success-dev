export type ProjectScreen = {
  frame: "browser" | "terminal" | "app";
  title: string;
  image?: string;
  theme: "light" | "dark";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: "AI Agents" | "Full-Stack" | "ML Systems" | "Mobile" | "Product";
  featured: boolean;
  stack: string[];
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
  github: string;
  live?: string;
  demoNote?: string;
  screen: ProjectScreen;
};

export const projects: Project[] = [
  {
    slug: "multi-agent-trading-system",
    title: "Multi-Agent LLM Trading System",
    subtitle:
      "LangGraph multi-agent framework with analyst, researcher, trader, and risk teams.",
    category: "AI Agents",
    featured: true,
    stack: ["Python", "LangGraph", "LLMs", "OpenAI", "Anthropic", "Gemini"],
    problem:
      "Single-model trading assistants struggle with bias, shallow analysis, and weak risk controls when markets move fast.",
    approach:
      "Built a specialised multi-agent workflow where fundamental, sentiment, news, and technical analysts feed structured debates between bullish and bearish researchers. A trader agent proposes actions, and a risk/portfolio layer approves or rejects them before execution in simulation.",
    outcome:
      "A research-grade agent system that demonstrates production patterns for LLM orchestration, tool use, debate loops, and decision auditability — skills directly relevant to AI product and evaluation work.",
    highlights: [
      "Role-specialised agents with structured debate rounds",
      "Multi-provider LLM support (OpenAI, Anthropic, Gemini, xAI, Ollama)",
      "Risk gate before simulated trade execution",
      "CLI and package APIs for reproducible evaluation runs",
    ],
    github: "https://github.com/whoisdjam/Trading-agent-system",
    demoNote: "Open-source framework with CLI demo and package API",
    screen: {
      frame: "terminal",
      title: "tradingagents — python -m cli.main",
      image: "/projects/multi-agent-trading-system/cli.jpg",
      theme: "dark",
    },
  },
  {
    slug: "auto-modeler-evolve",
    title: "Auto Modeler Evolve",
    subtitle:
      "Python system for iterative model search, evaluation, and evolutionary improvement loops.",
    category: "ML Systems",
    featured: true,
    stack: ["Python", "ML Pipelines", "Evaluation", "Experiment Tracking"],
    problem:
      "Manual model iteration is slow, inconsistent, and hard to compare across candidates without a disciplined evaluation loop.",
    approach:
      "Designed an automated modelling workflow that generates candidates, scores them against defined metrics, and evolves stronger configurations through repeated evaluation cycles.",
    outcome:
      "A practical demonstration of evaluation-first ML engineering — useful for clients who need reliable model comparison, not just one-off notebooks.",
    highlights: [
      "Automated candidate generation and scoring",
      "Repeatable evaluation loops for model comparison",
      "Engineering focus on correctness and edge cases",
      "Clear separation between search, scoring, and selection",
    ],
    github: "https://github.com/whoisdjam/auto-modeler-evolve",
    screen: { frame: "browser", title: "AutoModeler — conversational ML workspace", theme: "light" },
  },
  {
    slug: "cash-clock",
    title: "Cash Clock",
    subtitle:
      "TypeScript productivity product for time-value tracking and freelance billing clarity.",
    category: "Full-Stack",
    featured: true,
    stack: ["TypeScript", "React", "Next.js", "Node.js"],
    problem:
      "Freelancers and consultants often lose visibility into how time converts into revenue across clients and tasks.",
    approach:
      "Built a focused TypeScript application that tracks working time against rate logic, surfaces value in real time, and keeps the interface simple enough for daily use.",
    outcome:
      "A polished product-facing app that shows UI craft, TypeScript discipline, and commercial product thinking for freelance-market clients.",
    highlights: [
      "Clean TypeScript architecture",
      "Product UX oriented around billing clarity",
      "Responsive interface for desktop and mobile",
      "Evidence of end-to-end feature ownership",
    ],
    github: "https://github.com/whoisdjam/cash-clock",
    live: "https://cashclock.coding-global.com/",
    screen: {
      frame: "browser",
      title: "cashclock.coding-global.com",
      image: "/projects/cash-clock/live.jpg",
      theme: "dark",
    },
  },
  {
    slug: "sell-store",
    title: "Sell Store Commerce Theme",
    subtitle:
      "Conversion-focused storefront engineering for a modern e-commerce experience.",
    category: "Product",
    featured: true,
    stack: ["Shopify Liquid", "JavaScript", "CSS", "E-commerce UX"],
    problem:
      "Generic storefronts underperform when product discovery, trust, and checkout flow feel inconsistent.",
    approach:
      "Implemented a commerce-ready storefront theme with structured product presentation, cleaner navigation, and storefront logic tuned for conversion and maintainability.",
    outcome:
      "Shows commercial frontend delivery for marketplace and retail clients who need shippable storefront work, not just demos.",
    highlights: [
      "Storefront theme engineering in Liquid",
      "Product listing and merchandising structure",
      "Attention to conversion-oriented UX",
      "Practical commerce delivery experience",
    ],
    github: "https://github.com/whoisdjam/sell-store",
    screen: { frame: "browser", title: "Psychology Books — storefront", theme: "light" },
  },
  {
    slug: "poly-workflow-bot",
    title: "Poly Workflow Bot",
    subtitle:
      "TypeScript automation bot for event-driven workflows and API integrations.",
    category: "Full-Stack",
    featured: false,
    stack: ["TypeScript", "APIs", "Automation", "Node.js"],
    problem:
      "Operational workflows break when manual steps, rate limits, and fragmented APIs create brittle hand-offs.",
    approach:
      "Built a TypeScript bot architecture around event handling, API orchestration, and resilient job flow so repetitive operational tasks can run with clearer control and logging.",
    outcome:
      "Demonstrates automation engineering skills that map cleanly to client workflow, integration, and ops-assistant projects.",
    highlights: [
      "Event-driven TypeScript architecture",
      "API orchestration and integration patterns",
      "Operational reliability focus",
      "Useful base for client automation engagements",
    ],
    github: "https://github.com/whoisdjam/poly-bot",
    screen: { frame: "terminal", title: "polybot — bun run src/llm-bot.ts", theme: "dark" },
  },
  {
    slug: "trashbin-plus",
    title: "Trashbin Plus",
    subtitle:
      "TypeScript utility product for safer file recovery and cleanup workflows.",
    category: "Product",
    featured: false,
    stack: ["TypeScript", "Desktop UX", "Local Systems"],
    problem:
      "Aggressive cleanup tools create permanent loss risk when users need a recoverability layer.",
    approach:
      "Engineered a TypeScript utility that improves trash/recovery workflows with clearer state handling and safer deletion patterns.",
    outcome:
      "A product-minded systems app showing attention to edge cases, local state, and user trust.",
    highlights: [
      "TypeScript systems/product engineering",
      "Recovery-first workflow design",
      "Edge-case handling for destructive actions",
      "Practical UX for a utility tool",
    ],
    github: "https://github.com/whoisdjam/trashbin-plus",
    screen: {
      frame: "app",
      title: "Spotify — Trashbin+ extension",
      image: "/projects/trashbin-plus/spotify.jpg",
      theme: "dark",
    },
  },
  {
    slug: "multiplayer-chess",
    title: "Unity Multiplayer Chess",
    subtitle:
      "Real-time multiplayer chess with networked state and competitive game flow.",
    category: "Full-Stack",
    featured: false,
    stack: ["Unity", "C#", "Multiplayer Networking", "Game State"],
    problem:
      "Turn-based multiplayer games fail quickly when synchronisation, state authority, and latency handling are weak.",
    approach:
      "Implemented a multiplayer chess experience with shared game state, networked moves, and rules enforcement suitable for competitive play sessions.",
    outcome:
      "Shows systems thinking beyond web apps — synchronisation, state machines, and interactive product delivery.",
    highlights: [
      "Real-time multiplayer game state",
      "Rules-aware move handling",
      "Interactive product experience",
      "Cross-discipline engineering signal",
    ],
    github: "https://github.com/whoisdjam/Unity-multiplay-chess",
    screen: { frame: "app", title: "Multiplayer Chess — Unity", theme: "dark" },
  },
  {
    slug: "react-native-track-player",
    title: "React Native Track Player",
    subtitle:
      "Mobile audio playback engineering on a production-grade React Native media stack.",
    category: "Mobile",
    featured: false,
    stack: ["React Native", "TypeScript", "Mobile Audio", "Media APIs"],
    problem:
      "Mobile media apps need reliable background playback, queue control, and platform-consistent audio behaviour.",
    approach:
      "Worked with a mature React Native media player stack, contributing to TypeScript-facing playback flows and mobile media integration patterns.",
    outcome:
      "Evidence of mobile engineering depth for clients needing app delivery beyond the browser.",
    highlights: [
      "React Native + TypeScript media workflows",
      "Playback queue and control patterns",
      "Mobile platform considerations",
      "Useful for app and media product clients",
    ],
    github: "https://github.com/whoisdjam/react-native-track-player",
    live: "https://rntp.dev/",
    screen: {
      frame: "browser",
      title: "rntp.dev",
      image: "/projects/react-native-track-player/live.jpg",
      theme: "dark",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectHref(project: Project) {
  return project.live ?? `/projects/${project.slug}`;
}

export const featuredProjects = projects.filter((project) => project.featured);
