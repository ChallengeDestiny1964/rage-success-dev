export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "Tailwind CSS",
      "Vite",
      "Material UI",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "NestJS",
      "FastAPI",
      "Django",
      "Flask",
      "REST",
      "GraphQL",
    ],
  },
  {
    title: "Data & Cloud",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Vector DBs",
      "AWS",
      "GCP",
      "Azure",
    ],
  },
  {
    title: "AI & LLMs",
    items: [
      "LLM Apps",
      "AI Agents",
      "RAG",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "OpenAI API",
    ],
  },
  {
    title: "Delivery",
    items: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Jest",
      "Playwright",
      "System Design",
    ],
  },
] as const;

export const focusAreas = [
  {
    title: "Full-stack product delivery",
    body: "Ship reliable React/Next.js frontends with typed APIs, clean architecture, and production-ready backend services.",
  },
  {
    title: "AI systems & agents",
    body: "Design LLM workflows, RAG pipelines, agent orchestration, and evaluation loops that hold up beyond demos.",
  },
  {
    title: "AI training & evaluation",
    body: "Assess AI-generated code and technical responses for correctness, reasoning quality, edge cases, and real-world applicability.",
  },
] as const;
