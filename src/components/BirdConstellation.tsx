'use client';

import { useEffect, useRef, useState } from 'react';

interface ConstellationNode {
  x: number;
  y: number;
  imgUrl: string;
  name: string;
  size: number;
  vx: number;
  vy: number;
}

/**
 * Bird constellation — a network graph of bird heads connected by glowing lines.
 * Palantir-style data visualization aesthetic.
 */
export default function BirdConstellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<ConstellationNode[]>([]);
  const spritesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [loaded, setLoaded] = useState(false);

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
      W = rect.width; H = rect.height;
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      canvas!.style.width = W + 'px'; canvas!.style.height = H + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const CONNECTION_DIST = 180;
    const NODE_COUNT = 30;

    async function init() {
      try {
        const resp = await fetch('/birds-full.json');
        const data = await resp.json();
        const withHead = data.filter((b: { head: string | null }) => b.head);
        const picked = withHead.sort(() => Math.random() - 0.5).slice(0, NODE_COUNT);

        // Preload images
        await Promise.allSettled(
          picked.map((b: { head: string; name: string }) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => { spritesRef.current.set(b.head, img); resolve(); };
              img.onerror = () => resolve();
              img.src = b.head;
            })
          )
        );

        // Create nodes
        nodesRef.current = picked.map((b: { head: string; name: string }) => ({
          x: Math.random() * W,
          y: Math.random() * H,
          imgUrl: b.head,
          name: b.name,
          size: 28 + Math.random() * 16,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        }));

        setLoaded(true);
      } catch { /* */ }
    }

    function render() {
      animId = requestAnimationFrame(render);
      ctx!.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      if (nodes.length === 0) return;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = W + 20;
        if (node.x > W + 20) node.x = -20;
        if (node.y < -20) node.y = H + 20;
        if (node.y > H + 20) node.y = -20;
      }

      // Draw connections
      ctx!.strokeStyle = 'rgba(133, 241, 143, 0.08)';
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx!.strokeStyle = `rgba(133, 241, 143, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes (bird heads in circles)
      for (const node of nodes) {
        const img = spritesRef.current.get(node.imgUrl);
        if (!img) continue;

        const sz = node.size;
        ctx!.save();

        // Circle bg
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, sz / 2, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255,255,255,0.03)';
        ctx!.fill();
        ctx!.strokeStyle = 'rgba(133, 241, 143, 0.1)';
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // Clip and draw bird
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, sz / 2 - 1, 0, Math.PI * 2);
        ctx!.clip();
        const drawSz = sz * 1.1;
        ctx!.drawImage(img, node.x - drawSz / 2, node.y - drawSz * 0.35, drawSz, drawSz);
        ctx!.restore();
      }
    }

    init();
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`relative ${className ?? ''}`}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
