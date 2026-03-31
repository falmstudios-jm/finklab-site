'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const hasTyped = name.length > 0 || email.length > 0 || message.length > 0;

  useEffect(() => {
    if (status === 'sent') {
      requestAnimationFrame(() => setShowToast(true));
      const timer = setTimeout(() => dismissToast(), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  function dismissToast() {
    setShowToast(false);
    setTimeout(() => setStatus('idle'), 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website, // honeypot
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  const inputBase = (field: string) =>
    `w-full h-[56px] px-[20px] rounded-[40px] border-2 bg-transparent font-[family-name:var(--font-rubik)] text-[17px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none transition-colors ${
      focusedField === field
        ? 'border-[#00D4FF]'
        : 'border-[rgba(255,255,255,0.1)]'
    }`;

  const toastElement = (
    <div
      className={`fixed top-4 left-4 right-4 z-[9999] flex justify-center transition-all duration-300 ease-out ${
        showToast
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex h-auto min-h-[56px] items-center gap-[12px] bg-[#4CAF50] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] pl-[20px] pr-[12px] py-3 shadow-lg max-w-[650px] w-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-[family-name:var(--font-rubik)] text-[15px] font-normal text-white leading-snug flex-1">
          Thank you! We&apos;ll get back to you shortly.
        </span>
        <div className="h-8 w-px bg-[rgba(255,255,255,0.15)] mx-1" />
        <button type="button" onClick={dismissToast} className="shrink-0 cursor-pointer" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative py-[120px] md:py-[160px]">
      {typeof window !== 'undefined' && createPortal(toastElement, document.body)}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-[64px] lg:gap-[80px]">
          {/* Left — text */}
          <div className="flex flex-col gap-[20px] lg:max-w-[400px]">
            <span className="font-[family-name:var(--font-rubik)] text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)]">
              Contact
            </span>
            <h2 className="font-[family-name:var(--font-zain)] font-bold text-[36px] md:text-[56px] leading-[1em] tracking-[-0.02em] text-white">
              Let&apos;s work
              <br />
              <span className="gradient-text">together.</span>
            </h2>
            <p className="font-[family-name:var(--font-rubik)] text-[17px] leading-[1.6] text-[rgba(255,255,255,0.45)]">
              Whether you&apos;re a research institution, conservation organization, or technology partner — we&apos;d love to hear from you.
            </p>

            <div className="flex flex-col gap-[8px] pt-[16px]">
              <div className="flex flex-col gap-[4px]">
                <span className="font-[family-name:var(--font-rubik)] text-[12px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.25)]">General inquiries</span>
                <a href="mailto:info@finklab.eu" className="font-[family-name:var(--font-rubik)] text-[15px] text-[#85F18F] hover:text-white transition-colors">
                  info@finklab.eu
                </a>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="font-[family-name:var(--font-rubik)] text-[12px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.25)]">Press</span>
                <a href="mailto:press@finklab.eu" className="font-[family-name:var(--font-rubik)] text-[15px] text-[#85F18F] hover:text-white transition-colors">
                  press@finklab.eu
                </a>
              </div>
              <div className="flex gap-[16px] pt-[8px]">
                <a href="https://www.linkedin.com/company/finklab" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-rubik)] text-[14px] text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/finkcommunity/" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-rubik)] text-[14px] text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex-1 max-w-[520px]">
            <form onSubmit={handleSubmit} className="glass-card rounded-[32px] p-[32px] md:p-[40px] flex flex-col gap-[16px]">
              {/* Honeypot — invisible to humans, catches bots */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                className={inputBase('name')}
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Email address"
                className={inputBase('email')}
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your message"
                rows={4}
                className={`w-full px-[20px] py-[16px] rounded-[24px] border-2 bg-transparent font-[family-name:var(--font-rubik)] text-[17px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none transition-colors resize-none ${
                  focusedField === 'message'
                    ? 'border-[#00D4FF]'
                    : 'border-[rgba(255,255,255,0.1)]'
                }`}
                required
              />

              {/* GDPR consent — slides in after first keystroke */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  hasTyped ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="font-[family-name:var(--font-rubik)] text-[12px] leading-[16px] text-[rgba(255,255,255,0.3)] px-[4px]">
                  By submitting you agree to our{' '}
                  <button
                    type="button"
                    className="underline hover:text-[rgba(255,255,255,0.5)] transition-colors"
                    onClick={() => {
                      const btn = document.querySelector('[data-legal="privacy"]') as HTMLButtonElement;
                      if (btn) btn.click();
                    }}
                  >
                    Privacy Policy
                  </button>
                  . Your message will only be used to respond to your inquiry.
                </p>
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !email.trim() || !message.trim() || status === 'sending'}
                className="w-full h-[56px] rounded-[16px] bg-[#85F18F] font-[family-name:var(--font-rubik)] font-medium text-[17px] text-[#101D2F] hover:bg-[#6de678] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'sending' ? (
                  <span className="inline-flex items-center gap-[8px]">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                    </svg>
                    Sending...
                  </span>
                ) : status === 'error' ? (
                  'Something went wrong. Try again.'
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
