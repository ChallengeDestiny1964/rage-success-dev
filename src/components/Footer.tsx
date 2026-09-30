import { ArrowUpIcon, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { siGithub } from "simple-icons";
import { CopyEmail } from "@/components/footer/CopyEmail";
import { HideOnPaths } from "@/components/footer/HideOnPaths";
import { SydneyTime } from "@/components/footer/SydneyTime";
import { LogoMark } from "@/components/Logo";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const socials: { label: string; href: string; icon: ReactNode }[] = [
  { label: "GitHub", href: site.contact.github, icon: <BrandIcon path={siGithub.path} /> },
  { label: "LinkedIn", href: site.contact.linkedin, icon: <BrandIcon path={LINKEDIN_PATH} /> },
  {
    label: "Email",
    href: `mailto:${site.contact.email}`,
    icon: <MailIcon className="h-[17px] w-[17px]" strokeWidth={1.8} aria-hidden />,
  },
  {
    label: "Phone",
    href: site.contact.phoneHref,
    icon: <PhoneIcon className="h-[17px] w-[17px]" strokeWidth={1.8} aria-hidden />,
  },
];

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="footer-label">{title}</p>
      <ul className="mt-5 space-y-3 text-[0.925rem]">{children}</ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-2.5 pb-2.5 pt-16 sm:px-3 sm:pb-3 md:pt-24">
      <div className="footer-slab">
        <div aria-hidden className="footer-glow" />

        <div className="relative mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-12">
          <HideOnPaths paths={["/contact"]}>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-12 border-b border-white/10 pb-14 pt-16 md:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
              <div>
                <p className="footer-status">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
                  </span>
                  Available for new projects
                </p>
                <h2 className="display mt-7 text-[clamp(2.5rem,5.6vw,4.4rem)] leading-[0.98] text-white">
                  Have an AI product
                  <br className="hidden sm:block" /> ready to{" "}
                  <span className="accent-serif text-[#7ed2d6]">ship?</span>
                </h2>
                <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-[rgba(232,240,246,0.66)]">
                  Production AI systems, full-stack products and LLM evaluation for teams across the
                  US, Canada, Australia and the EU. Tell me what you&apos;re building.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <CopyEmail email={site.contact.email} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link href="/contact" className="btn btn-light w-full">
                    Start a project
                    <span className="btn-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                  <Link href="/resume" className="btn btn-ghost w-full">
                    View resume
                  </Link>
                </div>
              </div>
            </div>
          </HideOnPaths>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-12 lg:gap-8">
            <div className="col-span-2 lg:col-span-4 lg:pr-6">
              <Link href="/" className="inline-flex items-center gap-3.5" aria-label={`${site.name} — home`}>
                <LogoMark className="footer-logo h-11 w-11" />
                <span>
                  <span className="display block text-xl leading-tight text-white">{site.name}</span>
                  <span className="block text-[0.8rem] text-[rgba(232,240,246,0.55)]">{site.title}</span>
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-[0.925rem] leading-relaxed text-[rgba(232,240,246,0.6)]">
                Eight years shipping production software at Relevance AI, Telstra and WiseTech
                Global, from agent orchestration to the last pixel of the UI.
              </p>
              <ul className="mt-7 flex gap-2.5" aria-label="Social and contact links">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="footer-social"
                      aria-label={social.label}
                      title={social.label}
                      {...(social.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <FooterColumn title="Navigate">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </FooterColumn>
            </div>

            <div className="lg:col-span-3">
              <FooterColumn title="Selected work">
                {featuredProjects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className="footer-link">
                      {project.title}
                    </Link>
                  </li>
                ))}
              </FooterColumn>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:pl-6">
              <FooterColumn title="Based in">
                <li className="text-white">{site.location}</li>
                <li className="flex items-center gap-2 whitespace-nowrap text-[rgba(232,240,246,0.6)]">
                  <SydneyTime />
                  <span className="text-[rgba(232,240,246,0.35)]">local time</span>
                </li>
                <li className="text-[rgba(232,240,246,0.6)]">Remote · worldwide</li>
                <li className="text-[rgba(232,240,246,0.6)]">Replies within 24h</li>
              </FooterColumn>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[0.8rem] text-[rgba(232,240,246,0.5)] sm:flex-row sm:items-center sm:justify-between">
            <p className="flex flex-wrap gap-x-2 gap-y-1">
              <span>
                © {year} {site.name}
              </span>
              <span className="hidden opacity-40 sm:inline" aria-hidden>
                ·
              </span>
              <span>Designed &amp; engineered in Sydney</span>
            </p>
            <div className="flex items-center gap-5">
              <p className="mono hidden text-[0.72rem] md:block">Next.js · TypeScript · Tailwind</p>
              <a href="#top" className="footer-top">
                Back to top
                <span className="footer-top-icon">
                  <ArrowUpIcon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                </span>
              </a>
            </div>
          </div>
        </div>

        <p aria-hidden className="footer-wordmark">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
