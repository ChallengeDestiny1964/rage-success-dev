const board = [
  "♜♞♝♛♚♝·♜",
  "♟♟♟♟·♟♟♟",
  "·····♞··",
  "····♟···",
  "····♙···",
  "·····♘··",
  "♙♙♙♙·♙♙♙",
  "♖♘♗♕♔♗·♖",
];

const moves = ["1. e4 e5", "2. Nf3 Nf6", "3. …"];

const leaderboard = [
  { name: "you", elo: 1284 },
  { name: "nova_k", elo: 1310 },
  { name: "rookie42", elo: 1198 },
];

export function ChessScreen() {
  return (
    <div className="relative flex h-full w-full bg-[radial-gradient(ellipse_at_50%_30%,#27313d_0%,#12171d_70%)] text-white">
      <div className="absolute top-6 right-8 rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-right backdrop-blur">
        <p className="text-[12px] uppercase tracking-[0.18em] text-white/50">Game code</p>
        <p className="mt-1 font-mono text-[26px] font-semibold tracking-[0.3em]">K7Q2X</p>
      </div>

      <aside className="z-10 flex w-[280px] flex-col gap-5 p-8">
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/50">Opponent</p>
          <p className="mt-2 text-[18px] font-semibold">nova_k</p>
          <p className="text-[14px] text-white/60">Elo 1310 · Black</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/50">Moves</p>
          <div className="mt-3 space-y-1.5 font-mono text-[15px] text-white/80">
            {moves.map((move) => (
              <p key={move}>{move}</p>
            ))}
          </div>
        </div>
        <div className="mt-auto rounded-2xl border border-[#4ade80]/30 bg-[#4ade80]/10 p-5">
          <p className="text-[18px] font-semibold text-[#86efac]">Your move</p>
          <p className="text-[14px] text-white/60">White · Elo 1284</p>
        </div>
      </aside>

      <div className="flex flex-1 items-center justify-center [perspective:1400px]">
        <div
          className="grid grid-cols-8 overflow-hidden rounded-md border-[10px] border-[#3b2a1c] shadow-[0_60px_80px_rgba(0,0,0,0.6)]"
          style={{ transform: "rotateX(38deg)", width: 520, height: 520 }}
        >
          {board.flatMap((row, r) =>
            Array.from(row).map((piece, c) => {
              const dark = (r + c) % 2 === 1;
              const highlight = (r === 0 && c === 6) || (r === 2 && c === 5);
              return (
                <div
                  key={`${r}-${c}`}
                  className="flex items-center justify-center text-[44px] leading-none"
                  style={{
                    background: highlight ? "#c9b458" : dark ? "#8b6b4a" : "#e8d5b5",
                    color: "♙♘♗♖♕♔".includes(piece) ? "#fdfaf4" : "#1b1410",
                    textShadow: "0 3px 3px rgba(0,0,0,0.45)",
                  }}
                >
                  {piece === "·" ? "" : piece}
                </div>
              );
            }),
          )}
        </div>
      </div>

      <aside className="z-10 flex w-[250px] flex-col justify-end p-8">
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/50">Elo leaderboard</p>
          <div className="mt-3 space-y-2">
            {[...leaderboard]
              .sort((a, b) => b.elo - a.elo)
              .map((player, index) => (
                <div key={player.name} className="flex justify-between text-[15px]">
                  <span className={player.name === "you" ? "font-semibold" : "text-white/70"}>
                    {index + 1}. {player.name}
                  </span>
                  <span className="font-mono text-white/80">{player.elo}</span>
                </div>
              ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
