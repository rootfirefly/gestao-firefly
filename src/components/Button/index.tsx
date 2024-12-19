import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({
  loading,
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#2da44e] text-white hover:bg-[#2c974b] focus:ring-[#2da44e] border border-[#2da44e]',
    secondary: 'bg-[#f6f8fa] text-[#24292f] hover:bg-[#f3f4f6] focus:ring-[#d0d7de] border border-[#d0d7de]',
    danger: 'bg-[#d1242f] text-white hover:bg-[#bf222b] focus:ring-[#d1242f] border border-[#d1242f]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
