import { ScaledCanvas } from "@/components/screens/ScaledCanvas";

const GRAPH_W = 480;
const GRAPH_H = 360;

type Status = "running" | "done";

type AgentNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  name: string;
  detail: string;
  status: Status;
  gate?: boolean;
};

const nodes: AgentNode[] = [
  { id: "orchestrator", x: 240, y: 42, w: 200, name: "Orchestrator", detail: "plan · route · tools", status: "running" },
  { id: "analyst", x: 84, y: 142, w: 140, name: "Analyst", detail: "fundamentals", status: "done" },
  { id: "researcher", x: 240, y: 142, w: 140, name: "Researcher", detail: "search · RAG", status: "running" },
  { id: "risk", x: 396, y: 142, w: 140, name: "Risk", detail: "guardrails", status: "done" },
  { id: "debate", x: 240, y: 238, w: 200, name: "Debate", detail: "bull vs bear · round 2", status: "running" },
  { id: "gate", x: 240, y: 322, w: 200, name: "Decision gate", detail: "approve · 0.87 conf.", status: "done", gate: true },
];

const edges = [
  { d: "M240 62 C240 96 84 88 84 122", dur: 2.6, begin: 0 },
  { d: "M240 62 L240 122", dur: 2.2, begin: 0.5 },
  { d: "M240 62 C240 96 396 88 396 122", dur: 2.6, begin: 1 },
  { d: "M84 162 C84 196 240 186 240 218", dur: 2.6, begin: 0.3 },
  { d: "M240 162 L240 218", dur: 2.2, begin: 1.2 },
  { d: "M396 162 C396 196 240 186 240 218", dur: 2.6, begin: 0.8 },
  { d: "M240 258 L240 302", dur: 1.8, begin: 0.2 },
];

const trace = [
  { time: "14:02:07", agent: "researcher", text: "18 sources retrieved · reranked top 6" },
  { time: "14:02:09", agent: "risk", text: "exposure within limits · no policy flags" },
];

const metrics = [
  { label: "Latency", value: "1.84s" },
  { label: "Tokens", value: "12.4k" },
  { label: "Eval score", value: "0.94" },
  { label: "Cost", value: "$0.021" },
];

