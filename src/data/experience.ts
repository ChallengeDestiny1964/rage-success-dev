export type Experience = {
  slug: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  sector: string;
  /** Brand-inspired colour for the company monogram. */
  color: string;
  highlights: string[];
  stack: string[];
  summary: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    slug: "relevance-ai",
    company: "Relevance AI",
    role: "Senior Full-Stack AI Engineer",
    location: "Sydney, Australia",
    start: "Oct 2024",
    end: "Jul 2026",
    sector: "AI agent platform",
    color: "#6d4df2",
    highlights: [
      "Shipped LLM-powered product workflows to production",
      "Owned reliability, evaluation and edge-case quality",
      "Carried features from system design through deployment",
    ],
    stack: ["Python", "TypeScript", "LLMs", "AI Agents"],
    summary:
      "Designed and delivered production-grade full-stack and AI systems spanning backend services, APIs, databases, frontend applications, automation, and LLM-powered workflows.",
    bullets: [
      "Built and improved production systems across backend services, APIs, databases, frontend apps, and LLM-powered workflows.",
      "Owned complex engineering problems involving code quality, debugging, evaluation, performance, reliability, and edge-case handling.",
      "Applied strong software engineering fundamentals from system design and implementation through testing, optimisation, and deployment.",
      "Translated ambiguous technical requirements into robust, maintainable solutions for AI product workflows.",
    ],
  },
  {
    slug: "telstra",
    company: "Telstra",
    role: "Full-Stack AI Engineer",
    location: "Melbourne, Australia",
    start: "Dec 2022",
    end: "Sep 2024",
    sector: "Telecommunications",
    color: "#0b63e5",
    highlights: [
      "Built backend services and APIs for production systems at scale",
      "Traced complex bugs to root cause and shipped reliable fixes",
      "Automated delivery with Python, testing and CI/CD",
    ],
    stack: ["Python", "REST", "CI/CD"],
    summary:
      "Contributed to the design, implementation, testing, and ongoing improvement of production full-stack systems at scale.",
    bullets: [
      "Designed and developed backend services and APIs with a focus on clean architecture, reliability, and maintainable code.",
      "Built application features across the stack, connecting frontend components with backend services and data layers.",
      "Used Python and related tooling to solve technical problems, automate development tasks, and ship software components.",
      "Worked with databases, Git, testing, CI/CD, and modern delivery workflows throughout the software lifecycle.",
      "Investigated complex bugs, traced root causes, and implemented practical, reliable fixes with engineering stakeholders.",
    ],
  },
  {
    slug: "wisetech-global",
    company: "WiseTech Global",
    role: "Software Engineering Student | AI & Python",
    location: "Sydney, Australia",
    start: "Sep 2018",
    end: "Oct 2022",
    sector: "Logistics software",
    color: "#1b3a8c",
    highlights: [
      "Worked on application logic, backend services and APIs",
      "Built foundations in algorithms, data structures and design",
      "Studied AI and machine learning alongside production work",
    ],
    stack: ["Python", "APIs"],
    summary:
      "Started a professional software engineering journey while building depth in AI, machine learning, and production engineering practices.",
    bullets: [
      "Worked across application logic, backend services, APIs, debugging, testing, and system improvements.",
      "Used Python and other languages to build software, solve technical problems, and automate repetitive tasks.",
      "Developed a strong foundation in data structures, algorithms, software design, databases, and practical engineering.",
      "Learned how production software is designed, reviewed, tested, and maintained alongside experienced engineers.",
      "Studied AI and machine learning in parallel, building intuition for how intelligent systems behave in real products.",
    ],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Converts a "Mon YYYY" label into a month count for arithmetic. */
function toMonths(label: string) {
  const [month, year] = label.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(month);
}

export function formatTenure(start: string, end: string) {
  const total = toMonths(end) - toMonths(start) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [
    years ? `${years} yr${years > 1 ? "s" : ""}` : "",
    months ? `${months} mo${months > 1 ? "s" : ""}` : "",
  ];
  return parts.filter(Boolean).join(" ");
}

export function yearOf(label: string) {
  return label.split(" ")[1];
}

export const education = {
  school: "Western Sydney University",
  degree: "Master's Degree in Computer Software Engineering",
  location: "Sydney, Australia",
  start: "Mar 2018",
  end: "Mar 2022",
};
