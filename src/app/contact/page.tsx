import type { Metadata } from "next";
import { ContactLinks } from "@/components/ContactLinks";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} via email, phone, GitHub, or LinkedIn.`,
};

const briefSteps = [
  {
    title: "The outcome",
    body: "Product goal, success criteria, and the timeline you need to hit.",
  },
  {
    title: "The work type",
    body: "Build, AI evaluation, architecture, or a mix — say which matters most.",
  },
  {
    title: "The context",
    body: "Repos, specs, stack constraints, or sample tasks accelerate the first reply.",
  },
] as const;

export default function ContactPage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="contact-hero">
        <p className="eyebrow">Contact · Available now</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.92] text-ink">
          Ready when your next build needs a <span className="accent-serif">senior</span> hand
        </h1>
        <p className="lede mt-6 max-w-2xl">
          Freelancer.com clients, AI training platforms, and remote product teams hire me to ship
          production systems — not demos. Pick a channel below and I’ll respond with a clear next
          step.
        </p>
        <p className="contact-hero-note mt-5">
          <span className="contact-hero-pulse" aria-hidden />
          Sydney · Remote · Usually replies within one business day
        </p>
      </div>

      <div className="mt-12">
        <ContactLinks />
      </div>

      <div className="contact-brief mt-14">
        <div className="contact-brief-shell">
          <p className="eyebrow">Make it easy</p>
          <h2 className="display mt-4 max-w-2xl text-3xl text-ink md:text-4xl">
            A sharp brief gets you a sharper <span className="accent-serif">reply</span>
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {briefSteps.map((item, index) => (
              <li key={item.title} className="contact-brief-step">
                <span className="contact-brief-index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.contact.email}?subject=Project%20inquiry%20—%20${encodeURIComponent(site.name)}`}
              className="btn btn-primary"
            >
              Email {site.name.split(" ")[0]}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </a>
            <a
              href={site.contact.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              Review GitHub first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
