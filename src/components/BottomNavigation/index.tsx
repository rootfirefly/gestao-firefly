import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Plus, LogOut } from 'lucide-react';

interface BottomNavigationProps {
  onLogout: () => void;
}

export function BottomNavigation({ onLogout }: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDocumentosRoute = location.pathname === '/vendedor/documentos';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        <button
          onClick={() => navigate('/vendedor/documentos')}
          className={`flex flex-col items-center justify-center flex-1 p-2 ${
            isDocumentosRoute ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs mt-1">Documentos</span>
        </button>

        {isDocumentosRoute && (
          <button
            onClick={() => navigate('/vendedor/documentos/novo')}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-105"
          >
            <Plus className="w-8 h-8" />
          </button>
        )}

        <button
          onClick={onLogout}
          className="flex flex-col items-center justify-center flex-1 p-2 text-gray-600"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs mt-1">Sair</span>
        </button>
      </div>
    </div>
  );
}
