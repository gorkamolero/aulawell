'use client';

import { useScroll, motion } from 'framer-motion';

export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-1 bg-gold origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}