function StatusIcon({ status, gate }: { status: Status; gate?: boolean }) {
  if (status === "running") {
    return (
      <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#5fd4d8]/25 border-t-[#5fd4d8] motion-safe:animate-spin" />
    );
  }

  return (
    <span
      className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full ${
        gate ? "bg-[#062a2c]/15" : "bg-[#5ed39a]/15"
      }`}
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden>
        <path
          d="M2.5 6.2 5 8.5 9.5 3.5"
          stroke={gate ? "#062a2c" : "#5ed39a"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function AgentCard({ node }: { node: AgentNode }) {
  return (
    <div
      className={`absolute flex h-10 items-center gap-2.5 rounded-[10px] border px-3 ${
        node.gate
          ? "border-[#7ee0e3]/60 bg-[#5fd4d8] text-[#062a2c] shadow-[0_0_32px_-4px_rgba(95,212,216,0.65)]"
          : "border-white/10 bg-[#0f1c28] text-[#e8f0f6] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)]"
      }`}
      style={{ left: node.x - node.w / 2, top: node.y - 20, width: node.w }}
    >
      <StatusIcon status={node.status} gate={node.gate} />
      <div className="min-w-0 leading-none">
        <p className="truncate text-[12.5px] font-semibold tracking-[-0.01em]">{node.name}</p>
        <p
          className={`mono mt-1 truncate text-[10px] ${
            node.gate ? "text-[#062a2c]/70" : "text-[#e8f0f6]/45"
          }`}
        >
          {node.detail}
        </p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-none">
      <div className="console-glow" aria-hidden />

      <div
        className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,#0e1b27_0%,#09131d_100%)] text-[#e8f0f6] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_70px_-20px_rgba(8,16,24,0.55),0_60px_120px_-40px_rgba(14,124,128,0.45)]"
        role="img"
        aria-label="Multi-agent AI runtime: an orchestrator routes a query to analyst, researcher and risk agents, a debate step reconciles them, and a decision gate approves the result."
      >
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
          </div>
          <p className="mono min-w-0 flex-1 truncate text-[11px] text-[#e8f0f6]/55">
            agent-runtime <span className="text-[#e8f0f6]/25">/</span> run_4821
          </p>
          <span className="mono flex items-center gap-1.5 rounded-full border border-[#5ed39a]/25 bg-[#5ed39a]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#5ed39a]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#5ed39a] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5ed39a]" />
            </span>
            Live
          </span>
        </div>

        <div className="mono flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[11px]">
          <span className="text-[#5fd4d8]">›</span>
          <span className="min-w-0 truncate text-[#e8f0f6]/80">
            Rebalance the AI-infra book after this week&rsquo;s earnings?
          </span>
          <span className="console-caret" aria-hidden />
        </div>

        <div className="relative" style={{ aspectRatio: `${GRAPH_W} / ${GRAPH_H}` }}>
          <div className="console-grid absolute inset-0" aria-hidden />
          <ScaledCanvas width={GRAPH_W} height={GRAPH_H}>
            <svg
              viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
              width={GRAPH_W}
              height={GRAPH_H}
              className="absolute inset-0"
              aria-hidden
            >
              <defs>
                <linearGradient id="hv-edge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5fd4d8" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#5fd4d8" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="hv-dot">
                  <stop offset="0%" stopColor="#c9fbfc" />
                  <stop offset="45%" stopColor="#5fd4d8" />
                  <stop offset="100%" stopColor="#5fd4d8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {edges.map((edge) => (
                <g key={edge.d}>
                  <path d={edge.d} fill="none" stroke="rgba(232,240,246,0.07)" strokeWidth="1.5" />
                  <path d={edge.d} fill="none" stroke="url(#hv-edge)" strokeWidth="1.2" className="console-edge" />
                  <circle r="5" fill="url(#hv-dot)" className="console-dot">
                    <animateMotion
                      dur={`${edge.dur}s`}
                      begin={`${edge.begin}s`}
                      repeatCount="indefinite"
                      path={edge.d}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.45 0 0.55 1"
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {nodes.map((node) => (
              <AgentCard key={node.id} node={node} />
            ))}
          </ScaledCanvas>
        </div>

        <div className="mono space-y-1.5 border-t border-white/[0.06] px-4 py-3 text-[10.5px]">
          {trace.map((line) => (
            <p key={line.time} className="flex gap-3 truncate">
              <span className="text-[#e8f0f6]/30">{line.time}</span>
              <span className="w-[72px] shrink-0 text-[#5fd4d8]">{line.agent}</span>
              <span className="truncate text-[#e8f0f6]/60">{line.text}</span>
            </p>
          ))}
        </div>

        <div className="grid grid-cols-4 border-t border-white/[0.06]">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`px-3 py-3 sm:px-4 ${index > 0 ? "border-l border-white/[0.06]" : ""}`}
            >
              <p className="mono text-[9px] uppercase tracking-[0.14em] text-[#e8f0f6]/40">
                {metric.label}
              </p>
              <p className="mt-1 text-[15px] font-semibold tabular-nums tracking-[-0.02em] text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="float-chip absolute -left-14 top-[51%] hidden rounded-xl border border-line bg-white/90 px-3 py-2.5 shadow-[0_18px_40px_-16px_rgba(8,16,24,0.35)] backdrop-blur-md sm:block lg:hidden xl:block">
        <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">Model router</p>
        <div className="mt-2 flex gap-1">
          {["Claude", "GPT-4o", "Llama 3"].map((model, index) => (
            <span
              key={model}
              className={`rounded-md px-1.5 py-1 text-[10.5px] font-medium ${
                index === 0 ? "bg-ink text-white" : "bg-[#eef2f6] text-ink-soft"
              }`}
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      <div className="float-chip float-chip-delay absolute -right-5 bottom-[7.5rem] hidden items-center gap-3 rounded-xl border border-line bg-white/90 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-16px_rgba(8,16,24,0.35)] backdrop-blur-md sm:flex lg:hidden xl:flex">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1a5f48]/10">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M3.5 8.3 6.5 11 12.5 4.8"
              stroke="#1a5f48"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="leading-none">
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">Evals passing</p>
          <p className="mt-1.5 text-[15px] font-semibold tabular-nums tracking-[-0.02em] text-ink">
            128 / 128
          </p>
        </div>
      </div>
    </div>
  );
}
