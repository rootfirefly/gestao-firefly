import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { ListaDocumentos } from './components/ListaDocumentos';
import { FormularioDocumento } from './components/FormularioDocumento';
import { VisualizarDocumento } from './components/VisualizarDocumento';
import { Estatisticas } from './components/Estatisticas';
import { useAuthStore } from '../../store/authStore';
import { BottomNavigation } from '../../components/BottomNavigation';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { Layout } from '../../components/Layout';
import { useDocumentos } from './hooks/useDocumentos';

export default function DashboardVendedor() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const usuario = useAuthStore((state) => state.usuario);
  const { documentos, loading, recarregar } = useDocumentos();

  const handleLogout = () => {
    setUsuario(null);
    navigate('/login');
  };

  const isRootPath = location.pathname === '/vendedor' || location.pathname === '/vendedor/';
  const isDocumentosRoute = location.pathname === '/vendedor/documentos';

  const navigation = (
    <div className="hidden sm:flex sm:space-x-8">
      <Link
        to="/vendedor"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          isRootPath
            ? 'border-blue-500 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        Dashboard
      </Link>
      <Link
        to="/vendedor/documentos"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          location.pathname.includes('/vendedor/documentos')
            ? 'border-blue-500 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        <FileText className="w-4 h-4 mr-2" />
        Meus Documentos
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Layout title="Painel do Vendedor" navigation={navigation}>
      <Routes>
        <Route
          path="/"
          element={<Estatisticas documentos={documentos} />}
        />
        <Route
          path="documentos"
          element={
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Meus Documentos
                </h2>
                <button
                  onClick={() => navigate('/vendedor/documentos/novo')}
                  className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Novo Documento
                </button>
              </div>
              <ListaDocumentos />
            </div>
          }
        />
        <Route
          path="documentos/novo"
          element={<FormularioDocumento onSuccess={recarregar} />}
        />
        <Route
          path="documentos/:id"
          element={<FormularioDocumento onSuccess={recarregar} />}
        />
        <Route
          path="documentos/:id/visualizar"
          element={<VisualizarDocumento />}
        />
      </Routes>

      {isRootPath || isDocumentosRoute ? (
        <FloatingActionButton onClick={() => navigate('/vendedor/documentos/novo')} />
      ) : null}
      <BottomNavigation onLogout={handleLogout} />
    </Layout>
  );
}