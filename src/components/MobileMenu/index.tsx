import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../Button';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function MobileMenu({ isOpen, onToggle, children }: MobileMenuProps) {
  return (
    <>
      <div className="sm:hidden">
        <Button
          variant="secondary"
          onClick={onToggle}
          className="p-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 sm:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Menu</h2>
              <Button
                variant="secondary"
                onClick={onToggle}
                className="p-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="px-4 py-6">
              {children}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
