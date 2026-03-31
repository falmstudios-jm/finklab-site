'use client';

export default function About() {
  return (
    <section className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col gap-[24px] max-w-[720px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            About finklab
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[48px] leading-[1em] tracking-[-0.02em] text-white">
            Born on Helgoland.
            <br />
            <span className="gradient-text">Built for the world.</span>
          </h2>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.5)]">
            finklab GmbH was founded on Helgoland — Germany&apos;s most remote island and one of Europe&apos;s most important bird migration hotspots. We&apos;re a team of data engineers and nature enthusiasts who believe citizen science deserves professional-grade infrastructure.
          </p>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.5)]">
            We don&apos;t change birding — we make what people already do better. Observations that previously disappeared in notebooks, WhatsApp groups, and chat histories become visible, connected, and documented. Many individual sightings become one living map.
          </p>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.5)]">
            finklab GmbH is jointly owned by TeBM GmbH and falm Group GmbH. The fink&reg; trademark is registered by falm Group GmbH in the European Union and licensed to finklab GmbH.
          </p>

          <div className="flex flex-col gap-[4px] pt-[16px]">
            <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.25)]">
              finklab GmbH &middot; Am Falm 302 A, 27498 Helgoland &middot; HRB 19416 PI &middot; DE458868378
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
