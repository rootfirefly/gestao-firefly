import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Dashboard } from './components/Dashboard';
import { ListaDocumentos } from './components/ListaDocumentos';
import { ListaVendedores } from './components/ListaVendedores';
import { CadastroVendedor } from './components/CadastroVendedor';
import { ConfiguracaoPerfil } from './components/ConfiguracaoPerfil';
import { Relatorios } from './components/Relatorios';
import { useAdminDashboard } from './hooks/useAdminDashboard';

export default function DashboardAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { documentos, vendedores, loading, recarregarDados } = useAdminDashboard();

  const navigation = (
    <nav className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
      <Link
        to="/admin"
        className={
          location.pathname === '/admin'
            ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
            : 'text-[#24292f] hover:bg-[#f6f8fa] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
        }
      >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </Link>
      <Link
        to="/admin/documentos"
        className={
          location.pathname.includes('/documentos')
            ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
            : 'text-[#24292f] hover:bg-[#f6f8fa] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
        }
      >
        <FileText className="w-4 h-4 mr-2" />
        Documentos
      </Link>
      <Link
        to="/admin/vendedores"
        className={
          location.pathname.includes('/vendedores')
            ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
            : 'text-[#24292f] hover:bg-[#f6f8fa] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
        }
      >
        <Users className="w-4 h-4 mr-2" />
        Vendedores
      </Link>
      <Link
        to="/admin/relatorios"
        className={
          location.pathname.includes('/relatorios')
            ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
            : 'text-[#24292f] hover:bg-[#f6f8fa] inline-flex items-center px-3 py-2 text-sm font-medium rounded-md'
        }
      >
        <FileText className="w-4 h-4 mr-2" />
        Relatórios
      </Link>
    </nav>
  );

  if (loading) {
    return (
      <Layout title="Painel do Administrador" navigation={navigation}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2da44e]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Painel do Administrador" navigation={navigation}>
      <Routes>
        <Route path="/" element={<Dashboard documentos={documentos} vendedores={vendedores} />} />
        <Route path="/documentos" element={<ListaDocumentos documentos={documentos} onChangeStatus={recarregarDados} />} />
        <Route path="/vendedores" element={<ListaVendedores vendedores={vendedores} onVendedoresChange={recarregarDados} />} />
        <Route path="/vendedores/novo" element={<CadastroVendedor onSuccess={recarregarDados} onCancel={() => navigate('/admin/vendedores')} />} />
        <Route path="/configuracao" element={<ConfiguracaoPerfil />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Layout>
  );
}
