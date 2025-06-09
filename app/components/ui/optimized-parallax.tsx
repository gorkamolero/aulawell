'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface OptimizedParallaxProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  speed?: number;
  offset?: number;
}

export function OptimizedParallax({ 
  src, 
  alt, 
  priority = false,
  className = '',
  speed = -10,
  offset = 0
}: OptimizedParallaxProps) {
  const [translateY, setTranslateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const previousScrollRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (!containerRef.current) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * speed * 0.01;
      
      // Only update if scroll changed significantly (reduces repaints)
      if (Math.abs(scrolled - previousScrollRef.current) > 0.5) {
        setTranslateY(rate + offset);
        previousScrollRef.current = scrolled;
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestRef.current = window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial position
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [speed, offset]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`} style={{ position: 'relative' }}>
      <div 
        className="absolute w-[120%] h-[120%] -top-[5%] -left-[10%]"
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          willChange: 'transform',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
        />
      </div>
    </div>
  );
}