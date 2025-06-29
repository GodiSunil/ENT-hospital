import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import PageProgress from '@/components/ui/PageProgress';
import BackToTop from '@/components/ui/BackToTop';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'ENT Excellence - Premier Ear, Nose & Throat Care',
  description: 'Leading ENT specialists providing comprehensive ear, nose, and throat care with state-of-the-art technology and compassionate medical expertise.',
  keywords: [
    'ENT specialist', 'ear nose throat doctor', 'otolaryngology', 'hearing aids', 
    'sinus treatment', 'voice therapy', 'pediatric ENT', 'tonsillectomy',
    'sleep apnea treatment', 'allergy testing', 'hearing test', 'ear infection'
  ],
  authors: [{ name: 'ENT Excellence Medical Center' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: 'index, follow',
  openGraph: {
    title: 'ENT Excellence - Premier Ear, Nose & Throat Care',
    description: 'Leading ENT specialists providing comprehensive ear, nose, and throat care.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ENT Excellence',
    url: 'https://ent-excellence.com',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'ENT Excellence - Premier Care',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENT Excellence - Premier Ear, Nose & Throat Care',
    description: 'Leading ENT specialists providing comprehensive ear, nose, and throat care.',
    images: ['/images/twitter-card.jpg'],
  },
  alternates: {
    canonical: 'https://ent-excellence.com',
  },
  metadataBase: new URL('https://ent-excellence.com'),
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={`https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased bg-background`}>
        <PageProgress />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <Toaster position="top-center" richColors />
        </div>
        {/* Performance optimizations */}
        <link
          rel="preload"
          href="/_next/static/media/Inter.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/Manrope.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}