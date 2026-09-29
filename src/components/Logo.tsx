import { useId } from "react";
import { site } from "@/data/site";

const nodes = [
  [11, 27.5],
  [11, 12.5],
  [29, 12.5],
  [29, 27.5],
] as const;

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  const id = `logo${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const bg = `${id}-bg`;
  const shine = `${id}-shine`;
  const glow = `${id}-glow`;

  return (
    <svg viewBox="0 0 40 40" className={`logo-mark shrink-0 ${className}`} aria-hidden>
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3844" />
          <stop offset="55%" stopColor="#0d1a25" />
          <stop offset="100%" stopColor="#081018" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor="#5fd4d8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#5fd4d8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="40" height="40" rx="11" fill={`url(#${bg})`} />
      <rect width="40" height="40" rx="11" fill={`url(#${shine})`} />
      <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" fill="none" stroke="#ffffff" strokeOpacity="0.1" />

      <path
        d="M11 27.5V12.5L20 21.5L29 12.5V27.5"
        fill="none"
        stroke="#e8f0f6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {nodes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.3" fill="#e8f0f6" />
      ))}
      <circle className="logo-mark-glow" cx="20" cy="21.5" r="7" fill={`url(#${glow})`} />
      <circle cx="20" cy="21.5" r="2.9" fill="#5fd4d8" stroke="#0d1a25" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="hidden sm:block">
        <span className="block text-[15px] font-semibold leading-none tracking-[-0.025em] text-ink">
          {site.name}
        </span>
        <span className="mt-1.5 block text-[11.5px] font-medium leading-none tracking-[-0.005em] text-muted">
          Full-Stack AI Engineer
        </span>
      </span>
    </span>
  );
}
