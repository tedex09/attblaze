import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from "next/font/google";
import { Providers } from './providers';
import { MobileNav } from '@/components/layout/MobileNav';
import Navbar from '@/components/navbar';
import Logo from "@/components/ui/logo";
import { ShapeBG } from '@/components/ui/shape-bg';

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'HUB',
  description: 'Portal de atualizações de conteudos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="bg-tvplus font-sans text-text-primary antialiased">
        <Logo />
        <Navbar />
        <ShapeBG />  
        
        <Providers>{children}</Providers>
        <div className="w-screen flex justify-center"><MobileNav /></div>
      </body>
    </html>
  );
}