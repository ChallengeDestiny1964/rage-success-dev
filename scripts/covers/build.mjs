// Product-first showcase covers → public/projects/<slug>.jpg
// Aspect ratio matches the portfolio tile preview (16:10).
// Title / stack live in the card UI — covers focus on the running product.
//
//   node --no-warnings --experimental-strip-types scripts/covers/build.mjs [slug,slug]

import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as lucide from "lucide-react";
import { categories, domainOf, projects } from "../../src/data/projects.ts";
import { coverCopy } from "./copy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "public/projects");
const SCREENS = join(ROOT, "scripts/covers/screens");
const CHROME = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ONLY = process.argv[2]?.split(",");
const WIDTH = 1600;
const HEIGHT = 1000;
const SCALE = 2;

const fileUrl = (p) => pathToFileURL(p).href;
const font = (file) => fileUrl(join(ROOT, "node_modules/geist/dist/fonts", file));

const categoryIcon = { ai: "BrainCircuit", web: "Globe", mobile: "Smartphone", bot: "Bot" };

function icon(name, size = 20, strokeWidth = 2) {
  const Icon = lucide[name] ?? lucide[`${name}Icon`];
  if (!Icon) throw new Error(`Unknown lucide icon: ${name}`);
  return renderToStaticMarkup(createElement(Icon, { size, strokeWidth, "aria-hidden": true }));
}

function stage(project) {
  const shot = fileUrl(join(SCREENS, `${project.slug}.jpg`));
  if (project.device === "mobile") {
    return `
      <div class="stage mobile">
        <div class="glow"></div>
        <div class="orb o1"></div><div class="orb o2"></div>
        <div class="phone">
          <span class="bezel"></span>
          <span class="island"></span>
          <div class="screen"><img src="${shot}" alt=""></div>
          <span class="shine"></span>
        </div>
        <div class="floor"></div>
      </div>`;
  }
  return `
    <div class="stage desktop">
      <div class="glow"></div>
      <div class="orb o1"></div><div class="orb o2"></div>
      <div class="window">
        <div class="chrome">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="url">${icon("Lock", 12, 2.5)}${domainOf(project.live)}</span>
          <span class="pad"></span>
        </div>
        <div class="screen"><img src="${shot}" alt=""><span class="shine"></span></div>
        <span class="rim"></span>
      </div>
      <div class="floor"></div>
    </div>`;
}

function html(project) {
  const copy = coverCopy[project.slug];
  if (!copy) throw new Error(`Missing cover copy for ${project.slug}`);
  const category = categories.find((c) => c.id === project.category);
  const [a, b] = copy.callouts;

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url("${font("geist-sans/Geist-Medium.woff2")}"); font-weight: 500; }
@font-face { font-family: Geist; src: url("${font("geist-sans/Geist-SemiBold.woff2")}"); font-weight: 600; }
@font-face { font-family: GeistMono; src: url("${font("geist-mono/GeistMono-Medium.woff2")}"); font-weight: 500; }

