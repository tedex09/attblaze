import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="focus-premium">
          <h1 className="text-2xl font-bold text-primary">PREMIUM</h1>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="touch-target md:hidden focus-premium"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/movies">Movies</NavLink>
          <NavLink href="/series">Series</NavLink>
          <NavLink href="/live">Live TV</NavLink>
          <NavLink href="/sports">Sports</NavLink>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-text-secondary hover:text-text-primary transition-colors focus-premium"
    >
      {children}
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-full left-0 right-0 bg-secondary/95 backdrop-blur-md p-4 flex flex-col space-y-4 md:hidden"
    >
      <NavLink href="/movies">Movies</NavLink>
      <NavLink href="/series">Series</NavLink>
      <NavLink href="/live">Live TV</NavLink>
      <NavLink href="/sports">Sports</NavLink>
    </motion.div>
  );
}