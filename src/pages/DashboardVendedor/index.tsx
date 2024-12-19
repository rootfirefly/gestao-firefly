import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText } from 'lucide-react';
import { ListaDocumentos } from './components/ListaDocumentos';
import { FormularioDocumento } from './components/FormularioDocumento';
import { VisualizarDocumento } from './components/VisualizarDocumento';
import { EditarDocumento } from './components/EditarDocumento';
import { Estatisticas } from './components/Estatisticas';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useDocumentos } from './hooks/useDocumentos';

export default function DashboardVendedor() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documentos, loading, recarregar } = useDocumentos();

  const isRootPath = location.pathname === '/vendedor' || location.pathname === '/vendedor/';
  const isDocumentosRoute = location.pathname === '/vendedor/documentos';

  const handleDocumentoAdicionado = async () => {
    await recarregar();
    setIsModalOpen(false);
  };

  const navigation = (
    <nav className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
      <Link
        to="/vendedor"
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isRootPath
            ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de]'
            : 'text-[#24292f] hover:bg-[#f6f8fa]'
        }`}
      >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </Link>
      <Link
        to="/vendedor/documentos"
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          location.pathname.includes('/documentos')
            ? 'bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de]'
            : 'text-[#24292f] hover:bg-[#f6f8fa]'
        }`}
      >
        <FileText className="w-4 h-4 mr-2" />
        Documentos
      </Link>
    </nav>
  );

  if (loading) {
    return (
      <Layout title="Gestão FireFly" navigation={navigation}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2da44e]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Gestão FireFly" navigation={navigation}>
      <div className="px-4 sm:px-0">
        <Routes>
          <Route path="/" element={<Estatisticas documentos={documentos} />} />
          <Route
            path="/documentos"
            element={
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-[#24292f]">
                    Meus Documentos
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#2da44e] hover:bg-[#2c974b]"
                  >
                    Novo Documento
                  </button>
                </div>
                <ListaDocumentos documentos={documentos} onUpdate={recarregar} />
              </div>
            }
          />
          <Route
            path="/documentos/:id"
            element={<EditarDocumento onSuccess={recarregar} />}
          />
          <Route
            path="/documentos/:id/visualizar"
            element={<VisualizarDocumento onUpdate={recarregar} />}
          />
        </Routes>

        {(isRootPath || isDocumentosRoute) && (
          <FloatingActionButton onClick={() => setIsModalOpen(true)} />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Novo Documento"
        >
          <FormularioDocumento onSuccess={handleDocumentoAdicionado} />
        </Modal>
      </div>
    </Layout>
  );
}
