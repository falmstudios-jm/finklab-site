'use client';

import { useEffect } from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: string;
}

export default function LegalModal({ isOpen, onClose, title, body }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ animation: 'fade-in 0.2s ease-out' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[20px]" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-[#0A0F1A] border border-[rgba(255,255,255,0.08)] w-full sm:max-w-[640px] sm:max-h-[80vh] max-h-[90dvh] rounded-t-[32px] sm:rounded-[32px] flex flex-col"
        style={{ animation: 'modal-in 0.25s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8 pb-4 shrink-0">
          <h2 className="font-[family-name:var(--font-zain)] text-[24px] sm:text-[28px] font-bold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 sm:px-10 pb-8 sm:pb-10" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="font-[family-name:var(--font-rubik)] text-[15px] leading-relaxed text-[rgba(255,255,255,0.6)] whitespace-pre-line">
            {body}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-in { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
