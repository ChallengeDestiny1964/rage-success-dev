"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { site } from "@/data/site";

type Tone = "light" | "dark";

function CharSpan({
  char,
  index,
  className,
}: {
  char: string;
  index: number;
  className: string;
}) {
  if (char === " ") {
    // Normal space so the name can wrap between words instead of colliding with the hero.
    return (
      <span className="brand-space" aria-hidden>
        {" "}
      </span>
    );
  }

  return (
    <span className={className} style={{ "--i": index } as CSSProperties} aria-hidden>
      <span className="brand-char-inner">{char}</span>
    </span>
  );
}

function LetterRow({
  text,
  charClass,
  startIndex = 0,
}: {
  text: string;
  charClass: string;
  startIndex?: number;
}) {
  return (
    <>
      {[...text].map((char, i) => (
        <CharSpan
          key={`${char}-${startIndex + i}`}
          char={char}
          index={startIndex + i}
          className={charClass}
        />
      ))}
    </>
  );
}

/** Wait until the site intro overlay is gone so letter motion is actually visible. */
function useBrandReady(tone: Tone) {
  const [ready, setReady] = useState(tone === "dark");

  useEffect(() => {
    if (tone === "dark") {
      setReady(true);
      return;
    }

    if (!document.documentElement.classList.contains("intro-active")) {
      const id = window.requestAnimationFrame(() => setReady(true));
      return () => window.cancelAnimationFrame(id);
    }

    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains("intro-active")) {
        setReady(true);
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [tone]);

  return ready;
}

export function BrandName({
  as: Tag = "h1",
  tone = "light",
  className = "",
  delayMs = 0,
}: {
  as?: "h1" | "p" | "div";
  tone?: Tone;
  className?: string;
  delayMs?: number;
}) {
  const ready = useBrandReady(tone);

  return (
    <Tag
      className={`brand-name brand-name--${tone}${ready ? " is-ready" : ""} ${className}`.trim()}
      style={{ "--brand-delay": `${delayMs}ms` } as CSSProperties}
      aria-label={site.name}
    >
      <span className="brand-name-shine" aria-hidden />
      <LetterRow text={site.name} charClass="brand-name-char" />
    </Tag>
  );
}

export function BrandTitle({
  tone = "light",
  className = "",
  delayMs = 0,
}: {
  tone?: Tone;
  className?: string;
  delayMs?: number;
}) {
  const ready = useBrandReady(tone);
  const rest = "Full-Stack AI Engineer";
  const seniorLen = "Senior".length;

  return (
    <p
      className={`brand-title brand-title--${tone}${ready ? " is-ready" : ""} ${className}`.trim()}
      style={{ "--brand-delay": `${delayMs}ms` } as CSSProperties}
      aria-label="Senior Full-Stack AI Engineer"
    >
      <span className="brand-title-senior" aria-hidden>
        <LetterRow text="Senior" charClass="brand-title-char brand-title-char--serif" />
      </span>
      <span className="brand-title-rest" aria-hidden>
        <LetterRow text={` ${rest}`} charClass="brand-title-char" startIndex={seniorLen} />
      </span>
    </p>
  );
}
