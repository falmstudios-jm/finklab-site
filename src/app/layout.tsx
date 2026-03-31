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
  title: 'finklab — The living map of the bird world',
  description:
    'finklab makes birdwatching visible, social, and modern. We build the platform where individual observations become a living, usable map — for birders, communities, and conservation science. 894 species. Trust-scored data. Research-grade.',
  metadataBase: new URL('https://finklab.eu'),
  alternates: {
    canonical: 'https://finklab.eu',
  },
  openGraph: {
    title: 'finklab — The living map of the bird world',
    description:
      'Making birdwatching visible, social, and modern. Individual observations become a living map — for birders, communities, and science.',
    url: 'https://finklab.eu',
    siteName: 'finklab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'finklab — The living map of the bird world',
    description:
      'Making birdwatching visible, social, and modern. Individual observations become a living map — for birders, communities, and science.',
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
    'biodiversity data', 'citizen science', 'bird observation platform',
    'conservation technology', 'research-grade data', 'birdwatching app',
    'finklab', 'Helgoland', 'species detection', 'trust-scored observations',
    'live bird map', 'ornithology', 'Vogelbeobachtung', 'bird data API',
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
                'Data infrastructure for biodiversity. Turning citizen bird observations into research-grade datasets.',
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
