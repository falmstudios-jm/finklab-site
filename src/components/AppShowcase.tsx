'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const PHONE_LAYERS = [
  '/images/phone/frame.png',
  '/images/phone/screen-map.png',
  '/images/phone/screen-avatars-1.png',
  '/images/phone/screen-avatars-2.png',
  '/images/phone/screen-network.png',
  '/images/phone/screen-counts.png',
  '/images/phone/navbar.png',
];

export default function AppShowcase() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Mouse parallax
    const handleMouse = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        const strength = ((i + 1) / PHONE_LAYERS.length) * 6;
        layer.style.transform = `translate(${mx * strength}px, ${my * strength * 0.5}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section id="fink" className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col gap-[16px] mb-[64px] md:mb-[80px]">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            Our products
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[56px] leading-[1em] tracking-[-0.02em] text-white max-w-[600px]">
            Built for birders.
            <br />
            <span className="gradient-text">Powered by data.</span>
          </h2>
        </div>

        {/* Fink App — main product showcase */}
        <div className="glass-card rounded-[32px] p-[40px] md:p-[56px] flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-center">
          {/* Left text */}
          <div className="flex flex-col gap-[24px] flex-1 min-w-0">
            <div className="flex items-center gap-[12px] flex-wrap">
              <Image
                src="/images/fink-logo.svg"
                alt="Fink"
                width={40}
                height={40}
                className="w-[36px] h-[36px]"
              />
              <h3 className="font-[family-name:var(--font-zain)] font-bold text-[32px] md:text-[40px] leading-[1em] text-white">
                Fink App
              </h3>
              <span className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] bg-[#85F18F] font-[family-name:var(--font-rubik)] text-[12px] font-medium text-[#101D2F] tracking-[0.3px]">
                Coming soon
              </span>
            </div>

            <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[20px] leading-[1.6] text-[rgba(255,255,255,0.5)] max-w-[440px]">
              Find birds. Share sightings. Explore the wild. The citizen science platform that turns every birdwatcher into a data contributor.
            </p>

            <div className="flex flex-col gap-[12px] pt-[4px]">
              {[
                'Smart species detection with state-of-the-art algorithms',
                'Real-time sighting map with community observations',
                'Personal collection — track your species across regions',
                'Trust-scored data that feeds directly into research',
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-[10px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#85F18F] mt-[8px] shrink-0" />
                  <span className="font-[family-name:var(--font-rubik)] text-[15px] leading-[22px] text-[rgba(255,255,255,0.45)]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-[12px] pt-[8px] flex-wrap">
              <a
                href="https://www.finkapp.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[8px] h-[48px] px-[24px] rounded-[16px] bg-[#85F18F] font-[family-name:var(--font-rubik)] font-medium text-[15px] text-[#101D2F] hover:bg-[#6de678] transition-colors"
              >
                Join the waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://finkapp.eu/wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[8px] h-[48px] px-[24px] rounded-[40px] border border-[rgba(255,255,255,0.12)] font-[family-name:var(--font-rubik)] font-medium text-[15px] text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              >
                Explore the Wiki
              </a>
            </div>
          </div>

          {/* Right — layered phone mockup */}
          <div
            ref={phoneRef}
            className="relative shrink-0 w-[260px] md:w-[300px]"
            style={{ aspectRatio: '1117 / 2274' }}
          >
            {PHONE_LAYERS.map((src, i) => (
              <div
                key={i}
                ref={(el) => { layerRefs.current[i] = el; }}
                className="absolute inset-0 transition-transform duration-700 ease-out"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-contain"
                  priority={i <= 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
