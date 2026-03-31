'use client';

export default function About() {
  return (
    <section className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-[56px] lg:gap-[80px]">
          {/* Left — story */}
          <div className="flex flex-col gap-[24px] flex-1">
            <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
              About finklab
            </span>
            <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[48px] leading-[1em] tracking-[-0.02em] text-white">
              Born on Helgoland.
              <br />
              <span className="gradient-text">Built for the world.</span>
            </h2>
            <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.45)]">
              finklab GmbH was founded on Helgoland — Germany&apos;s most remote island and one of Europe&apos;s most important bird migration hotspots. We&apos;re a team of data engineers and nature enthusiasts who believe that citizen science deserves professional-grade infrastructure.
            </p>
            <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.45)]">
              We&apos;re not ornithologists — we&apos;re data lovers. Our mission is to build the tools and systems that make biodiversity data accessible, reliable, and actionable for researchers worldwide.
            </p>
          </div>

          {/* Right — company details */}
          <div className="flex flex-col gap-[20px] lg:w-[360px] shrink-0">
            {[
              {
                label: 'Company',
                value: 'finklab GmbH',
                sub: 'Am Falm 302 A, 27498 Helgoland',
              },
              {
                label: 'Registration',
                value: 'HRB 19416 PI',
                sub: 'Amtsgericht Pinneberg',
              },
              {
                label: 'VAT ID',
                value: 'DE458868378',
                sub: null,
              },
              {
                label: 'Shareholders',
                value: 'falm Group GmbH · Tewis GmbH',
                sub: '50% each',
              },
              {
                label: 'Press contact',
                value: 'press@finklab.eu',
                sub: null,
              },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-[20px] p-[20px] flex flex-col gap-[4px]">
                <span className="font-[family-name:var(--font-rubik)] text-[12px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)]">
                  {item.label}
                </span>
                <span className="font-[family-name:var(--font-rubik)] font-medium text-[15px] text-white leading-[20px]">
                  {item.value}
                </span>
                {item.sub && (
                  <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.35)] leading-[18px]">
                    {item.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
