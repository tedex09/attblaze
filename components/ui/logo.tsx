'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function Logo() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 50) {
      setHidden(true); // Rolando para baixo
    } else {
      setHidden(false); // Rolando para cima
    }
  });

  return (
    <motion.div
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? -20 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full flex justify-center md:justify-start items-center"
    >
      <Image
        src="/images/logo-hub.png"
        alt="HUB Logo"
        width={90}
        height={10}
        priority
        className="drop-shadow-md"
      />
    </motion.div>
  );
}
