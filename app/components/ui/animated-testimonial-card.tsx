'use client';

import { Quote } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface AnimatedTestimonialCardProps {
  quote: string;
  author: string;
  context?: string;
  rating?: number;
  className?: string;
}

export function AnimatedTestimonialCard({
  quote,
  author,
  context,
  rating,
  className
}: AnimatedTestimonialCardProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* Card content */}
      <div className="relative bg-white rounded-lg shadow-md p-8 h-full flex flex-col">
        <div className="flex items-start mb-4">
          <Quote className="text-gold w-10 h-10 flex-shrink-0 mr-3" />
          {rating && (
            <div className="ml-auto flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg transition-all duration-300 ${
                    i < rating ? 'text-gold' : 'text-gray-300'
                  } group-hover:scale-110`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
        
        <blockquote className="text-gray-700 italic mb-6 flex-grow text-lg leading-relaxed">
          "{quote}"
        </blockquote>
        
        <div className="border-t border-gray-200 pt-4 mt-auto">
          <p className="font-semibold text-navy text-lg">{author}</p>
          {context && (
            <p className="text-sm text-gray-600 mt-1">{context}</p>
          )}
        </div>
      </div>
    </div>
  );
}