'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiHomeAlt2, BiTv, BiMovie, BiFootball } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection'; // ajuste o caminho se necessário

const MENU_ITEMS = [
  { label: 'Todos', href: '/', icon: BiHomeAlt2 },
  { label: 'Filmes', href: '/movies', icon: BiMovie },
  { label: 'Séries', href: '/series', icon: BiMovie },
  { label: 'Canais', href: '/tv', icon: BiTv },
];

export function MobileNav() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();

  return (
    <AnimatePresence>
      <motion.nav
        key="mobile-nav"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: scrollDir === 'down' ? 100 : 0,
          opacity: scrollDir === 'down' ? 0 : 1,
        }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-2 py-1 shadow-2xl md:hidden"
      >
        <ul className="flex inline-flex justify-between items-center">
          {MENU_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={`
                    relative flex flex-col items-center justify-center px-4 py-2 text-xs transition-colors
                    ${isActive ? 'bg-white text-black rounded-2xl shadow-md font-bold' : 'text-white/75 hover:text-white font-semibold'}
                  `}
                >
                  <Icon size={18} />
                  <span className="mt-1">{label}</span>
                </Link>
              </li>
            );
          })}

          {/* Botão de esportes no mesmo estilo */}
          <li className="flex-1">
            <button
              aria-label="Esportes"
              className="flex flex-col items-center justify-center text-white/75 hover:text-white px-3 py-2 text-xs font-semibold"
            >
              <BiFootball size={18} className="" />
              <span className="mt-1">Esportes</span>
            </button>
          </li>
        </ul>
      </motion.nav>
    </AnimatePresence>
  );
}
