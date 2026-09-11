import type { Metadata } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ContentProvider } from '@/lib/content-context';
import { LocaleProvider } from '@/lib/locale-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// IBM Plex Sans Arabic: a refined, professional Arabic typeface with true
// bold/medium weights, which reads more polished than a typical UI grotesk
// at display sizes — a better match for a premium bilingual portfolio.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

const siteUrl = 'https://kotaiba-alali.dev';
const description =
  'Kotaiba Alali — Full Stack Developer & Business Analyst bridging technology and business. 3+ years building reliable, scalable web products.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kotaiba Alali — Full Stack Developer & Business Analyst',
    template: '%s — Kotaiba Alali',
  },
  description,
  keywords: [
    'Kotaiba Alali',
    'Full Stack Developer',
    'Business Analyst',
    'Next.js Developer',
    'React Developer',
    'Web Developer Syria',
    'مطور برمجيات',
    'محلل أعمال',
  ],
  authors: [{ name: 'Kotaiba Alali' }],
  creator: 'Kotaiba Alali',
  openGraph: {
    title: 'Kotaiba Alali — Full Stack Developer & Business Analyst',
    description,
    url: siteUrl,
    siteName: 'Kotaiba Alali',
    locale: 'en_US',
    alternateLocale: 'ar_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kotaiba Alali — Full Stack Developer & Business Analyst',
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${plexArabic.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocaleProvider>
            <ContentProvider>{children}</ContentProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
