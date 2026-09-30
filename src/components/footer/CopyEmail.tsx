"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="footer-email">
      <a href={`mailto:${email}`} className="min-w-0 flex-1">
        <span className="footer-label block">Email me directly</span>
        <span className="mono mt-1.5 block truncate text-[0.875rem] text-white sm:text-base">
          {email}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="footer-copy"
        data-copied={copied || undefined}
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        ) : (
          <CopyIcon className="h-4 w-4" strokeWidth={1.9} aria-hidden />
        )}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
