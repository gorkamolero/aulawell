'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyLoadWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyLoadWrapper({
  children,
  fallback = <div className="animate-pulse bg-gray-200 rounded" />,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
}: LazyLoadWrapperProps) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, hasIntersected]);

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? children : fallback}
    </div>
  );
}