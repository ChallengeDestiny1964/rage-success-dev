// Renders a designed cover for every project into public/projects/<slug>.jpg.
// Source screenshots live in scripts/covers/screens/<slug>.jpg.
//
//   node --experimental-strip-types scripts/covers/build.mjs [slug,slug]
//
// Set CHROME_PATH if Chrome is not at the default Windows location.

import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as lucide from "lucide-react";
import * as si from "simple-icons";
import { categories, domainOf, projects } from "../../src/data/projects.ts";
import { coverCopy } from "./copy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "public/projects");
const SCREENS = join(ROOT, "scripts/covers/screens");
const CHROME = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ONLY = process.argv[2]?.split(",");
const WIDTH = 1280;
const HEIGHT = 800;
const SCALE = 1.25;

const fileUrl = (p) => pathToFileURL(p).href;
const font = (file) => fileUrl(join(ROOT, "node_modules/geist/dist/fonts", file));

const brandIcons = {
  Python: si.siPython,
  "Next.js": si.siNextdotjs,
  FastAPI: si.siFastapi,
  React: si.siReact,
  "React Native": si.siReact,
  "Tailwind CSS": si.siTailwindcss,
  TypeScript: si.siTypescript,
  JavaScript: si.siJavascript,
  Gradio: si.siGradio,
  Docker: si.siDocker,
  "Hugging Face": si.siHuggingface,
  "Transformers.js": si.siHuggingface,
  Haystack: si.siHaystack,
  LangChain: si.siLangchain,
  WebAssembly: si.siWebassembly,
  Ollama: si.siOllama,
  Prisma: si.siPrisma,
  Redis: si.siRedis,
  Elixir: si.siElixir,
  Phoenix: si.siPhoenixframework,
  ClickHouse: si.siClickhouse,
  PostgreSQL: si.siPostgresql,
  "Socket.IO": si.siSocketdotio,
  Vite: si.siVite,
  Swift: si.siSwift,
  "Node.js": si.siNodedotjs,
  "Ruby on Rails": si.siRubyonrails,
  MCP: si.siModelcontextprotocol,
  HTML5: si.siHtml5,
  CSS: si.siCss,
  Stripe: si.siStripe,
  Expo: si.siExpo,
  Flutter: si.siFlutter,
  Dart: si.siDart,
  iOS: si.siIos,
  Android: si.siAndroid,
  "Material 3": si.siMaterialdesign,
  Firebase: si.siFirebase,
  "Discord API": si.siDiscord,
  OpenCV: si.siOpencv,
  Unity: si.siUnity,
  WebGL: si.siWebgl,
};

const categoryIcon = { ai: "BrainCircuit", web: "Globe", mobile: "Smartphone", bot: "Bot" };

function icon(name, size = 20, strokeWidth = 2) {
  const Icon = lucide[name] ?? lucide[`${name}Icon`];
  if (!Icon) throw new Error(`Unknown lucide icon: ${name}`);
  return renderToStaticMarkup(createElement(Icon, { size, strokeWidth, "aria-hidden": true }));
}

function stackTiles(stack) {
  const tiles = [];
  for (const name of stack) {
    const brand = brandIcons[name];
    if (brand) {
      tiles.push(
        `<span class="tile" title="${name}"><svg viewBox="0 0 24 24"><path d="${brand.path}"/></svg></span>`,
      );
    } else if (name === "C#") {
      tiles.push(`<span class="tile tile-text">C#</span>`);
    }
    if (tiles.length === 5) break;
  }
  return tiles.join("");
}

function stage(project) {
  const shot = fileUrl(join(SCREENS, `${project.slug}.jpg`));
  if (project.device === "mobile") {
    return `
      <div class="halo"></div>
      <div class="phone">
        <span class="island"></span>
        <div class="phone-screen"><img src="${shot}" alt=""></div>
        <span class="sheen"></span>
      </div>`;
  }
  return `
    <div class="halo"></div>
    <div class="window">
      <div class="bar">
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="url">${icon("Lock", 11, 2.5)}${domainOf(project.live)}</span>
        <span class="bar-spacer"></span>
      </div>
      <div class="screen"><img src="${shot}" alt=""><span class="sheen"></span></div>
    </div>`;
}

function html(project) {
  const copy = coverCopy[project.slug];
  if (!copy) throw new Error(`Missing cover copy for ${project.slug}`);
  const category = categories.find((c) => c.id === project.category);
  const [first, second] = copy.callouts;

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url("${font("geist-sans/Geist-Regular.woff2")}"); font-weight: 400; }
@font-face { font-family: Geist; src: url("${font("geist-sans/Geist-Medium.woff2")}"); font-weight: 500; }
@font-face { font-family: Geist; src: url("${font("geist-sans/Geist-SemiBold.woff2")}"); font-weight: 600; }
@font-face { font-family: Geist; src: url("${font("geist-sans/Geist-Bold.woff2")}"); font-weight: 700; }
@font-face { font-family: GeistMono; src: url("${font("geist-mono/GeistMono-Medium.woff2")}"); font-weight: 500; }
@font-face { font-family: Serif; font-style: italic; src: url("${fileUrl(join(ROOT, "src/app/fonts/instrument-serif-latin-400-italic.woff2"))}"); }

