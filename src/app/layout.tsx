import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import SplashScreen from '@/components/SplashScreen';
import ContentWrapper from '@/components/ContentWrapper';

export const metadata: Metadata = {
  title: 'Sweet Pharma Pharmacy | Premium Healthcare Services',
  description: 'Sweet Pharma Pharmacy - Your trusted healthcare partner. Quality medicines, professional service, and care you can count on.',
  keywords: 'pharmacy, healthcare, medicines, sweet pharma, medical services',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Sweet Pharma Pharmacy',
    description: 'Your trusted healthcare partner',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-nrt antialiased">
        <SplashScreen />
        <ContentWrapper>
          <ThemeProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </ContentWrapper>
      </body>
    </html>
  );
}
