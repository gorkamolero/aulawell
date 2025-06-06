'use client';

import { useScroll, motion } from 'framer-motion';

export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-1 bg-gold z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}