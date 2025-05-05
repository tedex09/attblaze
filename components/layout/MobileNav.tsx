import Link from 'next/link';
import { Home, Film, Tv, Trophy } from 'lucide-react';

export function MobileNav() {
  return (
    <nav className="mobile-nav py-2">
      <div className="container mx-auto px-4">
        <ul className="flex justify-around items-center">
          <NavItem href="/" icon={<Home />} label="Home" />
          <NavItem href="/movies" icon={<Film />} label="Movies" />
          <NavItem href="/series" icon={<Tv />} label="Series" />
          <NavItem href="/sports" icon={<Trophy />} label="Sports" />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-col items-center p-2 touch-target focus-premium"
        aria-label={label}
      >
        <span className="w-6 h-6 text-text-secondary">{icon}</span>
        <span className="text-xs mt-1 text-text-secondary">{label}</span>
      </Link>
    </li>
  );
}