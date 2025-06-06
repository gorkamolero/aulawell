'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  parallaxSpeed?: number;
}

export function ParallaxImage({ 
  src, 
  alt, 
  priority = false,
  className = '',
  parallaxSpeed = 0.5
}: ParallaxImageProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${offsetY * parallaxSpeed}px) scale(1.1)`,
          willChange: 'transform'
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}