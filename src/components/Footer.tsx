'use client';

import { useState } from 'react';
import Image from 'next/image';
import LegalModal from './LegalModal';

const LEGAL_CONTENT = {
  impressum: {
    title: 'Legal Notice (Impressum)',
    body: `Information according to § 5 TMG

finklab GmbH
Am Falm 302 A
27498 Helgoland
Germany

Commercial Register: HRB 19416 PI, Amtsgericht Pinneberg
VAT ID: DE458868378

Represented by the Managing Directors

Contact:
Email: info@finklab.eu

Shareholders:
falm Group GmbH (50%)
TeBM GmbH (50%)

Trademark Notice:
fink® is a registered trademark of falm Group GmbH in the European Union, licensed to finklab GmbH.

EU Dispute Resolution:
The European Commission provides a platform for online dispute resolution (OS):
https://ec.europa.eu/consumers/odr/

We are neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.

Liability for Content:
As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Para. 1 TMG. However, pursuant to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.

Liability for Links:
Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages.`,
  },
  privacy: {
    title: 'Privacy Policy',
    body: `1. Data Controller

The data controller within the meaning of the General Data Protection Regulation (GDPR) is:

finklab GmbH
Am Falm 302 A
27498 Helgoland, Germany
Email: info@finklab.eu

2. Data Processing Overview

We process personal data only when necessary to provide a functional website and our content and services. Processing of personal data occurs only with your consent, except where processing is permitted by law.

3. Hosting

This website is hosted by Vercel Inc. When you visit our site, Vercel may process connection data such as your IP address, browser type, and access times. This processing is based on our legitimate interest in providing a stable, secure website (Art. 6(1)(f) GDPR).

4. Contact Form

When you use our contact form, we collect your name, email address, and message content. This data is processed solely to respond to your inquiry (Art. 6(1)(b) GDPR). We delete your data once your inquiry has been fully resolved, unless we are legally required to retain it.

5. Web Analytics (Plausible)

We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies and does not collect personal data. Plausible is fully GDPR-compliant.

6. No Cookies

This website does not use cookies.

7. Your Rights

You have the right to:
- Request information about your stored personal data
- Request correction or deletion of your data
- Request restriction of processing
- Object to processing
- Data portability
- Lodge a complaint with a supervisory authority

To exercise these rights, please contact us at info@finklab.eu.

8. Changes to This Policy

We reserve the right to update this privacy policy to reflect changes in our data practices. The current version is always available on this page.`,
  },
  terms: {
    title: 'Terms of Use',
    body: `1. Scope

These Terms of Use govern the use of the finklab GmbH website (finklab.eu).

2. Service Description

finklab.eu is the corporate website of finklab GmbH, providing information about the company, its products, and services.

3. Intellectual Property

All content on this website, including text, graphics, logos, and software, is the property of finklab GmbH or its licensors. fink® is a registered trademark of falm Group GmbH in the European Union, licensed to finklab GmbH.

4. Limitation of Liability

finklab GmbH shall not be liable for damages arising from the use of this website, except in cases of intent or gross negligence.

5. External Links

This website may contain links to external websites. finklab GmbH has no influence over the content of linked pages and accepts no liability for them.

6. Applicable Law

These terms are governed by the laws of the Federal Republic of Germany.

7. Contact

finklab GmbH
Am Falm 302 A
27498 Helgoland, Germany
Email: info@finklab.eu`,
  },
};

export default function Footer() {
  const [openModal, setOpenModal] = useState<keyof typeof LEGAL_CONTENT | null>(null);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-[48px]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px] mb-[32px]">
            <div className="flex items-center gap-[16px]">
              <Image
                src="/images/finklab_bright.png"
                alt="finklab"
                width={140}
                height={48}
                className="h-[36px] w-auto"
              />
            </div>
            <div className="flex items-center gap-[24px]">
              <a href="https://www.finkapp.eu" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-rubik)] text-[14px] text-[rgba(255,255,255,0.35)] hover:text-white transition-colors">
                finkapp.eu
              </a>
              <a href="https://www.linkedin.com/company/finklab" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-rubik)] text-[14px] text-[rgba(255,255,255,0.35)] hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/finkcommunity/" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-rubik)] text-[14px] text-[rgba(255,255,255,0.35)] hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[12px]">
            <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.25)]">
              &copy; {year} finklab GmbH &middot; Helgoland, Germany
            </span>
            <div className="flex items-center gap-[20px]">
              <button
                data-legal="privacy"
                onClick={() => setOpenModal('privacy')}
                className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.25)] hover:text-white transition-colors underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setOpenModal('terms')}
                className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.25)] hover:text-white transition-colors underline cursor-pointer"
              >
                Terms of Use
              </button>
              <button
                onClick={() => setOpenModal('impressum')}
                className="font-[family-name:var(--font-rubik)] text-[13px] text-[rgba(255,255,255,0.25)] hover:text-white transition-colors underline cursor-pointer"
              >
                Impressum
              </button>
            </div>
          </div>

          <p className="font-[family-name:var(--font-rubik)] text-[11px] text-[rgba(255,255,255,0.12)] mt-[20px]">
            fink&reg; is a registered trademark of falm Group GmbH in the European Union, licensed to finklab GmbH.
          </p>
        </div>
      </footer>

      {openModal && (
        <LegalModal
          isOpen
          onClose={() => setOpenModal(null)}
          title={LEGAL_CONTENT[openModal].title}
          body={LEGAL_CONTENT[openModal].body}
        />
      )}
    </>
  );
}