* { box-sizing: border-box; margin: 0; }
html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
body { font-family: Geist, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

.cover {
  --a: ${project.accent};
  --deep: oklch(from var(--a) 0.17 calc(c * 0.3) h);
  --alt: oklch(from var(--a) 0.62 calc(c * 0.9) calc(h + 48));
  position: relative; width: 100%; height: 100%; overflow: hidden; isolation: isolate;
  background: var(--deep);
  color: #fff;
}
.bg {
  position: absolute; inset: 0; z-index: -3;
  background:
    radial-gradient(62% 78% at 96% -4%, color-mix(in oklab, var(--a) 82%, transparent), transparent 64%),
    radial-gradient(48% 62% at -4% 104%, color-mix(in oklab, var(--alt) 46%, transparent), transparent 62%),
    radial-gradient(38% 46% at 62% 62%, color-mix(in oklab, var(--a) 26%, transparent), transparent 70%),
    linear-gradient(180deg, transparent 55%, oklch(from var(--a) 0.11 calc(c * 0.2) h / 0.7));
}
.grid {
  position: absolute; inset: 0; z-index: -2;
  background-image:
    linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: -1px -1px;
  mask-image: radial-gradient(70% 80% at 72% 28%, #000, transparent 75%);
}
.rings {
  position: absolute; z-index: -2; right: -220px; top: -260px; width: 980px; height: 980px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 0 0 110px rgba(255,255,255,0.008), 0 0 0 111px rgba(255,255,255,0.05),
              0 0 0 240px rgba(255,255,255,0.005), 0 0 0 241px rgba(255,255,255,0.035);
}
.grain {
  position: absolute; inset: 0; z-index: 5; pointer-events: none; opacity: 0.16; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.edge { position: absolute; inset: 0; z-index: 6; pointer-events: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.05); }

.copy { position: absolute; left: 72px; top: 70px; width: 470px; }
.pill {
  display: inline-flex; align-items: center; gap: 9px; padding: 8px 14px 8px 10px; border-radius: 999px;
  background: rgba(255,255,255,0.08); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
  backdrop-filter: blur(8px);
  font: 500 12.5px/1 GeistMono, monospace; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.86);
}
.pill .ico { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 999px; background: color-mix(in oklab, var(--a) 55%, transparent); color: #fff; }
.pill .live { display: inline-flex; align-items: center; gap: 7px; padding-left: 10px; margin-left: 2px; border-left: 1px solid rgba(255,255,255,0.18); }
.pill .live i { width: 7px; height: 7px; border-radius: 50%; background: #34d058; box-shadow: 0 0 0 3px rgba(52,208,88,0.22), 0 0 12px #34d058; }

h1 { margin-top: 26px; font-size: 66px; line-height: 0.98; font-weight: 600; letter-spacing: -0.045em; text-wrap: balance;
     background: linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.72)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tagline { margin-top: 18px; max-width: 420px; font-size: 23px; line-height: 1.32; font-weight: 400; color: rgba(255,255,255,0.7); text-wrap: pretty; }
.tagline em { font-family: Serif, serif; font-style: italic; font-size: 1.22em; line-height: 1; color: #fff; }

.stack { position: absolute; left: 72px; bottom: 68px; display: flex; gap: 10px; }
.tile {
  display: grid; place-items: center; width: 54px; height: 54px; border-radius: 15px;
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 24px -12px rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
}
.tile svg { width: 25px; height: 25px; fill: rgba(255,255,255,0.92); }
.tile-text { font: 700 19px/1 Geist; letter-spacing: -0.02em; color: rgba(255,255,255,0.92); }

.halo { position: absolute; z-index: -1; right: 40px; top: 120px; width: 640px; height: 520px; border-radius: 50%;
        background: color-mix(in oklab, var(--a) 60%, transparent); filter: blur(90px); opacity: 0.55; }

.window {
  position: absolute; left: 540px; top: 128px; width: 860px; border-radius: 16px; overflow: hidden;
  background: #111317;
  transform: perspective(2200px) rotateY(-12deg) rotateX(4deg) rotateZ(0.6deg);
  transform-origin: 0% 50%;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.14),
    0 2px 0 rgba(255,255,255,0.08) inset,
    0 40px 80px -24px rgba(0,0,0,0.75),
    0 80px 160px -40px color-mix(in oklab, var(--a) 70%, transparent);
}
.bar { display: flex; align-items: center; gap: 14px; height: 40px; padding: 0 16px; background: linear-gradient(180deg, #1d2026, #16181d); border-bottom: 1px solid rgba(255,255,255,0.07); }
.dots { display: flex; gap: 7px; }
.dots i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.dots i:nth-child(2) { background: #febc2e; }
.dots i:nth-child(3) { background: #28c840; }
.url { display: flex; align-items: center; gap: 7px; margin: 0 auto; padding: 6px 16px; border-radius: 8px; background: rgba(255,255,255,0.06);
       box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07); font: 500 12.5px/1 GeistMono, monospace; color: rgba(255,255,255,0.66); }
.url svg { opacity: 0.6; }
.bar-spacer { width: 47px; }
.screen { position: relative; aspect-ratio: 1440 / 900; overflow: hidden; }
.screen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.sheen { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, rgba(255,255,255,0.13), transparent 32%, transparent 70%, rgba(255,255,255,0.04)); }

.phone {
  position: absolute; left: 836px; top: 92px; width: 312px; aspect-ratio: 390 / 844; padding: 11px; border-radius: 54px;
  background: linear-gradient(150deg, #3a3f48, #121418 30%, #07080a);
  transform: perspective(1800px) rotateY(-14deg) rotateX(5deg) rotateZ(3deg);
  box-shadow:
    inset 0 0 0 1.5px rgba(255,255,255,0.18),
    inset 0 0 0 5px #050506,
    0 0 0 1px rgba(0,0,0,0.5),
    0 40px 80px -20px rgba(0,0,0,0.75),
    0 90px 160px -40px color-mix(in oklab, var(--a) 75%, transparent);
}
.phone-screen { position: relative; height: 100%; overflow: hidden; border-radius: 44px; background: #000; }
.phone-screen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.phone .sheen { border-radius: 54px; }
.island { position: absolute; z-index: 2; top: 22px; left: 50%; width: 92px; height: 27px; border-radius: 999px; background: #000; transform: translateX(-50%); }
.mobile .halo { right: 60px; top: 90px; width: 520px; height: 600px; }

.callout {
  position: absolute; z-index: 3; display: flex; align-items: center; gap: 12px; padding: 11px 20px 11px 11px; border-radius: 18px;
  background: rgba(255,255,255,0.95); color: #0b1020;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.6), 0 24px 48px -16px rgba(0,0,0,0.6), 0 8px 16px -8px rgba(0,0,0,0.3);
  font-size: 17px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap;
}
.callout .ico { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px;
                background: color-mix(in oklab, var(--a) 16%, white); color: oklch(from var(--a) 0.45 calc(c * 1.1) h); }
.callout small { display: block; margin-top: 2px; font: 500 11px/1.2 GeistMono, monospace; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
.desktop .c1 { left: 470px; top: 452px; }
.desktop .c2 { left: 556px; top: 552px; }
.mobile .c1 { left: 560px; top: 400px; }
.mobile .c2 { left: 620px; top: 500px; }
</style></head>
<body>
<div class="cover ${project.device}">
  <div class="bg"></div><div class="grid"></div><div class="rings"></div>
  <div class="copy">
    <span class="pill"><span class="ico">${icon(categoryIcon[project.category], 13, 2.4)}</span>${category.label}<span class="live"><i></i>Live</span></span>
    <h1>${project.title}</h1>
    <p class="tagline">${copy.tagline}</p>
  </div>
  ${stage(project)}
  <div class="callout c1" style="${copy.positions?.[0] ?? ""}"><span class="ico">${icon(first[0], 19, 2.2)}</span><span>${first[1]}<small>${first[2]}</small></span></div>
  <div class="callout c2" style="${copy.positions?.[1] ?? ""}"><span class="ico">${icon(second[0], 19, 2.2)}</span><span>${second[1]}<small>${second[2]}</small></span></div>
  <div class="stack">${stackTiles(project.stack)}</div>
  <div class="grain"></div><div class="edge"></div>
</div>
</body></html>`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect(port) {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return new WebSocket(page.webSocketDebuggerUrl);
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome did not start");
}

const work = join(tmpdir(), `covers-${process.pid}`);
mkdirSync(work, { recursive: true });
mkdirSync(OUT, { recursive: true });

const port = 9500 + Math.floor(Math.random() * 300);
const chrome = spawn(CHROME, [
  "--headless=new",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  "--force-color-profile=srgb",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(work, "profile")}`,
  "about:blank",
]);

const ws = await connect(port);
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const id = ++seq;
    pending.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: SCALE, mobile: false });

try {
  for (const project of projects) {
    if (ONLY && !ONLY.includes(project.slug)) continue;
    const page = join(work, `${project.slug}.html`);
    writeFileSync(page, html(project));
    await send("Page.navigate", { url: fileUrl(page) });
    await send("Runtime.evaluate", {
      expression: "Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode().catch(() => {}))])",
      awaitPromise: true,
    });
    await sleep(250);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 86 });
    writeFileSync(join(OUT, `${project.slug}.jpg`), Buffer.from(shot.result.data, "base64"));
    console.log(`cover  ${project.slug}`);
  }
} finally {
  ws.close();
  chrome.kill();
  await sleep(500);
  rmSync(work, { recursive: true, force: true });
}
