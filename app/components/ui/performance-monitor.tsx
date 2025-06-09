'use client';

import { useEffect } from 'react';

// Type definitions for Web Performance APIs
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const reportWebVitals = (metric: { name: string; value: number; id: string; rating: string }) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(metric);
      }
      
      // In production, you would send this to analytics
      // gtag('event', metric.name, {
      //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //   event_category: 'Web Vitals',
      //   event_label: metric.id,
      //   non_interaction: true,
      // });
    };

    // Monitor LCP (Largest Contentful Paint)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          reportWebVitals({
            name: 'LCP',
            value: entry.startTime,
            id: 'lcp',
            rating: entry.startTime > 4000 ? 'poor' : entry.startTime > 2500 ? 'needs-improvement' : 'good'
          });
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // LCP not supported
    }

    // Monitor FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'first-input') {
          const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
          reportWebVitals({
            name: 'FID',
            value: fid,
            id: 'fid',
            rating: fid > 300 ? 'poor' : fid > 100 ? 'needs-improvement' : 'good'
          });
        }
      }
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch {
      // FID not supported
    }

    // Monitor CLS (Cumulative Layout Shift)
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as LayoutShift).hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];

          if (
            !firstSessionEntry ||
            entry.startTime - lastSessionEntry.startTime < 1000 ||
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            clsEntries.push(entry);
            clsValue += (entry as LayoutShift).value;
          } else {
            clsEntries = [entry];
            clsValue = (entry as LayoutShift).value;
          }
        }
      }

      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        id: 'cls',
        rating: clsValue > 0.25 ? 'poor' : clsValue > 0.1 ? 'needs-improvement' : 'good'
      });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // CLS not supported
    }

    // Cleanup
    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null;
}