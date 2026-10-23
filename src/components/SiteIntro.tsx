"use client";

import { useEffect, useRef, useState } from "react";
import { BrandName, BrandTitle } from "@/components/BrandLetters";
import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

const STORAGE_KEY = "mr-intro-v2";
const COOKIE_KEY = "mr-intro-v2";
const DURATION_MS = 5000;
const EXIT_MS = 700;

const bootLines = [
  "Booting senior engineering profile…",
  "Loading 8+ years of production delivery…",
  "Mounting AI agents, RAG & evaluation…",
  "Warming full-stack product systems…",
  "Aligning for client-ready engagement…",
  "Online. Ready to ship your next build.",
] as const;

const credentials = [
  { label: "Experience", value: "8+ years" },
  { label: "Specialty", value: "Full-Stack AI" },
  { label: "Availability", value: "Open now" },
] as const;

const expertise = ["AI Agents", "LLMs", "Next.js", "Python", "System Design"] as const;

function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
    // Session cookie — clears when the browser session ends, so the intro
    // returns the next time a client opens the portfolio.
    document.cookie = `${COOKIE_KEY}=1; Path=/; SameSite=Lax`;
  } catch {
    // ignore storage failures
  }
}

export function SiteIntro({ skip = false }: { skip?: boolean }) {
  const [phase, setPhase] = useState<"boot" | "exit" | "gone">(skip ? "gone" : "boot");
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const finishedRef = useRef(false);
  const exitTimerRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (skip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(STORAGE_KEY) === "1") {
      markIntroSeen();
      setPhase("gone");
      return;
    }

    let cancelled = false;
    const start = performance.now();
    finishedRef.current = false;

    document.documentElement.classList.add("intro-active");

    const finish = () => {
      if (cancelled || finishedRef.current) return;
      finishedRef.current = true;
      markIntroSeen();
      setProgress(100);
      setLineIndex(bootLines.length - 1);
      setPhase("exit");
      exitTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;
        document.documentElement.classList.remove("intro-active");
        setPhase("gone");
      }, EXIT_MS);
    };

    const tick = (now: number) => {
      if (cancelled || finishedRef.current) return;

      const t = Math.min(1, (now - start) / DURATION_MS);
      // Mostly linear so the bar reads as a true 5s load, with a soft finish.
      const eased = t < 0.85 ? (t / 0.85) * 0.92 : 0.92 + ((t - 0.85) / 0.15) * 0.08;
      setProgress(Math.round(Math.min(100, eased * 100)));
      setLineIndex(Math.min(bootLines.length - 1, Math.floor(t * bootLines.length)));

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(exitTimerRef.current);
      document.documentElement.classList.remove("intro-active");
    };
  }, [skip]);

  const skipIntro = () => {
    if (finishedRef.current || phase !== "boot") return;
    finishedRef.current = true;
    cancelAnimationFrame(frameRef.current);
    window.clearTimeout(exitTimerRef.current);
    markIntroSeen();
    setProgress(100);
    setLineIndex(bootLines.length - 1);
    document.documentElement.classList.remove("intro-active");
    setPhase("exit");
    exitTimerRef.current = window.setTimeout(() => setPhase("gone"), 480);
  };

  if (phase === "gone") return null;

  return (
    <div
      className={`site-intro ${phase === "exit" ? "is-exit" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio introduction"
      aria-hidden={phase === "exit"}
    >
      <div className="site-intro-bg" aria-hidden>
        <span className="site-intro-orb a" />
        <span className="site-intro-orb b" />
        <span className="site-intro-orb c" />
        <span className="site-intro-beam" />
        <span className="site-intro-grid" />
        <span className="site-intro-ring" />
        <span className="site-intro-grain" />
      </div>

      <div className="site-intro-panel">
        <span className="site-intro-panel-glow" aria-hidden />

        <div className="site-intro-frame">
          <div className="site-intro-top">
            <span className="site-intro-pill">
              <span className="site-intro-live" aria-hidden />
              Available for hire
            </span>
            <button type="button" className="site-intro-skip" onClick={skipIntro}>
              Skip
            </button>
          </div>

          <div className="site-intro-center">
            <div className="site-intro-mark">
              <span className="site-intro-mark-ring" aria-hidden />
              <LogoMark className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>

            <p className="site-intro-kicker">Senior engineer · production AI</p>
            <BrandName
              as="h1"
              tone="dark"
              className="site-intro-brand-name mt-3 text-[clamp(2.7rem,8.5vw,4.8rem)]"
              delayMs={160}
            />
            <BrandTitle
              tone="dark"
              className="site-intro-brand-title mt-3 text-[clamp(1.2rem,3vw,1.75rem)]"
              delayMs={520}
            />
            <p className="site-intro-lede">
              8+ years shipping full-stack products, LLM systems, and evaluation-ready engineering
              for clients who need production outcomes — not demos.
            </p>

            <ul className="site-intro-tags" aria-label="Core expertise">
              {expertise.map((item) => (
                <li key={item} className="site-intro-tag">
                  {item}
                </li>
              ))}
            </ul>

            <ul className="site-intro-creds" aria-label="Credentials">
              {credentials.map((item) => (
                <li key={item.label} className="site-intro-cred">
                  <span className="site-intro-cred-label">{item.label}</span>
                  <span className="site-intro-cred-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-intro-foot">
            <div className="site-intro-log" aria-live="polite">
              <span className="site-intro-log-prompt">›</span>
              <span key={bootLines[lineIndex]} className="site-intro-log-line">
                {bootLines[lineIndex]}
              </span>
            </div>

            <div
              className="site-intro-progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Loading portfolio"
            >
              <span
                className="site-intro-progress-bar"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
              <span
                className="site-intro-progress-glow"
                style={{ left: `${Math.max(progress, 2)}%` }}
              />
            </div>

            <div className="site-intro-meta">
              <span>{site.location}</span>
              <span className="site-intro-meta-sep" aria-hidden />
              <span className="site-intro-pct">{progress}%</span>
              <span className="site-intro-meta-sep" aria-hidden />
              <span>Let’s build together</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
