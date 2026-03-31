'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Data', href: '#data' },
  { label: 'Products', href: '#fink' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,15,26,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="https://finklab.eu" className="flex items-center">
          <Image
            src="/images/finklab_bright.png"
            alt="finklab"
            width={320}
            height={90}
            className="h-[64px] w-auto"
            priority
          />
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-[32px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-[family-name:var(--font-rubik)] text-[15px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center h-[40px] px-[20px] rounded-[40px] bg-[#85F18F] font-[family-name:var(--font-rubik)] font-medium text-[14px] text-[#101D2F] hover:bg-[#6de678] transition-colors"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
