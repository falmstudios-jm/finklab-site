'use client';

const FEATURES = [
  {
    number: '01',
    title: 'Fink Platform',
    description:
      'A citizen science platform designed for scale. Birders record sightings, track species, and contribute to the largest structured observation dataset in Europe.',
    accent: '#85F18F',
  },
  {
    number: '02',
    title: 'Research-Grade Data',
    description:
      'Every observation is validated, enriched with metadata, and formatted for direct integration into research workflows. No cleaning required.',
    accent: '#00D4FF',
  },
  {
    number: '03',
    title: 'Species Intelligence',
    description:
      'State-of-the-art identification systems, rarity scoring, and temporal pattern analysis. Smart algorithms that learn from millions of observations.',
    accent: '#CDFF5B',
  },
];

export default function Features() {
  return (
    <section id="about" className="relative py-[120px] md:py-[160px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col gap-[16px] mb-[64px] md:mb-[80px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            What we build
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[56px] leading-[1em] tracking-[-0.02em] text-white max-w-[600px]">
            Infrastructure for
            <br />
            <span className="gradient-text">biodiversity data.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="glass-card rounded-[24px] p-[32px] md:p-[36px] flex flex-col gap-[20px] transition-all duration-300 group"
            >
              {/* Number */}
              <span
                className="font-mono text-[13px] tracking-[0.1em]"
                style={{ color: feature.accent }}
              >
                {feature.number}
              </span>

              {/* Accent line */}
              <div
                className="w-[40px] h-[2px] rounded-full transition-all duration-300 group-hover:w-[60px]"
                style={{ backgroundColor: feature.accent }}
              />

              {/* Title */}
              <h3 className="font-[family-name:var(--font-zain)] font-bold text-[24px] md:text-[28px] leading-[1.1em] text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-[family-name:var(--font-rubik)] text-[15px] leading-[1.6] text-[rgba(255,255,255,0.45)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
