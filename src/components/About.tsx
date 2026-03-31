'use client';

export default function About() {
  return (
    <section className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="max-w-[640px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            About
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[48px] leading-[1em] tracking-[-0.02em] text-white mt-[16px] mb-[24px]">
            Built on Helgoland.
          </h2>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] leading-[1.7] text-[rgba(255,255,255,0.5)] mb-[16px]">
            Founded on one of Europe&apos;s most important bird migration hotspots. Partnered with world-class UI/UX designers and engineers to build what the birding world has been missing.
          </p>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] leading-[1.7] text-[rgba(255,255,255,0.5)]">
            Jointly owned by TeBM GmbH and falm Group GmbH. We don&apos;t change birding — we make what people already do better.
          </p>
        </div>
      </div>
    </section>
  );
}
