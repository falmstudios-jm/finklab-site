import type { Metadata } from 'next';
import { Zain, Rubik } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const zain = Zain({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-zain',
  display: 'swap',
});

const rubik = Rubik({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'finklab — Data-driven biodiversity infrastructure',
  description:
    'finklab builds data infrastructure for biodiversity. Trust-scored observations, research-grade datasets, and the fink platform — from Helgoland, Germany.',
  metadataBase: new URL('https://finklab.eu'),
  alternates: {
    canonical: 'https://finklab.eu',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'finklab — Data-driven biodiversity infrastructure',
    description:
      'Trust-scored observations, research-grade datasets, and the fink platform — from Helgoland.',
    url: 'https://finklab.eu',
    siteName: 'finklab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'finklab — Data-driven biodiversity infrastructure',
    description:
      'Trust-scored observations, research-grade datasets, and the fink platform — from Helgoland.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'finklab GmbH', url: 'https://finklab.eu' }],
  creator: 'finklab GmbH',
  publisher: 'finklab GmbH',
  keywords: [
    'biodiversity data', 'data science', 'citizen science', 'bird observation',
    'conservation technology', 'research-grade data', 'data-driven',
    'finklab', 'fink', 'Helgoland', 'trust-scored observations',
    'ornithology', 'Vogelbeobachtung', 'bird data infrastructure',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zain.variable} ${rubik.variable} h-full antialiased`}>
      <head>
        {/* Plausible Analytics */}
        <Script
          async
          src="https://plausible.io/js/pa-LlsRd8XOVRREJru0OjhHk.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0F1A] text-white">
        {children}

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'finklab GmbH',
              url: 'https://finklab.eu',
              logo: 'https://finklab.eu/images/finklab_bright.png',
              description:
                'Data-driven biodiversity infrastructure. Trust-scored observations and research-grade datasets from Helgoland, Germany.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Helgoland',
                addressCountry: 'DE',
              },
              sameAs: [
                'https://www.linkedin.com/company/fink-the-birdwatching-community',
                'https://www.instagram.com/finkcommunity/',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
