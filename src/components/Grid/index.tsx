import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Grid({ children, cols = 3, className = '' }: GridProps) {
  const gridCols = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4'
  };

  return (
    <div className={`grid grid-cols-1 gap-4 px-4 sm:px-0 ${gridCols[cols]} ${className}`}>
      {children}
    </div>
  );
}
