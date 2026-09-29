const tech = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "FastAPI",
  "LangGraph",
  "LangChain",
  "RAG",
  "LLM Agents",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "Node.js",
  "System Design",
  "Evaluation",
];

export function TechMarquee() {
  const items = [...tech, ...tech];

  return (
    <div className="marquee border-y border-line bg-white/40 py-5 backdrop-blur-md">
      <div className="marquee-track" aria-hidden>
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            <span />
            {item}
          </span>
        ))}
      </div>
      <span className="sr-only">Technologies: {tech.join(", ")}</span>
    </div>
  );
}
