'use client';

import SpeciesTicker from './SpeciesTicker';

const DIFFERENTIATORS = [
  {
    title: 'Stay Duration Tracking',
    description:
      'We measure how long individual birds remain at a location — not just whether they were seen. This temporal depth unlocks migration timing, habitat preference, and behavioral patterns that point-in-time sightings simply cannot provide.',
    color: '#85F18F',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#85F18F" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="#85F18F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Trust-Scored Observations',
    description:
      'Every observer earns a trust factor calculated by advanced algorithms based on activity, accuracy, and community reputation. Researchers can filter datasets by quality threshold — no more noise, no more guessing.',
    color: '#00D4FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Deduplicated Living Map',
    description:
      'One shared real-time map replaces thousands of isolated reports. Observations that previously lived in notebooks and chat histories are now consolidated — reducing duplicate sightings and creating a single source of truth.',
    color: '#CDFF5B',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#CDFF5B" strokeWidth="1.5" />
        <circle cx="12" cy="10" r="3" stroke="#CDFF5B" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function DataSection() {
  return (
    <section id="data" className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-[16px] mb-[64px] md:mb-[80px] max-w-[700px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            Data & Research
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[56px] leading-[1em] tracking-[-0.02em] text-white">
            Visible for science.
          </h2>
          <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[20px] leading-[1.6] text-[rgba(255,255,255,0.45)] pt-[8px]">
            Many individual observations together yield valuable data for conservation and research. finklab data is validated, trust-scored, and structured — not another raw dump, but research-grade datasets ready for integration.
          </p>
        </div>

        {/* Differentiator cards + ticker side by side on desktop */}
        <div className="flex flex-col lg:flex-row gap-[24px]">
          {/* Cards column */}
          <div className="flex flex-col gap-[16px] flex-1">
            {DIFFERENTIATORS.map((diff) => (
              <div
                key={diff.title}
                className="glass-card rounded-[24px] p-[28px] md:p-[32px] flex gap-[16px] items-start transition-all duration-300 group"
              >
                <div
                  className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${diff.color}10` }}
                >
                  {diff.icon}
                </div>
                <div className="flex flex-col gap-[8px] min-w-0">
                  <h3 className="font-[family-name:var(--font-zain)] font-bold text-[20px] md:text-[22px] leading-[1.1em] text-white">
                    {diff.title}
                  </h3>
                  <p className="font-[family-name:var(--font-rubik)] text-[15px] leading-[1.6] text-[rgba(255,255,255,0.4)]">
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live species ticker */}
          <div className="lg:w-[360px] shrink-0">
            <SpeciesTicker />
          </div>
        </div>

        {/* Sample data schema */}
        <div className="mt-[24px] glass-card rounded-[24px] overflow-hidden">
          <div className="flex items-center gap-[8px] px-[20px] py-[12px] border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
            </div>
            <span className="font-mono text-[12px] text-[rgba(255,255,255,0.25)] ml-[8px]">
              observation_record.json
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
