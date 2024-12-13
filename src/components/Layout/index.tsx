import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '../Button';
import { MobileMenu } from '../MobileMenu';
import { useAuthStore } from '../../store/authStore';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  navigation: React.ReactNode;
}

export function Layout({ title, children, navigation }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const usuario = useAuthStore((state) => state.usuario);

  const handleLogout = () => {
    setUsuario(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 mt-4 sm:mt-0">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800 truncate">
                {title}
              </h1>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              {navigation}
              <div className="ml-4 flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden md:inline">
                  Olá, {usuario?.nome}
                </span>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </div>
            </div>

            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="space-y-4">
                {navigation}
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Olá, {usuario?.nome}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className="flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </MobileMenu>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-6">
        {children}
      </main>
    </div>
  );
}