type Line = { tag?: string; tagColor?: string; text: string; color?: string };

const lines: Line[] = [
  { text: "$ bun run src/llm-bot.ts", color: "#e6edf3" },
  { tag: "boot", tagColor: "#7ee787", text: "wallet connected · Polygon · Safe proxy 0x9f…c21" },
  { tag: "markets", tagColor: "#79c0ff", text: "synced 1,284 active markets → 37 match “best AI model” filter" },
  { tag: "context", tagColor: "#d2a8ff", text: "scraped LLM Arena leaderboard + 18 news sources" },
  { tag: "llm", tagColor: "#ffa657", text: "evaluating “Which company has the best AI model end of November?”" },
];

const odds = [
  { name: "Google", price: 0.62, width: 62 },
  { name: "OpenAI", price: 0.21, width: 21 },
  { name: "Anthropic", price: 0.12, width: 12 },
  { name: "xAI", price: 0.05, width: 5 },
];

const tail: Line[] = [
  { tag: "decision", tagColor: "#7ee787", text: "BUY “Google” @ 0.62 · 25 USDC · risk check passed" },
  { tag: "portfolio", tagColor: "#79c0ff", text: "4 open positions · exposure 112 USDC · PnL +8.4%" },
  { tag: "redeem", tagColor: "#d2a8ff", text: "2 resolved markets redeemed → +41.20 USDC" },
];

function LogLine({ line }: { line: Line }) {
  return (
    <p className="leading-[1.9]">
      {line.tag ? (
        <span className="mr-3 inline-block w-[128px]" style={{ color: line.tagColor }}>
          [{line.tag}]
        </span>
      ) : null}
      <span style={{ color: line.color ?? "#c9d1d9" }}>{line.text}</span>
    </p>
  );
}

export function PolyBotScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0d1117] font-mono text-[17px]">
      <div className="flex items-center justify-between border-b border-[#21262d] px-8 py-3 text-[14px] text-[#8b949e]">
        <span>polybot · LLM market agent</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#3fb950]" />
          running · next cycle 04:32
        </span>
      </div>
      <div className="flex-1 px-8 py-6">
        {lines.map((line) => (
          <LogLine key={line.text} line={line} />
        ))}

        <div className="my-4 rounded-lg border border-[#30363d] bg-[#161b22] px-6 py-5">
          <p className="text-[#e6edf3]">Market odds</p>
          <div className="mt-3 space-y-2.5">
            {odds.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="w-[110px] text-[#8b949e]">{item.name}</span>
                <div className="h-3 flex-1 rounded bg-[#21262d]">
                  <div
                    className="h-full rounded bg-gradient-to-r from-[#238636] to-[#3fb950]"
                    style={{ width: `${item.width}%` }}
                  />
                </div>
                <span className="w-[60px] text-right text-[#e6edf3]">{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[15px] text-[#8b949e]">
            reasoning: leaderboard lead + release cadence + news sentiment → Google
          </p>
        </div>

        {tail.map((line) => (
          <LogLine key={line.text} line={line} />
        ))}
        <p className="mt-1 leading-[1.9] text-[#e6edf3]">
          <span className="inline-block h-[18px] w-[10px] translate-y-[3px] animate-pulse bg-[#e6edf3]" />
        </p>
      </div>
    </div>
  );
}
