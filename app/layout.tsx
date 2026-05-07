import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/core/CustomCursor';
import { AmbientParticles } from '@/components/core/AmbientParticles';
import { Nav } from '@/components/core/Nav';
import { Preloader } from '@/components/core/Preloader';
import { CommandPalette } from '@/components/core/CommandPalette';

const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vexora · Operational AI Infrastructure for the Modern Enterprise',
  description:
    'Vexora builds operational AI infrastructure capable of automating entire industries. 65 enterprise systems across 26 sectors and 6 continents.',
  metadataBase: new URL('https://vexora.uk'),
  openGraph: {
    title: 'Vexora · Operational AI',
    description:
      'Operational AI infrastructure for the modern enterprise. 65 systems across 26 sectors.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vexora · Operational AI',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#030305',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${fraunces.variable} ${geistMono.variable}`}>
      <body>
        <Preloader />
        <AmbientParticles />
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <CommandPalette />
      </body>
    </html>
  );
}
