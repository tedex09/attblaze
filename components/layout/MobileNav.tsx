'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Tv, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="mobile-nav py-2"
    >
      <div className="container mx-auto px-4">
        <ul className="flex justify-around items-center">
          <NavItem 
            href="/" 
            icon={<Home />} 
            label="Home" 
            isActive={pathname === '/'} 
          />
          <NavItem 
            href="/movies" 
            icon={<Film />} 
            label="Movies" 
            isActive={pathname === '/movies'} 
          />
          <NavItem 
            href="/series" 
            icon={<Tv />} 
            label="Series" 
            isActive={pathname === '/series'} 
          />
          <NavItem 
            href="/games" 
            icon={<Trophy />} 
            label="Sports" 
            isActive={pathname === '/games'} 
          />
        </ul>
      </div>
    </motion.nav>
  );
}

function NavItem({ 
  href, 
  icon, 
  label, 
  isActive 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`nav-link ${isActive ? 'active' : ''}`}
        aria-label={label}
      >
        <motion.span
          className="w-6 h-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.span>
        <span className="text-xs mt-1">{label}</span>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
          />
        )}
      </Link>
    </li>
  );
}