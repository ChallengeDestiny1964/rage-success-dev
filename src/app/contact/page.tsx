import type { Metadata } from "next";
import { ContactLinks } from "@/components/ContactLinks";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} via email, phone, GitHub, or LinkedIn.`,
};

export default function ContactPage() {
  return (
    <section className="shell py-16 md:py-24">
      <p className="eyebrow">Contact</p>
      <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.92] text-ink">
        Let’s talk about <span className="accent-serif">the work</span>
      </h1>
      <p className="lede mt-6 max-w-2xl">
        Best for Freelancer.com clients, AI training platforms, and remote product teams who need a
        senior engineer who can ship and evaluate real systems. Contact channels are limited to
        GitHub, email, phone, and LinkedIn.
      </p>

      <div className="surface mt-12 overflow-hidden rounded-[1.75rem]">
        <ContactLinks />
      </div>

      <div className="mt-14 border-t border-line pt-12">
        <h2 className="display text-3xl text-ink md:text-4xl">How to brief me quickly</h2>
        <ul className="mt-7 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
          {[
            "Share the product goal, stack constraints, and timeline.",
            "Tell me whether you need build work, AI evaluation, or both.",
            "Include any repos, specs, or sample tasks you already have.",
          ].map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="mono text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${site.contact.email}`} className="btn btn-primary">
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
            Open GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
