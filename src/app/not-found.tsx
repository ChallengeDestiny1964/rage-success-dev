import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] text-ink">
        Page <span className="accent-serif">not found</span>
      </h1>
      <p className="mt-5 max-w-md text-muted">
        That route does not exist. Head back to the portfolio home or browse projects.
      </p>
      <div className="mt-9 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/projects" className="btn btn-secondary">
          Projects
        </Link>
      </div>
    </section>
  );
}
