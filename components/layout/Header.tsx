import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
        isScrolled ? 'bg-background/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            IPTV
          </Link>

          <div className="flex items-center gap-6">
            <NavLink href="/" label="Watch Now" isActive={pathname === '/'} />
            <NavLink href="/store" label="Store" isActive={pathname === '/store'} />
            <NavLink href="/sports" label="Sports" isActive={pathname === '/sports'} />
            <NavLink href="/library" label="Library" isActive={pathname === '/library'} />
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium transition-colors hover:text-white ${
        isActive ? 'text-white' : 'text-zinc-400'
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeNavLink"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}