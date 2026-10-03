export type ProjectCategory = "ai" | "web" | "mobile" | "bot";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  stack: string[];
  live: string;
  /** First running screen, captured from the live product. */
  image: string;
  /** Mobile projects are captured at phone size and shown in a device frame. */
  device: "desktop" | "mobile";
  /** Brand colour used to tint the preview backdrop. */
  accent: string;
};

export const categories: {
  id: ProjectCategory;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    id: "ai",
    label: "AI",
    title: "AI products & agents",
    description: "Agentic RAG, LLM pipelines, vector search and in-browser ML.",
  },
  {
    id: "web",
    label: "Web",
    title: "Web platforms & SaaS",
    description: "Product-grade web apps, analytics, collaboration and developer APIs.",
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "Mobile & cross-platform apps",
    description: "Flutter and React Native apps with rich motion and adaptive UI.",
  },
  {
    id: "bot",
    label: "Bots",
    title: "Bots, automation & games",
    description: "Discord bots, game automation and the game products around them.",
  },
];

export const projects: Project[] = [
  // ——— AI ———
  {
    slug: "elysia",
    title: "Elysia",
    subtitle: "Open-source agentic RAG platform that decides which tools to run on the fly.",
    category: "ai",
    featured: true,
    stack: ["Python", "DSPy", "Weaviate", "FastAPI", "Next.js", "AI Agents"],
    live: "https://elysia.weaviate.io/",
    image: "/projects/elysia.jpg",
    device: "desktop",
    accent: "#a855f7",
  },
  {
    slug: "pdf-chat",
    title: "RAG PDF Chat",
    subtitle: "Chat with any PDF through a multi-agent RAG pipeline with streamed answers.",
    category: "ai",
    featured: false,
    stack: ["Python", "FastAPI", "React", "Tailwind CSS", "RAG", "SSE"],
    live: "https://pdf-chat-scrapper.vercel.app/",
    image: "/projects/pdf-chat.jpg",
    device: "desktop",
    accent: "#7c3aed",
  },
  {
    slug: "weaviate-playground",
    title: "Weaviate Playground",
    subtitle: "Live demo hub for vector search, RAG, agent memory and multimodal retrieval.",
    category: "ai",
    featured: false,
    stack: ["Next.js", "TypeScript", "Weaviate", "Vector DBs", "RAG"],
    live: "https://playground.weaviate.io/",
    image: "/projects/weaviate-playground.jpg",
    device: "desktop",
    accent: "#22c55e",
  },
  {
    slug: "huggingface-spaces",
    title: "Hugging Face Spaces",
    subtitle: "The AI app directory: thousands of running ML demos, agents and MCP servers.",
    category: "ai",
    featured: false,
    stack: ["Python", "Gradio", "Docker", "Hugging Face", "LLMs"],
    live: "https://huggingface.co/spaces",
    image: "/projects/huggingface-spaces.jpg",
    device: "desktop",
    accent: "#f5b800",
  },
  {
    slug: "haystack",
    title: "Haystack Demos",
    subtitle: "LLM pipeline demos built on the Haystack orchestration framework.",
    category: "ai",
    featured: false,
    stack: ["Python", "Haystack", "RAG", "LLMs", "Hugging Face"],
    live: "https://haystack.deepset.ai/overview/demo",
    image: "/projects/haystack.jpg",
    device: "desktop",
    accent: "#2f6bff",
  },
  {
    slug: "webml-chat",
    title: "WebML Document Chat",
    subtitle: "Fully local chat over documents, with embeddings, vector store and LLM in the browser.",
    category: "ai",
    featured: false,
    stack: ["Next.js", "LangChain", "Transformers.js", "WebAssembly", "Ollama"],
    live: "https://webml-demo.vercel.app",
    image: "/projects/webml-chat.jpg",
    device: "desktop",
    accent: "#0ea5e9",
  },

  // ——— Web ———
  {
    slug: "dub",
    title: "Dub",
    subtitle: "Link attribution platform for short links, conversion tracking and affiliate programs.",
    category: "web",
    featured: true,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Redis"],
    live: "https://dub.co",
    image: "/projects/dub.jpg",
    device: "desktop",
    accent: "#8b5cf6",
  },
  {
    slug: "plausible",
    title: "Plausible Analytics",
    subtitle: "Lightweight, privacy-friendly alternative to Google Analytics.",
    category: "web",
    featured: false,
    stack: ["Elixir", "Phoenix", "ClickHouse", "PostgreSQL", "React"],
    live: "https://plausible.io",
    image: "/projects/plausible.jpg",
    device: "desktop",
    accent: "#5850ec",
  },
  {
    slug: "excalidraw",
    title: "Excalidraw",
    subtitle: "Hand-drawn style whiteboard with real-time, end-to-end encrypted collaboration.",
    category: "web",
    featured: false,
    stack: ["React", "TypeScript", "Canvas", "Socket.IO", "Vite"],
    live: "https://excalidraw.com/",
    image: "/projects/excalidraw.jpg",
    device: "desktop",
    accent: "#6965db",
  },
  {
    slug: "raycast",
    title: "Raycast",
    subtitle: "Extendable launcher with AI, snippets, window management and thousands of extensions.",
    category: "web",
    featured: false,
    stack: ["TypeScript", "React", "Swift", "Node.js", "LLMs"],
    live: "https://www.raycast.com/",
    image: "/projects/raycast.jpg",
    device: "desktop",
    accent: "#ff6363",
  },
  {
    slug: "bannerbear",
    title: "Bannerbear",
    subtitle: "API for automated, template-based image, PDF and video generation.",
    category: "web",
    featured: false,
    stack: ["Ruby on Rails", "REST", "Automation", "Media APIs", "MCP"],
    live: "https://bannerbear.com",
    image: "/projects/bannerbear.jpg",
    device: "desktop",
    accent: "#e7a900",
  },
  {
    slug: "carrd",
    title: "Carrd",
    subtitle: "Simple, free, fully responsive one-page sites for pretty much anything.",
    category: "web",
    featured: false,
    stack: ["JavaScript", "HTML5", "CSS", "Responsive UI", "Stripe"],
    live: "https://carrd.co",
    image: "/projects/carrd.jpg",
    device: "desktop",
    accent: "#5b4fd6",
  },

  // ——— Mobile ———
  {
    slug: "reactiive",
    title: "Reactiive Demos",
    subtitle: "110+ React Native animations built with Skia, Reanimated and Gesture Handler.",
    category: "mobile",
    featured: true,
    stack: ["React Native", "TypeScript", "Reanimated", "Skia", "Expo"],
    live: "https://reactiive.io/demos",
    image: "/projects/reactiive.jpg",
    device: "mobile",
    accent: "#6366f1",
  },
  {
    slug: "wonderous",
    title: "Wonderous",
    subtitle: "Flutter app that explores the wonders of the world through animated storytelling.",
    category: "mobile",
    featured: false,
    stack: ["Flutter", "Dart", "Animations", "iOS", "Android"],
    live: "https://wonderous.app/web/",
    image: "/projects/wonderous.jpg",
    device: "mobile",
    accent: "#c98a3a",
  },
  {
    slug: "material3-showcase",
    title: "Material 3 Showcase",
    subtitle: "Flutter reference app for Material 3 components, theming and dynamic colour.",
    category: "mobile",
    featured: false,
    stack: ["Flutter", "Dart", "Material 3", "Theming"],
    live: "https://flutter-material3-showcase.web.app/",
    image: "/projects/material3-showcase.jpg",
    device: "desktop",
    accent: "#6750a4",
  },
  {
    slug: "material3-expressive",
    title: "Material 3 Expressive",
    subtitle: "Flutter package bringing Material 3 Expressive motion and shapes to apps.",
    category: "mobile",
    featured: false,
    stack: ["Flutter", "Dart", "Material 3", "Motion"],
    live: "https://paadevelopments.github.io/material_3_expressive/",
    image: "/projects/material3-expressive.jpg",
    device: "mobile",
    accent: "#7c4dff",
  },
  {
    slug: "flutter-folio",
    title: "Flutter Folio",
    subtitle: "Platform-adaptive scrapbooking app for desktop, mobile and the web.",
    category: "mobile",
    featured: false,
    stack: ["Flutter", "Dart", "Firebase", "Desktop UX"],
    live: "https://flutter.gskinner.com/folio/",
    image: "/projects/flutter-folio.jpg",
    device: "mobile",
    accent: "#2e9df0",
  },

  // ——— Bots ———
  {
    slug: "clover",
    title: "Clover",
    subtitle: "Discord gaming bot with 50+ multiplayer games, trusted by 52,000+ servers.",
    category: "bot",
    featured: true,
    stack: ["Node.js", "Discord API", "TypeScript", "Next.js", "Game State"],
    live: "https://clovers.gg/en",
    image: "/projects/clover.jpg",
    device: "desktop",
    accent: "#a855f7",
  },
  {
    slug: "godlikebots",
    title: "GodLikeBots",
    subtitle: "Automation bots for top mobile strategy games, running around the clock.",
    category: "bot",
    featured: false,
    stack: ["Python", "OpenCV", "Automation", "ADB", "Discord API"],
    live: "https://godlikebots.com/",
    image: "/projects/godlikebots.jpg",
    device: "desktop",
    accent: "#ef4444",
  },
  {
    slug: "unwind-games",
    title: "Unwind Games",
    subtitle: "Casual mobile game studio behind the cozy puzzle adventure Fluffu's Journey.",
    category: "bot",
    featured: false,
    stack: ["Unity", "C#", "Android", "Game State"],
    live: "https://www.unwindgames.in/",
    image: "/projects/unwind-games.jpg",
    device: "desktop",
    accent: "#f5b800",
  },
  {
    slug: "tideglass",
    title: "Tideglass Studio",
    subtitle: "Independent studio shipping Accretion: Clash of Planets on Google Play and the web.",
    category: "bot",
    featured: false,
    stack: ["TypeScript", "WebGL", "Android", "Game State"],
    live: "https://tideglass.studio/",
    image: "/projects/tideglass.jpg",
    device: "desktop",
    accent: "#2dd4bf",
  },
  {
    slug: "space-critters",
    title: "Space Critters",
    subtitle: "Puzzle-arcade mobile game: smash combos, blast cubes and save the critters.",
    category: "bot",
    featured: false,
    stack: ["Unity", "C#", "iOS", "Game State"],
    live: "https://www.spacecrittersgame.com/",
    image: "/projects/space-critters.jpg",
    device: "desktop",
    accent: "#1d8cf8",
  },
];

export function domainOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

export function projectsIn(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}

export const featuredProjects = projects.filter((project) => project.featured);
