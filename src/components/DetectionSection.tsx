'use client';

export default function DetectionSection() {
  return (
    <section className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-[48px] md:gap-[64px] items-center">
          {/* Left — pipeline visualization */}
          <div className="flex-1 flex justify-center">
            <div className="glass-card rounded-[32px] p-[40px] md:p-[48px] w-full max-w-[480px]">
              <div className="flex flex-col gap-[20px]">
                {[
                  { step: '01', label: 'Observation entered in the field', color: '#85F18F', desc: 'Direct entry outdoors — not later at home' },
                  { step: '02', label: 'Smart species identification', color: '#00D4FF', desc: 'Advanced algorithms, confidence scoring' },
                  { step: '03', label: 'Trust-scored & validated', color: '#CDFF5B', desc: 'Observer reputation, pattern matching' },
                  { step: '04', label: 'Appears on the living map', color: '#85F18F', desc: 'Real-time, deduplicated, research-ready' },
                ].map((item, i) => (
                  <div key={item.step}>
                    <div className="flex items-center gap-[14px]">
                      <div
                        className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${item.color}12` }}
                      >
                        <span className="font-mono text-[13px] font-bold" style={{ color: item.color }}>
                          {item.step}
                        </span>
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <span className="font-[family-name:var(--font-rubik)] font-medium text-[15px] text-white leading-[20px]">
                          {item.label}
                        </span>
                        <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.3)] leading-[18px]">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="w-[1px] h-[16px] bg-[rgba(255,255,255,0.06)] ml-[20px] my-[4px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="flex flex-col gap-[20px] flex-1">
            <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
              How it works
            </span>
            <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[48px] leading-[1em] tracking-[-0.02em] text-white">
              From sighting to
              <br />
              <span className="gradient-text">research dataset.</span>
            </h2>
            <p className="font-[family-name:var(--font-rubik)] text-[15px] md:text-[17px] leading-[1.7] text-[rgba(255,255,255,0.45)]">
              A rare bird appears. Someone discovers it. With fink, that moment doesn&apos;t disappear into a notebook or a chat history. It becomes a dot on the map. Then another. The bird world moves — in real-time.
            </p>
            <p className="font-[family-name:var(--font-rubik)] text-[15px] md:text-[17px] leading-[1.7] text-[rgba(255,255,255,0.45)]">
              Every observation passes through our validation pipeline — species detection, trust scoring, deduplication — before joining the living map. The result: clean, structured data that researchers can use without weeks of preprocessing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
