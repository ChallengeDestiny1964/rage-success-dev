/* eslint-disable @next/next/no-img-element -- rendered inside a scaled canvas where next/image sizing does not apply */

const covers = [
  { src: "/projects/sell-store/learning.jpg", title: "An Introduction to Theories of Learning" },
  { src: "/projects/sell-store/psychoanalysis.jpg", title: "Future Psychoanalysis" },
  { src: "/projects/sell-store/shamanic.jpg", title: "Shamanic Dimensions of Psychotherapy" },
  { src: "/projects/sell-store/social-skills.jpg", title: "Social Skills Across the Life Span" },
  { src: "/projects/sell-store/psychology-of-sex.jpg", title: "Psychology of Sex" },
];

export function SellStoreScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#fbf8f3] text-[#2b2118]">
      <div className="bg-[#2b2118] py-2.5 text-center text-[13px] tracking-wide text-[#f3e9dc]">
        Limited bundle — 5 psychology classics, instant digital download
      </div>
      <header className="flex items-center justify-between border-b border-[#eadfce] px-14 py-5">
        <p className="font-serif text-[30px] tracking-tight">Psyche Library</p>
        <nav className="flex gap-9 text-[15px] text-[#6b5a4a]">
          <span>Bundles</span>
          <span>CBT &amp; DBT</span>
          <span>Psychoanalysis</span>
          <span>Therapy</span>
        </nav>
        <div className="flex items-center gap-5 text-[15px]">
          <span className="text-[#6b5a4a]">Search</span>
          <span className="rounded-full bg-[#2b2118] px-4 py-2 text-[#fbf8f3]">Cart · 1</span>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[1fr_1.1fr] items-center gap-6 px-14">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#a0643a]">
            Bestselling bundle
          </p>
          <h2 className="mt-5 font-serif text-[66px] leading-[1] tracking-[-0.015em]">
            The essential <em className="text-[#a0643a]">psychology</em> library
          </h2>
          <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-[#6b5a4a]">
            Five foundational texts on learning, psychoanalysis, and therapy — curated for
            students and practitioners.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <span className="rounded-full bg-[#a0643a] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_10px_30px_rgba(160,100,58,0.35)]">
              Get the bundle
            </span>
            <p className="text-[15px]">
              <span className="font-semibold">$19</span>{" "}
              <span className="text-[#a8988a] line-through">$75</span>
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[14px] text-[#6b5a4a]">
            <span className="text-[#e0a526]">★★★★★</span>
            Trusted by 2,400+ readers
          </div>
        </div>

        <div className="relative h-[470px]">
          {covers.map((cover, index) => {
            const offset = index - 2;
            return (
              <img
                key={cover.src}
                src={cover.src}
                alt={cover.title}
                className="absolute top-1/2 left-1/2 w-[176px] rounded-md shadow-[0_24px_50px_rgba(43,33,24,0.3)]"
                style={{
                  transform: `translate(calc(-50% + ${offset * 96}px), calc(-50% + ${Math.abs(offset) * 20}px)) rotate(${offset * 6}deg)`,
                  zIndex: 10 - Math.abs(offset),
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
