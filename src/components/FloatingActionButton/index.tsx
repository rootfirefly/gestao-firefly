import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#2da44e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#2c974b] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2da44e] sm:hidden"
      aria-label="Adicionar documento"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
