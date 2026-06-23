import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ClientEnhancements } from '@/components/layout/ClientEnhancements';
import { JsonLd, siteGraphJsonLd } from '@/components/seo/JsonLd';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const BASE_URL = 'https://handwerksingles.de/magazin';

export const metadata: Metadata = {
  title: {
    default: 'Partnersuche im Handwerk ❤️',
    template: '%s ❤️',
  },
  description:
    'Magazin für Elektriker, Dachdecker, Tischler und Handwerker-Singles. Partnersuche-Guides, Erfolgsgeschichten und Tipps für Dating trotz Montage und Frühschicht.',
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': `${BASE_URL}/rss.xml`,
    },
  },
  openGraph: {
    title: 'Partnersuche im Handwerk ❤️',
    description: 'Magazin für Elektriker, Dachdecker, Tischler und Handwerker-Singles. Partnersuche-Guides, Erfolgsgeschichten und Dating-Tipps trotz Montage.',
    url: BASE_URL,
    type: 'website',
    siteName: 'Handwerksingles Magazin',
    locale: 'de_DE',
    images: [{ url: `${BASE_URL}/images/hero-startseite.webp`, width: 1920, height: 1080, alt: 'Handwerksingles — Partnersuche für Elektriker, Dachdecker, Tischler und Handwerker-Singles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partnersuche im Handwerk ❤️',
    description: 'Magazin für Handwerker-Singles: Elektriker, Dachdecker, Tischler, Zimmermann und mehr. Partnersuche-Guides und Dating-Tipps für den Handwerksalltag.',
    images: [`${BASE_URL}/images/hero-startseite.webp`],
  },
  verification: {
    google: ['sBM54LsgZvWu9O8S8sMGQ4cGZqqMCyVWuxg7rBSyVos', '0rBBQts6iJpxHaZMv5zje4gmnsLJE-tPhQxBGNMLUDY'],
  },
  // Icons unter /magazin/images/icons/ — ICONY-Proxy whitelistet /images/* (top-level
  // /magazin/icon.png oder /magazin/favicon.ico würden vom Proxy mit 404 geblockt).
  // src/app/favicon.ico bleibt für lokale dev/SDK-Tools als Fallback liegen.
  icons: {
    icon: [
      { url: '/magazin/logos/jobsingles-icon-512.webp', type: 'image/webp', sizes: '512x512' },
    ],
    shortcut: '/magazin/logos/jobsingles-icon-512.webp',
    apple: '/magazin/logos/jobsingles-icon-512.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-DE" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={siteGraphJsonLd()} />
        <ThemeProvider theme="light">
          <Header />
          <main id="main-content" className="flex-1 pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <ClientEnhancements />
        </ThemeProvider>
      </body>
    </html>
  );
}
