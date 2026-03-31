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
  title: 'finklab — Data infrastructure for biodiversity',
  description:
    'finklab builds the data infrastructure that turns citizen bird observations into research-grade datasets. 894 species. Millions of data points. One platform.',
  metadataBase: new URL('https://finklab.eu'),
  openGraph: {
    title: 'finklab — Data infrastructure for biodiversity',
    description:
      'We turn biodiversity into data. Research-grade datasets from citizen science observations.',
    url: 'https://finklab.eu',
    siteName: 'finklab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'finklab — Data infrastructure for biodiversity',
    description:
      'We turn biodiversity into data. Research-grade datasets from citizen science observations.',
  },
  authors: [{ name: 'finklab GmbH' }],
  creator: 'finklab GmbH',
  publisher: 'finklab GmbH',
  keywords: [
    'biodiversity data',
    'citizen science',
    'bird data',
    'conservation technology',
    'research data',
    'species intelligence',
    'finklab',
    'ornithology data',
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
