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
    <>
      <button
        type="button"
        onClick={copy}
        className="footer-icon-btn"
        data-copied={copied || undefined}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        title={copied ? "Copied" : "Copy email"}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        ) : (
          <CopyIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
