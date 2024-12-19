import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Users, Settings, UserPlus } from 'lucide-react';
import { ListaAdmins } from './components/ListaAdmins';
import { CadastroAdmin } from './components/CadastroAdmin';
import { ConfiguracaoAsaas } from './components/ConfiguracaoAsaas';
import { Layout } from '../../components/Layout';
import { Button } from '../../components/Button';

export default function DashboardSuperAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPath = location.pathname === '/super-admin' || location.pathname === '/super-admin/';

  const navigation = (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
      <nav className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <button
          onClick={() => navigate('/super-admin')}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            isRootPath
              ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de]'
              : 'text-[#24292f] hover:bg-[#f6f8fa]'
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Administradores
        </button>
        <button
          onClick={() => navigate('/super-admin/configuracao')}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            location.pathname === '/super-admin/configuracao'
              ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de]'
              : 'text-[#24292f] hover:bg-[#f6f8fa]'
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </button>
      </nav>

      {isRootPath && (
        <Button
          onClick={() => navigate('/super-admin/admins/novo')}
          className="hidden sm:inline-flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Administrador
        </Button>
      )}
    </div>
  );

  return (
    <Layout title="Gestão FireFly" navigation={navigation}>
      <Routes>
        <Route path="/" element={<ListaAdmins />} />
        <Route path="/admins/novo" element={<CadastroAdmin />} />
        <Route path="/admins/:id" element={<CadastroAdmin />} />
        <Route path="/configuracao" element={<ConfiguracaoAsaas />} />
      </Routes>

      {isRootPath && (
        <Button
          onClick={() => navigate('/super-admin/admins/novo')}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg sm:hidden flex items-center justify-center"
        >
          <UserPlus className="w-6 h-6" />
        </Button>
      )}
    </Layout>
  );
}
