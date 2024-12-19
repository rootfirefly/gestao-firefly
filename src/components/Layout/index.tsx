import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { MobileMenu } from '../MobileMenu';
import { Footer } from '../Footer';
import { obterPerfilAdmin } from '../../pages/DashboardAdmin/services/adminService';

interface LayoutProps {
  children: React.ReactNode;
  navigation?: React.ReactNode;
  title: string;
}

export function Layout({ children, navigation, title }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const usuario = useAuthStore((state) => state.usuario);
  const setUsuario = useAuthStore((state) => state.setUsuario);

  useEffect(() => {
    if (usuario?.tipo === 'admin' && usuario?.id) {
      carregarPerfilAdmin();
    }
  }, []);

  const carregarPerfilAdmin = async () => {
    try {
      const perfilAtualizado = await obterPerfilAdmin(usuario!.id);
      setUsuario(perfilAtualizado);
      if (perfilAtualizado.nomeOrganizacao) {
        document.title = perfilAtualizado.nomeOrganizacao;
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const handleLogout = () => {
    setUsuario(null);
    navigate('/login');
  };

  const handleConfigClick = () => {
    if (usuario?.tipo === 'admin') {
      navigate('/admin/configuracao');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex flex-col">
      <header className="bg-white border-b border-[#d0d7de] sticky top-0 z-40 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {usuario?.tipo === 'admin' && usuario?.logo ? (
                <>
                  <img
                    src={usuario.logo}
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                  <span className="text-xl font-semibold text-[#24292f]">
                    {usuario.nomeOrganizacao}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-[#24292f]">
                  {usuario?.nomeOrganizacao || title}
                </span>
              )}
            </div>

            <div className="hidden sm:block">
              {navigation}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/documentacao')}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                title="Documentação"
              >
                <BookOpen className="w-5 h-5" />
              </button>

              {usuario?.tipo === 'admin' && (
                <button
                  onClick={handleConfigClick}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}

              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {usuario?.avatar ? (
                    <img
                      src={usuario.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {usuario?.nome?.split(' ')[0]}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-[#24292f] hover:bg-[#f6f8fa] rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {navigation}
        </MobileMenu>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
