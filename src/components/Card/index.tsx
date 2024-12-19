import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-[#d0d7de] rounded-md shadow-sm p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}
