'use client';

import { cn } from '@/app/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function ShimmerButton({ 
  children, 
  variant = 'primary',
  className,
  ...props 
}: ShimmerButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 rounded-md font-semibold transition-all duration-150 overflow-hidden group";
  
  const variants = {
    primary: "bg-gold text-navy hover:bg-gold/90",
    secondary: "border-2 border-white text-white hover:bg-white hover:text-navy"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -top-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:animate-shimmer" />
    </button>
  );
}