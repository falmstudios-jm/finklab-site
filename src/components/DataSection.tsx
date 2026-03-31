'use client';

const DIFFERENTIATORS = [
  {
    icon: '⏱',
    title: 'Stay Duration Tracking',
    description:
      'We measure how long individual birds remain at a location — not just binary sightings. This temporal depth unlocks migration timing, habitat preference, and behavioral pattern analysis.',
    color: '#85F18F',
  },
  {
    icon: '🛡',
    title: 'Trust-Scored Observations',
    description:
      'Every observer has a trust factor calculated by advanced algorithms based on activity, accuracy, and reputation. Filter data by quality to match your research requirements.',
    color: '#00D4FF',
  },
  {
    icon: '📊',
    title: 'Research-Ready Formats',
    description:
      'Standardized data schemas designed for direct integration into research workflows. Temporal coverage, spatial resolution, and species metadata — structured and documented.',
    color: '#CDFF5B',
  },
];

export default function DataSection() {
  return (
    <section id="data" className="relative py-[120px] md:py-[160px]">
      {/* Subtle gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-[16px] mb-[64px] md:mb-[80px] max-w-[700px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            Data & Research
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[56px] leading-[1em] tracking-[-0.02em] text-white">
            Data infrastructure for
            <br />
            <span className="gradient-text">conservation science.</span>
          </h2>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[20px] leading-[1.6] text-[rgba(255,255,255,0.45)] pt-[8px]">
            Not another citizen science dump. finklab data is validated, enriched, and formatted — ready for the research that matters.
          </p>
        </div>

        {/* Differentiator cards */}
        <div className="flex flex-col gap-[24px]">
          {DIFFERENTIATORS.map((diff) => (
            <div
              key={diff.title}
              className="glass-card rounded-[24px] p-[32px] md:p-[40px] flex flex-col md:flex-row gap-[24px] md:gap-[40px] items-start transition-all duration-300"
            >
              {/* Icon + accent */}
              <div className="flex items-center gap-[16px] md:w-[280px] shrink-0">
                <span className="text-[28px]">{diff.icon}</span>
                <h3 className="font-[family-name:var(--font-zain)] font-bold text-[22px] md:text-[24px] leading-[1.1em] text-white">
                  {diff.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-[family-name:var(--font-rubik)] text-[15px] md:text-[17px] leading-[1.7] text-[rgba(255,255,255,0.45)] flex-1">
                {diff.description}
              </p>

              {/* Accent bar */}
              <div
                className="hidden md:block w-[3px] h-[60px] rounded-full self-center shrink-0"
                style={{ backgroundColor: diff.color, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Sample data schema — terminal aesthetic */}
        <div className="mt-[64px] glass-card rounded-[20px] overflow-hidden">
          <div className="flex items-center gap-[8px] px-[20px] py-[12px] border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
            </div>
            <span className="font-mono text-[12px] text-[rgba(255,255,255,0.25)] ml-[8px]">
              observation_schema.json
            </span>
          </div>
          <pre className="p-[24px] md:p-[32px] font-mono text-[13px] md:text-[14px] leading-[1.8] text-[rgba(255,255,255,0.5)] overflow-x-auto">
            <code>{`{
  "species_id":       "FINK-0342",
  "latin_name":       "Carduelis carduelis",
  "observer_trust":   0.94,
  "location":         { "lat": 54.1833, "lng": 7.8833 },
  "region_code":      "DE-SH",
  "timestamp":        "2026-03-28T08:42:00Z",
  "stay_duration_h":  4.2,
  "confidence":       "verified",
  "rarity_score":     72
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
