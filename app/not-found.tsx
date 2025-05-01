"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-xl mb-8">This page could not be found.</p>
        
        <Link href="/" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}