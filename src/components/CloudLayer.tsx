'use client';

import Image from 'next/image';

interface CloudConfig {
  src: string;
  width: number;
  height: number;
  top: string;
  duration: string;
  delay: string;
  opacity: number;
  mobileHidden?: boolean;
}

const clouds: CloudConfig[] = [
  { src: '/images/clouds/cloud-1.png', width: 600, height: 120, top: '2%', duration: '35s', delay: '0s', opacity: 0.06 },
  { src: '/images/clouds/cloud-2.png', width: 500, height: 100, top: '10%', duration: '45s', delay: '-15s', opacity: 0.05 },
  { src: '/images/clouds/cloud-3.png', width: 650, height: 130, top: '22%', duration: '40s', delay: '-8s', opacity: 0.04, mobileHidden: true },
  { src: '/images/clouds/cloud-4.png', width: 450, height: 90, top: '38%', duration: '50s', delay: '-25s', opacity: 0.05, mobileHidden: true },
  { src: '/images/clouds/cloud-5.png', width: 550, height: 110, top: '52%', duration: '38s', delay: '-30s', opacity: 0.04 },
  { src: '/images/clouds/cloud-6.png', width: 500, height: 100, top: '65%', duration: '42s', delay: '-12s', opacity: 0.03, mobileHidden: true },
  { src: '/images/clouds/cloud-7.png', width: 620, height: 124, top: '78%', duration: '36s', delay: '-20s', opacity: 0.05 },
  { src: '/images/clouds/cloud-8.png', width: 480, height: 96, top: '88%', duration: '48s', delay: '-35s', opacity: 0.04, mobileHidden: true },
  { src: '/images/clouds/cloud-9.png', width: 560, height: 112, top: '95%', duration: '44s', delay: '-18s', opacity: 0.05 },
];

export default function CloudLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className={`absolute ${cloud.mobileHidden ? 'hidden md:block' : ''}`}
          style={{
            top: cloud.top,
            left: 0,
            opacity: cloud.opacity,
            animation: `cloud-drift ${cloud.duration} linear infinite`,
            animationDelay: cloud.delay,
            filter: 'brightness(0.4) grayscale(0.6)',
          }}
        >
          <Image
            src={cloud.src}
            alt=""
            width={cloud.width}
            height={cloud.height}
            className="select-none"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}
