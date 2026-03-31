'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'What is finklab?',
    a: 'finklab GmbH is the company behind Fink — the citizen science platform for birdwatchers. We build the data infrastructure that turns bird observations into research-grade datasets.',
  },
  {
    q: 'How is finklab data different from other citizen science data?',
    a: 'Two key differentiators: We track stay duration (how long a bird remains at a location, not just whether it was seen) and every observation has a Trust Score calculated by advanced algorithms based on the observer\'s track record. This means researchers can filter by data quality.',
  },
  {
    q: 'Can research institutions access finklab data?',
    a: 'Yes. Our data is structured in standardized formats designed for direct integration into research workflows. Contact us to discuss access, API integration, and custom data exports.',
  },
  {
    q: 'What species does finklab cover?',
    a: 'We currently cover 894 European bird species with comprehensive data including identification guides, rarity scores, distribution maps, and conservation status — all powered by real observation data.',
  },
  {
    q: 'Where is finklab based?',
    a: 'We\'re based on Helgoland, Germany\'s most remote island and one of Europe\'s premier bird migration hotspots. Our location gives us a unique perspective on migratory patterns and species diversity.',
  },
  {
    q: 'Is the Fink app available yet?',
    a: 'The Fink Bird Wiki is live at finkapp.eu/wiki. The full Fink app with community features, real-time sighting maps, and species collection is coming soon to App Store and Google Play.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-[120px] md:py-[160px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[720px] px-6 md:px-12">
        <div className="flex flex-col gap-[16px] mb-[48px] text-center">
          <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
            FAQ
          </span>
          <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[48px] leading-[1em] tracking-[-0.02em] text-white">
            Frequently asked
            <br />
            <span className="gradient-text">questions.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-[8px]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-card rounded-[20px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-[24px] py-[20px] text-left cursor-pointer"
                >
                  <span className="font-[family-name:var(--font-rubik)] font-medium text-[15px] md:text-[17px] text-white leading-[24px] pr-[16px]">
                    {item.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    <path d="M12 5v14M5 12h14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-[24px] pb-[20px] font-[family-name:var(--font-rubik)] text-[15px] leading-[1.6] text-[rgba(255,255,255,0.45)]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
