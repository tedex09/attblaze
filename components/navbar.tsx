"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSoccerBallFill } from "react-icons/pi";

const MENU_ITEMS = [
  { label: "Todos", href: "/" },
  { label: "Filmes",       href: "/filmes"  },
  { label: "Séries",     href: "/series"     },
  { label: "Canais",    href: "/canais"    },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <nav className="bg-black/60 backdrop-blur-md rounded-3xl px-2 py-1 inline-flex items-center space-x-4">
        {MENU_ITEMS.map((item) => {
          const isActive = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative
                px-4 py-2
                text-md tracking-tight
                font-bold 
                transition-colors
                ${isActive
                  ? "z-20 bg-white text-black rounded-3xl shadow-lg"
                  : "text-white/75 hover:text-white"}
              `}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Search icon stays inside the same pill */}
        <button
          aria-label="Esportes"
          className="ml-2 text-white/75 hover:text-white p-1"
        >
          <PiSoccerBallFill size={16} />
        </button>
      </nav>
    </header>
  );
}
