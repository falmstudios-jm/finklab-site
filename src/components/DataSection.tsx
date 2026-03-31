'use client';

const DIFFERENTIATORS = [
  {
    title: 'Stay Duration',
    description:
      'We track how long birds remain at a location — not just whether they were seen. Temporal depth that point-in-time sightings cannot provide.',
    color: '#85F18F',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#85F18F" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="#85F18F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Trust Scores',
    description:
      'Every observer earns a trust factor. Researchers can filter datasets by quality threshold — no noise, no guessing.',
    color: '#00D4FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Deduplicated Map',
    description:
      'One shared real-time map replaces thousands of isolated reports. Single source of truth for conservation research.',
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
        <div className="flex flex-col gap-[16px] mb-[64px] md:mb-[80px] max-w-[600px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            Data & Research
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[56px] leading-[1em] tracking-[-0.02em] text-white">
            Visible for{' '}
            <span className="gradient-text">science.</span>
          </h2>
          <p className="font-[family-name:var(--font-rubik)] text-[15px] md:text-[17px] leading-[1.6] text-[rgba(255,255,255,0.45)]">
            Validated, trust-scored, and structured — research-grade datasets ready for direct integration.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[32px]">
          {DIFFERENTIATORS.map((diff) => (
            <div
              key={diff.title}
              className="glass-card rounded-[24px] p-[28px] flex flex-col gap-[16px] transition-all duration-300 group"
            >
              <div
                className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center"
                style={{ backgroundColor: `${diff.color}10` }}
              >
                {diff.icon}
              </div>
              <h3 className="font-[family-name:var(--font-zain)] font-bold text-[22px] md:text-[28px] leading-[1.1em] text-white">
                {diff.title}
              </h3>
              <p className="font-[family-name:var(--font-rubik)] text-[15px] md:text-[17px] leading-[1.6] text-[rgba(255,255,255,0.4)]">
                {diff.description}
              </p>
            </div>
          ))}
        </div>

        {/* Schema preview */}
        <div className="glass-card rounded-[24px] overflow-hidden">
          <div className="flex items-center gap-[8px] px-[20px] py-[12px] border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,0.1)]" />
            </div>
            <span className="font-mono text-[13px] text-[rgba(255,255,255,0.25)] ml-[8px]">
              observation_record.json
            </span>
          </div>
          <pre className="p-[24px] md:p-[32px] font-mono text-[13px] leading-[1.8] text-[rgba(255,255,255,0.45)] overflow-x-auto">
            <code>{`{
  "species":          "Carduelis carduelis",
  "observer_trust":   0.94,
  "stay_duration_h":  4.2,
  "location":         { "lat": 54.18, "lng": 7.88 },
  "confidence":       "verified",
  "rarity_score":     72
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
