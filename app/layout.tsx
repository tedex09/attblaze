import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from './providers';
import { MobileNav } from '@/components/layout/MobileNav';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Premium Streaming Platform',
  description: 'A premium streaming experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-background font-sans text-text-primary antialiased">
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pb-16 md:pb-0">
          <Providers>{children}</Providers>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}