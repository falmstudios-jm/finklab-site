'use client';

import { useEffect, useRef, useState } from 'react';

interface FlyingBird {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  depth: number; // 0=far, 1=near — controls parallax strength
  imgUrl: string;
  direction: 1 | -1;
}

/**
 * Parallax flying birds scattered across the page.
 * Birds at different depths move at different speeds on scroll.
 * Gray translucent clouds drift behind them.
 */
export default function ParallaxBirds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [birds, setBirds] = useState<FlyingBird[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    async function loadBirds() {
      try {
        const resp = await fetch('/birds-full.json');
        const data = await resp.json();
        // Pick 18 random birds with side views
        const withSide = data.filter((b: { side: string | null }) => b.side);
        const shuffled = withSide.sort(() => Math.random() - 0.5).slice(0, 18);

        const generated: FlyingBird[] = shuffled.map((b: { side: string }, i: number) => ({
          id: i,
          x: Math.random() * 100,
          y: 15 + (i / 18) * 70 + Math.random() * 8,
          speed: 0.3 + Math.random() * 0.7,
          size: 40 + Math.random() * 50,
          opacity: 0.08 + Math.random() * 0.12,
          depth: Math.random(),
          imgUrl: b.side,
          direction: Math.random() > 0.5 ? 1 : -1,
        }));
        setBirds(generated);
      } catch {
        // Silently fail
      }
    }
    loadBirds();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Gray clouds */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={`cloud-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80,
            height: 60 + i * 20,
            background: `radial-gradient(ellipse, rgba(255,255,255,${0.015 + i * 0.005}) 0%, transparent 70%)`,
            left: `${(i * 23) % 100}%`,
            top: `${10 + i * 18}%`,
            transform: `translateX(${scrollY * (0.02 + i * 0.01) * (i % 2 === 0 ? 1 : -1)}px)`,
            transition: 'transform 0.1s linear',
          }}
        />
      ))}

      {/* Flying birds */}
      {birds.map((bird) => {
        const parallaxOffset = scrollY * bird.depth * 0.15 * bird.direction;
        return (
          <div
            key={bird.id}
            className="absolute"
            style={{
              left: `${bird.x}%`,
              top: `${bird.y}%`,
              transform: `translateY(${-parallaxOffset}px) scaleX(${bird.direction})`,
              opacity: bird.opacity,
              width: bird.size,
              height: bird.size,
              transition: 'transform 0.05s linear',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bird.imgUrl}
              alt=""
              className="w-full h-full object-contain"
              loading="lazy"
              crossOrigin="anonymous"
            />
          </div>
        );
      })}
    </div>
  );
}
