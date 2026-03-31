'use client';

export default function DetectionSection() {
  return (
    <section className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-[48px] md:gap-[64px] items-center">
          {/* Left — visual */}
          <div className="flex-1 flex justify-center">
            <div className="glass-card rounded-[32px] p-[40px] md:p-[56px] w-full max-w-[480px]">
              {/* Simulated detection flow */}
              <div className="flex flex-col gap-[24px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[rgba(133,241,143,0.1)] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13.8 12H3" stroke="#85F18F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.1em] uppercase">Step 1</span>
                    <p className="font-[family-name:var(--font-rubik)] text-[15px] text-white">Observation input</p>
                  </div>
                </div>

                <div className="w-px h-[24px] bg-[rgba(255,255,255,0.08)] ml-[24px]" />

                <div className="flex items-center gap-[12px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="#00D4FF" strokeWidth="1.5" />
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.1em] uppercase">Step 2</span>
                    <p className="font-[family-name:var(--font-rubik)] text-[15px] text-white">Smart species detection</p>
                  </div>
                </div>

                <div className="w-px h-[24px] bg-[rgba(255,255,255,0.08)] ml-[24px]" />

                <div className="flex items-center gap-[12px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[rgba(205,255,91,0.1)] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11l3 3L22 4" stroke="#CDFF5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#CDFF5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.1em] uppercase">Step 3</span>
                    <p className="font-[family-name:var(--font-rubik)] text-[15px] text-white">Trust-scored & validated</p>
                  </div>
                </div>

                <div className="w-px h-[24px] bg-[rgba(255,255,255,0.08)] ml-[24px]" />

                <div className="flex items-center gap-[12px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[rgba(133,241,143,0.15)] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 7V4h16v3M9 20h6M12 4v16" stroke="#85F18F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.1em] uppercase">Step 4</span>
                    <p className="font-[family-name:var(--font-rubik)] text-[15px] text-white">Research-ready dataset</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="flex flex-col gap-[20px] flex-1">
            <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
              Bird Detection
            </span>
            <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[48px] leading-[1em] tracking-[-0.02em] text-white">
              State-of-the-art
              <br />
              <span className="gradient-text">species detection.</span>
            </h2>
            <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.45)]">
              Our detection algorithm uses advanced pattern matching trained on millions of verified observations. Answer a few questions or upload a photo — and our system identifies the species with high confidence.
            </p>
            <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[18px] leading-[1.7] text-[rgba(255,255,255,0.45)]">
              Every identification feeds back into the system, continuously improving accuracy. Combined with our Trust Score, we ensure only high-quality data reaches research databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
