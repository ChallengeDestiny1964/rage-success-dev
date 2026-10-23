import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { siGithub } from "simple-icons";
import { site } from "@/data/site";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const contacts: {
  id: string;
  label: string;
  value: string;
  href: string;
  invite: string;
  cta: string;
  tone: string;
  icon: ReactNode;
}[] = [
  {
    id: "email",
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}?subject=Project%20inquiry%20—%20${encodeURIComponent(site.name)}`,
    invite: "Send the brief. I reply with a clear next step.",
    cta: "Start the conversation",
    tone: "#0e7c80",
    icon: <MailIcon className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />,
  },
  {
    id: "phone",
    label: "Phone",
    value: site.contact.phone,
    href: site.contact.phoneHref,
    invite: "Prefer a real conversation? I’m in Sydney time.",
    cta: "Call now",
    tone: "#2a7fd4",
    icon: <PhoneIcon className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />,
  },
  {
    id: "github",
    label: "GitHub",
    value: site.contact.githubLabel,
    href: site.contact.github,
    invite: "See shipping quality before you hire.",
    cta: "Inspect the work",
    tone: "#1f2937",
    icon: <BrandIcon path={siGithub.path} />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: site.contact.linkedinLabel,
    href: site.contact.linkedin,
    invite: "Verify experience. Then let’s build.",
    cta: "Connect with me",
    tone: "#0a66c2",
    icon: <BrandIcon path={LINKEDIN_PATH} />,
  },
];

export function ContactLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={`contact-grid ${compact ? "contact-grid-compact" : ""}`}
      aria-label="Contact channels"
    >
      {contacts.map((item, index) => (
        <li key={item.id} className="min-w-0">
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="contact-card"
            style={{ "--tone": item.tone, "--i": index } as CSSProperties}
            data-channel={item.id}
          >
            <span className="contact-card-shell">
              <span className="contact-card-glow" aria-hidden />
              <span className="contact-card-pattern" aria-hidden />
              <span className="contact-card-shine" aria-hidden />
              <span className="contact-card-top">
                <span className="contact-card-icon">{item.icon}</span>
                <span className="contact-card-status">
                  <span className="contact-card-dot" aria-hidden />
                  Open
                </span>
              </span>
              <span className="contact-card-label">{item.label}</span>
              <span className="contact-card-value">{item.value}</span>
              <span className="contact-card-invite">{item.invite}</span>
              <span className="contact-card-cta">
                {item.cta}
                <span className="contact-card-arrow" aria-hidden>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