* { box-sizing: border-box; margin: 0; }
html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
body { font-family: Geist, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

.cover {
  --a: ${project.accent};
  --deep: oklch(from var(--a) 0.12 calc(c * 0.2) h);
  --mid: oklch(from var(--a) 0.18 calc(c * 0.28) h);
  --alt: oklch(from var(--a) 0.62 calc(c * 0.9) calc(h + 48));
  --lite: color-mix(in oklab, var(--a) 72%, white);
  position: relative; width: 100%; height: 100%; overflow: hidden; isolation: isolate;
  background: var(--deep); color: #fff;
}

.bg {
  position: absolute; inset: 0; z-index: 0;
  background:
    radial-gradient(60% 70% at 50% 20%, color-mix(in oklab, var(--a) 55%, transparent), transparent 68%),
    radial-gradient(45% 50% at 15% 85%, color-mix(in oklab, var(--alt) 35%, transparent), transparent 62%),
    radial-gradient(40% 45% at 90% 80%, color-mix(in oklab, var(--a) 28%, transparent), transparent 60%),
    linear-gradient(180deg, var(--mid) 0%, var(--deep) 48%, #05070a 100%);
}
.mesh {
  position: absolute; inset: -30%; z-index: 0; opacity: 0.45;
  background: conic-gradient(from 200deg at 50% 40%,
    color-mix(in oklab, var(--a) 30%, transparent),
    transparent 25%,
    color-mix(in oklab, var(--alt) 22%, transparent) 50%,
    transparent 70%,
    color-mix(in oklab, var(--lite) 18%, transparent));
  filter: blur(60px);
}
.grid {
  position: absolute; inset: 0; z-index: 1;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 65% at 50% 42%, #000 10%, transparent 75%);
}
.ring {
  position: absolute; z-index: 1; left: 50%; top: 38%; width: 980px; height: 980px;
  transform: translate(-50%, -50%); border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 0 0 140px rgba(255,255,255,0.015), 0 0 0 141px rgba(255,255,255,0.035);
}
.grain {
  position: absolute; inset: 0; z-index: 8; pointer-events: none; opacity: 0.14; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.edge {
  position: absolute; inset: 0; z-index: 9; pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.12);
}
.vignette {
  position: absolute; inset: 0; z-index: 7; pointer-events: none;
  background: radial-gradient(75% 70% at 50% 40%, transparent 40%, rgba(0,0,0,0.45) 100%);
}

/* Top bar */
.top {
  position: absolute; z-index: 6; left: 48px; right: 48px; top: 36px;
  display: flex; align-items: center; justify-content: space-between;
}
.badges { display: flex; gap: 10px; align-items: center; }
.pill {
  display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 8px 24px -12px rgba(0,0,0,0.5);
  backdrop-filter: blur(14px);
  font: 500 12px/1 GeistMono, monospace; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.9);
}
.pill .ico {
  display: grid; place-items: center; width: 24px; height: 24px; border-radius: 999px;
  background: linear-gradient(145deg, color-mix(in oklab, var(--a) 75%, white), var(--a));
  box-shadow: 0 0 16px color-mix(in oklab, var(--a) 45%, transparent);
}
.live {
  display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px;
  border-radius: 999px;
  background: rgba(52, 208, 88, 0.12);
  box-shadow: inset 0 0 0 1px rgba(52, 208, 88, 0.35);
  font: 500 12px/1 GeistMono, monospace; letter-spacing: 0.14em; text-transform: uppercase;
  color: #9dffb8;
}
.live i {
  width: 7px; height: 7px; border-radius: 50%; background: #34d058;
  box-shadow: 0 0 0 4px rgba(52,208,88,0.2), 0 0 12px #34d058;
}
.host {
  font: 500 13px/1 GeistMono, monospace; letter-spacing: 0.04em;
  color: rgba(255,255,255,0.45);
}

/* Stage — product is the hero */
.stage { position: absolute; inset: 0; z-index: 3; }
.glow {
  position: absolute; left: 50%; top: 46%; width: 900px; height: 520px;
  transform: translate(-50%, -50%); border-radius: 50%;
  background: color-mix(in oklab, var(--a) 55%, transparent); filter: blur(90px); opacity: 0.75;
}
.orb { position: absolute; border-radius: 50%; filter: blur(32px); opacity: 0.5; }
.orb.o1 { left: 18%; top: 22%; width: 140px; height: 140px; background: color-mix(in oklab, var(--lite) 80%, white); }
.orb.o2 { right: 14%; top: 58%; width: 120px; height: 120px; background: color-mix(in oklab, var(--alt) 70%, transparent); }

.window {
  position: absolute; left: 50%; top: 108px; width: 1180px;
  transform: translateX(-50%) perspective(2400px) rotateX(6deg);
  transform-origin: center top;
  border-radius: 20px; overflow: hidden; background: #0a0c10;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.16),
    0 2px 0 rgba(255,255,255,0.1) inset,
    0 40px 80px -20px rgba(0,0,0,0.75),
    0 0 100px -10px color-mix(in oklab, var(--a) 50%, transparent);
}
.rim {
  position: absolute; inset: 0; z-index: 3; pointer-events: none; border-radius: inherit;
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--lite) 28%, transparent);
}
.chrome {
  display: flex; align-items: center; gap: 14px; height: 44px; padding: 0 16px;
  background: linear-gradient(180deg, #2a2f38, #151820);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.dots { display: flex; gap: 7px; }
.dots i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.dots i:nth-child(2) { background: #febc2e; }
.dots i:nth-child(3) { background: #28c840; }
.url {
  display: flex; align-items: center; gap: 8px; margin: 0 auto; padding: 6px 18px; border-radius: 9px;
  background: rgba(255,255,255,0.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
  font: 500 13px/1 GeistMono, monospace; color: rgba(255,255,255,0.68);
}
.pad { width: 52px; }
.screen { position: relative; aspect-ratio: 16 / 9.2; overflow: hidden; background: #000; }
.screen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.shine {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, rgba(255,255,255,0.16), transparent 26%, transparent 62%, rgba(255,255,255,0.04));
}
.floor {
  position: absolute; left: 50%; bottom: 28px; width: 900px; height: 70px;
  transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%);
  filter: blur(16px);
}

.phone {
  position: absolute; left: 50%; top: 72px; width: 340px; aspect-ratio: 390 / 844;
  transform: translateX(-50%) perspective(2000px) rotateX(4deg);
  padding: 13px; border-radius: 56px;
  background: linear-gradient(155deg, #555b66, #1a1e26 28%, #050608);
  box-shadow:
    inset 0 0 0 1.5px rgba(255,255,255,0.2),
    inset 0 0 0 5px #050506,
    0 40px 90px -20px rgba(0,0,0,0.8),
    0 0 80px -8px color-mix(in oklab, var(--a) 55%, transparent);
}
.phone .screen { height: 100%; aspect-ratio: auto; border-radius: 44px; }
.phone .shine { border-radius: 56px; }
.island {
  position: absolute; z-index: 3; top: 24px; left: 50%; transform: translateX(-50%);
  width: 100px; height: 30px; border-radius: 999px; background: #000;
}
.bezel {
  position: absolute; inset: 0; z-index: 4; pointer-events: none; border-radius: inherit;
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--lite) 35%, transparent);
}
.mobile .glow { width: 520px; height: 640px; }
.mobile .floor { width: 420px; }

/* Feature chips — float near product, not covering the hero UI */
.chip {
  position: absolute; z-index: 6; display: flex; align-items: center; gap: 12px;
  padding: 12px 18px 12px 12px; border-radius: 16px;
  background: rgba(255,255,255,0.94);
  color: #0b1020;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.65),
    0 20px 40px -14px rgba(0,0,0,0.5),
    0 0 32px -10px color-mix(in oklab, var(--a) 40%, transparent);
  font-size: 15.5px; font-weight: 600; letter-spacing: -0.015em; white-space: nowrap;
  backdrop-filter: blur(12px);
}
.chip .ico {
  display: grid; place-items: center; width: 36px; height: 36px; border-radius: 11px;
  background: color-mix(in oklab, var(--a) 14%, white);
  color: oklch(from var(--a) 0.42 calc(c * 1.1) h);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--a) 18%, transparent);
}
.chip small {
  display: block; margin-top: 2px;
  font: 500 10px/1.2 GeistMono, monospace; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280;
}
.desktop .c1 { left: 56px; top: 52%; }
.desktop .c2 { right: 56px; top: 62%; }
.mobile .c1 { left: 72px; top: 48%; }
.mobile .c2 { right: 72px; top: 58%; }
</style></head>
<body>
<div class="cover ${project.device}">
  <div class="bg"></div>
  <div class="mesh"></div>
  <div class="grid"></div>
  <div class="ring"></div>

  <div class="top">
    <div class="badges">
      <span class="pill"><span class="ico">${icon(categoryIcon[project.category], 12, 2.4)}</span>${category.label}</span>
      <span class="live"><i></i>Live</span>
    </div>
    <span class="host">${domainOf(project.live)}</span>
  </div>

  ${stage(project)}

  <div class="chip c1"><span class="ico">${icon(a[0], 17, 2.2)}</span><span>${a[1]}<small>${a[2]}</small></span></div>
  <div class="chip c2"><span class="ico">${icon(b[0], 17, 2.2)}</span><span>${b[1]}<small>${b[2]}</small></span></div>

  <div class="vignette"></div>
  <div class="grain"></div>
  <div class="edge"></div>
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
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: SCALE,
  mobile: false,
});

try {
  for (const project of projects) {
    if (ONLY && !ONLY.includes(project.slug)) continue;
    const page = join(work, `${project.slug}.html`);
    writeFileSync(page, html(project));
    await send("Page.navigate", { url: fileUrl(page) });
    await send("Runtime.evaluate", {
      expression:
        "Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode().catch(() => {}))])",
      awaitPromise: true,
    });
    await sleep(300);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 92 });
    writeFileSync(join(OUT, `${project.slug}.jpg`), Buffer.from(shot.result.data, "base64"));
    console.log(`cover  ${project.slug}`);
  }
} finally {
  ws.close();
  chrome.kill();
  await sleep(500);
  rmSync(work, { recursive: true, force: true });
}
