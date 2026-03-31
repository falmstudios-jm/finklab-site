'use client';

import { useEffect, useRef } from 'react';

interface BirdGlobeProps {
  className?: string;
}

const MAX_BIRDS = 500;
const ROTATE_SPEED = 0.0012;
const INITIAL_TILT = 0.35;
const GLOBE_SIZE = 0.43;
const BIRD_SIZE = 0.095;
const SPRITE_RES = 96;

const CIRCLE_COLORS = [
  '#f5ddd1', '#d4e8f0', '#dce8d4', '#f0e4d4', '#e4d8ee',
  '#f5e0d0', '#d8e8e4', '#f0d8d8', '#e8e4d0', '#d8dce8',
];

export default function BirdGlobe({ className }: BirdGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let animId = 0;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Fibonacci sphere distribution
    const golden = Math.PI * (3 - Math.sqrt(5));
    const birds: Array<{ theta: number; phi: number; rOff: number; sizeVar: number }> = [];
    for (let i = 0; i < MAX_BIRDS; i++) {
      const t = i / (MAX_BIRDS - 1);
      birds.push({
        theta: Math.acos(1 - 2 * t),
        phi: golden * i,
        rOff: 0.95 + Math.random() * 0.1,
        sizeVar: 0.7 + Math.random() * 0.5,
      });
    }

    const sprites: HTMLCanvasElement[] = [];

    function makeSpriteFromImage(img: HTMLImageElement, colorIdx: number) {
      const sz = SPRITE_RES;
      const oc = document.createElement('canvas');
      oc.width = sz;
      oc.height = sz;
      const c = oc.getContext('2d')!;
      c.beginPath();
      c.arc(sz / 2, sz / 2, sz / 2, 0, Math.PI * 2);
      c.fillStyle = CIRCLE_COLORS[colorIdx % CIRCLE_COLORS.length];
      c.fill();
      // Clip to circle, then draw bird head larger and shifted down
      // (matching the wiki hero: head overflows bottom of circle)
      c.save();
      c.beginPath();
      c.arc(sz / 2, sz / 2, sz / 2 - 1, 0, Math.PI * 2);
      c.clip();
      const bsz = sz * 1.12;           // head is ~12% larger than circle
      const offX = (sz - bsz) / 2;     // centered horizontally
      const offY = sz * 0.08;           // shifted down ~8% to crop top, show neck
      c.drawImage(img, offX, offY, bsz, bsz);
      c.restore();
      return oc;
    }

    function loadImage(url: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
      });
    }

    async function loadBirds() {
      let urls: string[];
      try {
        const resp = await fetch('/birds.json');
        urls = await resp.json();
      } catch {
        console.warn('BirdGlobe: could not fetch birds.json');
        return;
      }

      // Shuffle
      for (let i = urls.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [urls[i], urls[j]] = [urls[j], urls[i]];
      }

      const toLoad = urls.slice(0, MAX_BIRDS);
      const batch = 20;
      for (let i = 0; i < toLoad.length; i += batch) {
        const chunk = toLoad.slice(i, i + batch);
        const results = await Promise.allSettled(chunk.map((u) => loadImage(u)));
        for (const r of results) {
          if (r.status === 'fulfilled') {
            sprites.push(makeSpriteFromImage(r.value, sprites.length));
          }
        }
      }
    }

    let rotY = 0;
    const rotX = INITIAL_TILT;

    function render() {
      animId = requestAnimationFrame(render);
      rotY += ROTATE_SPEED;

      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * GLOBE_SIZE;

      ctx!.clearRect(0, 0, W, H);

      const numActive = Math.min(birds.length, sprites.length);
      if (numActive === 0) return;

      const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
      const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);

      const projected: Array<{
        sx: number; sy: number; z: number;
        size: number; alpha: number; sprite: number;
      }> = [];

      for (let i = 0; i < numActive; i++) {
        const b = birds[i];
        const x = Math.sin(b.theta) * Math.cos(b.phi) * b.rOff;
        const y = Math.cos(b.theta) * b.rOff;
        const z = Math.sin(b.theta) * Math.sin(b.phi) * b.rOff;
        const y2 = y * cosRX - z * sinRX;
        const z2 = y * sinRX + z * cosRX;
        const x3 = x * cosRY + z2 * sinRY;
        const z3 = -x * sinRY + z2 * cosRY;
        const depth = (z3 + 1) / 2;
        projected.push({
          sx: cx + x3 * radius,
          sy: cy + y2 * radius,
          z: z3,
          size: radius * BIRD_SIZE * b.sizeVar * (0.3 + depth * 0.8),
          alpha: 0.05 + depth * 0.95,
          sprite: i % sprites.length,
        });
      }

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        ctx!.save();
        ctx!.globalAlpha = p.alpha;
        ctx!.drawImage(sprites[p.sprite], p.sx - p.size / 2, p.sy - p.size / 2, p.size, p.size);
        ctx!.restore();
      }
    }

    requestAnimationFrame(render);
    loadBirds();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
