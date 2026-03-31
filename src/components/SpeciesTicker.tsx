'use client';

import { useEffect, useState, useRef } from 'react';

interface BirdEntry {
  name: string;
  latin: string;
  head: string | null;
  rarity: string;
}

const RARITY_COLORS: Record<string, string> = {
  common: '#1DB2F3',
  uncommon: '#8A62E0',
  rare: '#E44CB7',
  very_rare: '#EE6135',
  legendary: '#EEBA0F',
  abundant: 'rgba(255,255,255,0.4)',
};

/**
 * Real-time species data feed ticker — shows bird names scrolling past
 * like a stock ticker or live data feed.
 */
export default function SpeciesTicker() {
  const [birds, setBirds] = useState<BirdEntry[]>([]);
  const [visibleBirds, setVisibleBirds] = useState<BirdEntry[]>([]);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch('/birds-full.json');
        const data: BirdEntry[] = await resp.json();
        const shuffled = data.sort(() => Math.random() - 0.5);
        setBirds(shuffled);
      } catch { /* */ }
    }
    load();
  }, []);

  useEffect(() => {
    if (birds.length === 0) return;

    let idx = 0;
    intervalRef.current = setInterval(() => {
      const bird = birds[idx % birds.length];
      setVisibleBirds((prev) => [bird, ...prev].slice(0, 8));
      setCounter((c) => c + 1);
      idx++;
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [birds]);

  return (
    <div className="glass-card rounded-[24px] p-[24px] md:p-[32px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[8px] h-[8px] rounded-full bg-[#85F18F] animate-pulse" />
          <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)]">
            Live species feed
          </span>
        </div>
        <span className="font-mono text-[14px] gradient-text font-bold">
          {counter.toString().padStart(4, '0')}
        </span>
      </div>

      {/* Ticker entries */}
      <div className="flex flex-col gap-[4px]">
        {visibleBirds.map((bird, i) => {
          const color = RARITY_COLORS[bird.rarity] ?? RARITY_COLORS.common;
          return (
            <div
              key={`${bird.name}-${i}`}
              className="flex items-center gap-[12px] py-[6px] transition-all duration-500"
              style={{
                opacity: 1 - i * 0.12,
                transform: `translateY(${i === 0 ? '-4px' : '0'})`,
                animation: i === 0 ? 'ticker-in 0.3s ease-out' : undefined,
              }}
            >
              {/* Bird head */}
              {bird.head && (
                <div className="w-[28px] h-[28px] rounded-full overflow-hidden shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bird.head} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" style={{ transform: 'scale(1.2) translateY(15%)' }} />
                </div>
              )}

              {/* Name */}
              <span className="font-[family-name:var(--font-rubik)] text-[14px] text-white flex-1 truncate">
                {bird.name}
              </span>

              {/* Latin name */}
              <span className="font-[family-name:var(--font-rubik)] text-[12px] text-[rgba(255,255,255,0.25)] italic hidden md:block truncate max-w-[160px]">
                {bird.latin}
              </span>

              {/* Rarity dot */}
              <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: color }} />
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes ticker-in {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
