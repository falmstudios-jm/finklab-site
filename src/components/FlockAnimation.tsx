'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered flock — when this section enters the viewport,
 * a flock of side-view birds flies across the screen in formation.
 */
export default function FlockAnimation() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [birdUrls, setBirdUrls] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch('/birds-full.json');
        const data = await resp.json();
        const withSide = data.filter((b: { side: string | null }) => b.side);
        const picked = withSide.sort(() => Math.random() - 0.5).slice(0, 12);
        setBirdUrls(picked.map((b: { side: string }) => b.side));
      } catch { /* */ }
    }
    load();
  }, []);

  useEffect(() => {
    if (!triggerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  // V-formation positions (leader + wings)
  const formation = [
    { x: 50, y: 40, delay: 0, size: 64 },       // leader
    { x: 42, y: 48, delay: 0.1, size: 56 },      // left 1
    { x: 58, y: 48, delay: 0.12, size: 56 },     // right 1
    { x: 34, y: 56, delay: 0.22, size: 48 },      // left 2
    { x: 66, y: 56, delay: 0.24, size: 48 },     // right 2
    { x: 26, y: 64, delay: 0.34, size: 44 },      // left 3
    { x: 74, y: 64, delay: 0.36, size: 44 },     // right 3
    { x: 18, y: 72, delay: 0.46, size: 40 },      // left 4
    { x: 82, y: 72, delay: 0.48, size: 40 },     // right 4
    { x: 10, y: 80, delay: 0.58, size: 36 },      // left 5
    { x: 90, y: 80, delay: 0.6, size: 36 },      // right 5
    { x: 2, y: 88, delay: 0.7, size: 32 },       // left 6
  ];

  return (
    <div ref={triggerRef} className="relative w-full h-[200px] md:h-[300px] overflow-hidden my-[-40px]">
      {triggered && birdUrls.map((url, i) => {
        const pos = formation[i % formation.length];
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: pos.size,
              height: pos.size,
              opacity: 0,
              transform: 'translateX(-120vw)',
              animation: `flock-fly 2.5s ease-out ${pos.delay}s forwards`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
              style={{ transform: 'scaleX(-1)' }} // flying right
            />
          </div>
        );
      })}

      <style>{`
        @keyframes flock-fly {
          0% { opacity: 0; transform: translateX(-120vw); }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { opacity: 0; transform: translateX(120vw); }
        }
      `}</style>
    </div>
  );
}
