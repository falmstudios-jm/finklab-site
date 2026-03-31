'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface FeatureSlide {
  id: string;
  title: string;
  body: string;
  layerFolder: string;
  layerCount: number;
  aspectRatio: string;
}

const SLIDES: FeatureSlide[] = [
  {
    id: 'discover',
    title: 'Real-time shared map.',
    body: 'Every observation appears instantly on a live map. See what\'s being spotted right now, discover hotspots, and plan your next trip based on real community data.',
    layerFolder: 'layers-map',
    layerCount: 12,
    aspectRatio: '1381 / 1465',
  },
  {
    id: 'community',
    title: 'Making birdwatching enjoyable.',
    body: 'Join guilds, compete on leaderboards, and connect with birders near you. Citizen science doesn\'t have to be boring — we make every observation count and every outing rewarding.',
    layerFolder: 'layers-guilds',
    layerCount: 4,
    aspectRatio: '1381 / 1632',
  },
  {
    id: 'detection',
    title: 'Smart species detection.',
    body: 'State-of-the-art algorithms trained on millions of verified observations. Answer a few questions or upload a photo — instant species identification with confidence scoring.',
    layerFolder: 'layers-species',
    layerCount: 10,
    aspectRatio: '1381 / 1632',
  },
  {
    id: 'collection',
    title: 'Personal data exports.',
    body: 'Track your species across regions, export your data in digestible formats, and build your personal biodiversity portfolio. Your observations, your data, always accessible.',
    layerFolder: 'layers-collection',
    layerCount: 4,
    aspectRatio: '1381 / 1632',
  },
];

function getParallaxStrength(layerIndex: number, totalLayers: number): number {
  return ((layerIndex + 1) / totalLayers) * 12;
}

/* ─── Mobile Swipe Carousel ─── */
function MobileCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index % SLIDES.length);
  }, []);

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full snap-center flex flex-col items-center px-6 py-12 gap-8"
          >
            <div
              className="relative w-[85vw] max-w-[380px]"
              style={{ aspectRatio: slide.aspectRatio }}
            >
              {Array.from({ length: slide.layerCount }, (_, i) => i + 1).map((num) => (
                <div
                  key={num}
                  className="absolute inset-0 overflow-visible"
                  style={{ opacity: 1, zIndex: num }}
                >
                  <div className={`absolute inset-0 float-layer-${((num - 1) % 12) + 1}`}>
                    <Image
                      src={`/images/${slide.layerFolder}/layer-${num}.png`}
                      alt=""
                      fill
                      sizes="85vw"
                      className="object-contain"
                      priority={slideIndex === 0 && num <= 2}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 items-center">
              <h2 className="font-[family-name:var(--font-zain)] text-[32px] font-bold leading-[1em] tracking-[-0.4px] text-white text-center">
                {slide.title}
              </h2>
              <p className="font-[family-name:var(--font-rubik)] text-[17px] text-[rgba(255,255,255,0.5)] leading-relaxed text-center max-w-[340px]">
                {slide.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 pb-8">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === activeIndex ? '#85F18F' : 'rgba(255,255,255,0.15)',
              transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Desktop ScrollTrigger Slideshow ─── */
function DesktopSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideElements = useRef<HTMLDivElement[]>([]);
  const layerElements = useRef<Map<number, HTMLDivElement[]>>(new Map());
  const dotElements = useRef<HTMLDivElement[]>([]);
  const animatedSet = useRef<Set<number>>(new Set());
  const currentSlide = useRef<number>(-1);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
  }, []);

  const updateParallax = useCallback(() => {
    const active = currentSlide.current;
    if (active >= 0) {
      const layers = layerElements.current.get(active);
      const slide = SLIDES[active];
      if (layers && slide) {
        const mx = (mousePos.current.x - 0.5) * 2;
        const my = (mousePos.current.y - 0.5) * 2;
        layers.forEach((layer, i) => {
          if (!layer) return;
          const strength = getParallaxStrength(i, slide.layerCount);
          gsap.to(layer, { x: mx * strength, y: my * strength * 0.6, duration: 0.8, ease: 'power1.out', overwrite: 'auto' });
        });
      }
    }
    rafId.current = requestAnimationFrame(updateParallax);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const totalSlides = SLIDES.length;

    slideElements.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalSlides * 100}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIndex: number;
          if (progress < 0.30) activeIndex = 0;
          else if (progress < 0.56) activeIndex = 1;
          else if (progress < 0.80) activeIndex = 2;
          else activeIndex = 3;

          // Update slide visibility
          slideElements.current.forEach((el, i) => {
            if (!el) return;
            const shouldShow = i === activeIndex;
            gsap.set(el, { opacity: shouldShow ? 1 : 0 });
          });

          // Update dots
          dotElements.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.backgroundColor = i === activeIndex ? '#85F18F' : 'rgba(255,255,255,0.15)';
            dot.style.transform = i === activeIndex ? 'scale(1.3)' : 'scale(1)';
          });

          if (activeIndex !== currentSlide.current) {
            currentSlide.current = activeIndex;
            if (!animatedSet.current.has(activeIndex)) {
              animatedSet.current.add(activeIndex);
              playLayers(activeIndex);
            }
          }
        },
      },
    });

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(updateParallax);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function playLayers(slideIndex: number) {
    const layers = layerElements.current.get(slideIndex);
    if (!layers) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    layers.forEach((layer, i) => {
      if (i === 0 || !layer) return;
      tl.fromTo(layer, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.6 + i * 0.2);
    });
  }

  return (
    <div className="hidden md:block">
      <section ref={containerRef} className="relative h-screen overflow-hidden">
        {SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.id}
            ref={(el) => { if (el) slideElements.current[slideIndex] = el; }}
            className="absolute inset-0 flex items-center will-change-[opacity]"
          >
            <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              {/* Phone layers */}
              <div
                className="relative flex-shrink-0 w-[380px] lg:w-[450px] overflow-visible"
                style={{ aspectRatio: slide.aspectRatio }}
              >
                {Array.from({ length: slide.layerCount }, (_, i) => i + 1).map((num) => (
                  <div
                    key={num}
                    ref={(el) => {
                      if (!el) return;
                      if (!layerElements.current.has(slideIndex)) layerElements.current.set(slideIndex, []);
                      layerElements.current.get(slideIndex)![num - 1] = el;
                    }}
                    className="absolute inset-0 overflow-visible will-change-transform"
                    style={{ opacity: num === 1 ? 1 : 0, zIndex: num }}
                  >
                    <div className={`absolute inset-0 float-layer-${((num - 1) % 12) + 1}`}>
                      <Image
                        src={`/images/${slide.layerFolder}/layer-${num}.png`}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 380px, 450px"
                        className="object-contain"
                        priority={slideIndex === 0 && num <= 2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-5 max-w-[480px]">
                <h2 className="font-[family-name:var(--font-zain)] text-[40px] md:text-[56px] font-bold leading-[1em] tracking-[-0.4px] text-white">
                  {slide.title}
                </h2>
                <p className="font-[family-name:var(--font-rubik)] text-[17px] md:text-[20px] text-[rgba(255,255,255,0.5)] leading-relaxed">
                  {slide.body}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Progress dots */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 hidden lg:flex">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { if (el) dotElements.current[i] = el; }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === 0 ? '#85F18F' : 'rgba(255,255,255,0.15)',
                transform: i === 0 ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function FeatureSlideshow() {
  return (
    <div id="features">
      <MobileCarousel />
      <DesktopSlideshow />
    </div>
  );
}
