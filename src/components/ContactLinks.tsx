import { site } from "@/data/site";

const contacts = [
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    label: "Phone",
    value: site.contact.phone,
    href: site.contact.phoneHref,
  },
  {
    label: "GitHub",
    value: site.contact.githubLabel,
    href: site.contact.github,
  },
  {
    label: "LinkedIn",
    value: site.contact.linkedinLabel,
    href: site.contact.linkedin,
  },
] as const;

export function ContactLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
      {contacts.map((item, index) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          className={[
            "group border-line px-6 py-7 transition hover:bg-white/50 md:px-8",
            index % 2 === 0 ? "md:border-r" : "",
            index < contacts.length - 1 ? "border-b md:border-b-0" : "",
            index < 2 ? "md:border-b" : "",
          ].join(" ")}
        >
          <p className="mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-deep">
            {item.label}
          </p>
          <p className="mt-2.5 break-all text-sm font-medium text-ink transition group-hover:text-accent-deep">
            {item.value}
          </p>
        </a>
      ))}
    </div>
  );
}
