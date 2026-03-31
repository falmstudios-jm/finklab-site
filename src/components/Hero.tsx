'use client';

import { useRef, useEffect } from 'react';
import BirdGlobe from './BirdGlobe';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in on mount
    if (textRef.current) {
      textRef.current.style.opacity = '1';
      textRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Globe — positioned to show bottom-right quarter */}
      <div className="absolute inset-0 globe-mask pointer-events-none">
        <div className="absolute -right-[20%] -bottom-[20%] w-[110%] h-[110%] md:w-[80%] md:h-[120%] md:right-[-15%] md:bottom-[-25%]">
          <BirdGlobe />
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 20% 50%, rgba(10,15,26,0.95) 0%, rgba(10,15,26,0.4) 60%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12 py-32 md:py-0 w-full">
        <div
          ref={textRef}
          className="max-w-[640px] flex flex-col gap-[24px] md:gap-[32px] transition-all duration-1000 ease-out"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-[10px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#85F18F] animate-pulse" />
            <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.4)]">
              Helgoland, Germany
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-zain)] font-bold text-[48px] md:text-[80px] lg:text-[96px] leading-[0.95em] tracking-[-0.02em] text-white">
            The living map
            <br />
            of the{' '}
            <span className="gradient-text">bird world.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[20px] leading-[1.6] text-[rgba(255,255,255,0.5)] max-w-[480px]">
            finklab makes birdwatching visible, social, and modern. We build the platform where individual observations become a living, usable map — for birders, communities, and science.
          </p>

          {/* Stats */}
          <div className="flex gap-[40px] md:gap-[56px] pt-[8px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[44px] leading-[1] gradient-text">
                894
              </span>
              <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.35)] tracking-[0.05em] uppercase">
                Species tracked
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[44px] leading-[1] gradient-text">
                40+
              </span>
              <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.35)] tracking-[0.05em] uppercase">
                Regions
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[44px] leading-[1] gradient-text">
                24/7
              </span>
              <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.35)] tracking-[0.05em] uppercase">
                Real-time
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-[16px] pt-[8px]">
            <a
              href="#data"
              className="inline-flex items-center h-[56px] px-[32px] rounded-[16px] bg-[#85F18F] font-[family-name:var(--font-rubik)] font-medium text-[17px] text-[#101D2F] hover:bg-[#6de678] transition-colors"
            >
              Explore our data
            </a>
            <a
              href="#fink"
              className="inline-flex items-center h-[56px] px-[32px] rounded-[40px] border border-[rgba(255,255,255,0.12)] font-[family-name:var(--font-rubik)] font-medium text-[17px] text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            >
              See the product
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[8px] animate-bounce">
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.2)]" />
      </div>
    </section>
  );
}
