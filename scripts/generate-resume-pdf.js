const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outPath = path.join(__dirname, "..", "public", "Mohamed-Rage-Resume.pdf");
const doc = new PDFDocument({
  margin: 48,
  size: "A4",
  info: {
    Title: "Mohamed Rage — Resume",
    Author: "Mohamed Rage",
  },
});

doc.pipe(fs.createWriteStream(outPath));

const ink = "#102033";
const muted = "#5b6b7c";
const accent = "#0b5f75";

function section(title) {
  doc.moveDown(0.8);
  doc.fillColor(accent).font("Helvetica-Bold").fontSize(11).text(title.toUpperCase());
  doc
    .moveTo(doc.page.margins.left, doc.y + 4)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 4)
    .strokeColor("#d7e3ec")
    .stroke();
  doc.moveDown(0.6);
  doc.fillColor(ink);
}

function bullet(text) {
  const x = doc.page.margins.left;
  const bulletX = x;
  const textX = x + 12;
  const width = doc.page.width - doc.page.margins.right - textX;
  const y = doc.y;
  doc.fillColor(accent).circle(bulletX + 2, y + 5, 1.5).fill();
  doc.fillColor(muted).font("Helvetica").fontSize(9.5).text(text, textX, y, {
    width,
    lineGap: 1.5,
  });
  doc.moveDown(0.25);
}

doc.fillColor(ink).font("Helvetica-Bold").fontSize(22).text("Mohamed Rage");
doc.fillColor(accent).font("Helvetica-Bold").fontSize(12).text("Senior Full-Stack AI Engineer");
doc.moveDown(0.3);
doc
  .fillColor(muted)
  .font("Helvetica")
  .fontSize(9.5)
  .text("Sydney, Australia  ·  1mohamed.rage1@gmail.com  ·  +61 405 365 011");
doc.text("github.com/whoisdjam  ·  linkedin.com/in/mohamed-rage-534b88421");

section("Summary");
doc
  .fillColor(muted)
  .font("Helvetica")
  .fontSize(9.5)
  .text(
    "Senior Full-Stack AI Engineer with 8+ years of professional software engineering experience across Python, TypeScript, React, Node.js, APIs, cloud systems, AI/ML, LLMs, and generative AI. Experienced in building and evaluating production-grade software and AI systems, with strong expertise in architecture, algorithms, debugging, code review, and complex technical problem-solving. Available for expert-level AI training, model evaluation, coding assessment, software engineering, and LLM evaluation projects.",
    { lineGap: 2 },
  );

section("Experience");

doc.fillColor(ink).font("Helvetica-Bold").fontSize(10.5).text("Senior Full-Stack AI Engineer, Relevance AI");
doc.fillColor(muted).font("Helvetica").fontSize(9).text("Oct 2024 – Jul 2026 | Sydney, Australia");
doc.moveDown(0.25);
[
  "Designed and delivered production-grade full-stack and AI systems spanning backend services, APIs, databases, frontend applications, automation, and LLM-powered workflows.",
  "Owned complex engineering problems involving code quality, debugging, evaluation, performance, reliability, and edge-case handling.",
  "Applied strong software engineering fundamentals from system design through testing, optimisation, and deployment.",
  "Translated ambiguous technical requirements into robust, maintainable solutions.",
].forEach(bullet);

doc.moveDown(0.35);
doc.fillColor(ink).font("Helvetica-Bold").fontSize(10.5).text("Full-Stack AI Engineer, Telstra");
doc.fillColor(muted).font("Helvetica").fontSize(9).text("Dec 2022 – Sep 2024 | Melbourne, Australia");
doc.moveDown(0.25);
[
  "Contributed to design, implementation, testing, and ongoing improvement of production full-stack systems.",
  "Designed and developed backend services and APIs with clean architecture and reliability focus.",
  "Built features across the stack connecting frontend components with backend services and data.",
  "Worked with databases, Git, testing, CI/CD, and modern delivery workflows.",
  "Investigated complex bugs, traced root causes, and implemented practical fixes.",
].forEach(bullet);

doc.moveDown(0.35);
doc
  .fillColor(ink)
  .font("Helvetica-Bold")
  .fontSize(10.5)
  .text("Software Engineering Student | AI & Python, WiseTech Global");
doc.fillColor(muted).font("Helvetica").fontSize(9).text("Sep 2018 – Oct 2022 | Sydney, Australia");
doc.moveDown(0.25);
[
  "Built foundational production engineering skills across application logic, backend services, APIs, debugging, and testing.",
  "Used Python and other languages to build software, solve problems, and automate tasks.",
  "Developed strength in data structures, algorithms, software design, and databases.",
  "Studied AI and machine learning alongside professional engineering work.",
].forEach(bullet);

section("Selected Projects");
[
  "Multi-Agent LLM Trading System — LangGraph multi-agent framework (Python, LLMs)",
  "Auto Modeler Evolve — iterative model search and evaluation (Python)",
  "Cash Clock — TypeScript productivity / billing clarity product",
  "Sell Store — conversion-focused e-commerce storefront engineering",
].forEach(bullet);

section("Skills");
const skills = [
  ["Languages", "TypeScript, JavaScript, Python, Java, Go"],
  ["Frontend", "React, Next.js, Angular, Vue.js, Tailwind CSS, Vite, Material UI"],
  ["Backend", "Node.js, NestJS, FastAPI, Django, Flask, REST, GraphQL"],
  ["Data & Cloud", "PostgreSQL, MongoDB, Redis, Vector DBs, AWS, GCP, Azure"],
  ["AI", "LLM Apps, AI Agents, RAG, Prompt Engineering, LangChain, LangGraph, OpenAI API"],
  ["Delivery", "Docker, Kubernetes, CI/CD, GitHub Actions, Jest, Playwright, System Design"],
];
skills.forEach(([label, value]) => {
  doc
    .fillColor(ink)
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .text(`${label}: `, { continued: true })
    .font("Helvetica")
    .fillColor(muted)
    .text(value);
});

section("Education");
doc.fillColor(ink).font("Helvetica-Bold").fontSize(10.5).text("Master's Degree in Computer Software Engineering");
doc
  .fillColor(muted)
  .font("Helvetica")
  .fontSize(9.5)
  .text("Western Sydney University · Sydney, Australia");
doc.text("Mar 2018 – Mar 2022");
doc.moveDown(0.4);
doc.text("Languages: English");

doc.end();
console.log(`Wrote ${outPath}`);
