"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Film, Tv, Menu, X, FolderRoot as Football } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <header className="bg-black bg-opacity-80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-red-600 font-bold text-2xl">IPTV</span>
        </Link>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavItem href="/" icon={<Home size={18} />} label="Home" />
          <NavItem href="/movies" icon={<Film size={18} />} label="Movies" />
          <NavItem href="/series" icon={<Tv size={18} />} label="Series" />
          <NavItem href="/games" icon={<Football size={18} />} label="Football" />
        </nav>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden pt-20"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col items-center space-y-8 p-8">
              <NavItem 
                href="/" 
                icon={<Home size={24} />} 
                label="Home" 
                onClick={() => setIsOpen(false)}
                mobile
              />
              <NavItem 
                href="/movies" 
                icon={<Film size={24} />} 
                label="Movies" 
                onClick={() => setIsOpen(false)}
                mobile
              />
              <NavItem 
                href="/series" 
                icon={<Tv size={24} />} 
                label="Series" 
                onClick={() => setIsOpen(false)}
                mobile
              />
              <NavItem 
                href="/games" 
                icon={<Football size={24} />} 
                label="Football" 
                onClick={() => setIsOpen(false)}
                mobile
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}

function NavItem({ href, icon, label, onClick, mobile }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className={`flex items-center ${mobile ? 'text-2xl' : 'text-sm'} text-gray-300 hover:text-white transition-colors`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}