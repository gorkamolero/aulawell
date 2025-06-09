'use client';

import { useEffect } from 'react';

const CRITICAL_IMAGES = [
  '/images/tutor-teaching.jpg',
  '/images/aulawell-logo.png',
];

const CRITICAL_FONTS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
];

export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical images
    CRITICAL_IMAGES.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    CRITICAL_FONTS.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove preload links when component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach((link) => {
        if (CRITICAL_IMAGES.includes(link.getAttribute('href') || '') ||
            CRITICAL_FONTS.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}

// Hook for programmatic resource preloading
export function usePreloadResource(resource: string, type: 'image' | 'font' | 'script') {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = type === 'image' ? 'image' : type === 'font' ? 'font' : 'script';
    link.href = resource;
    if (type === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [resource, type]);
}