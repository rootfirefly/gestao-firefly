import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FileText, LogOut, LayoutDashboard } from 'lucide-react';
import { ListaDocumentos } from './components/ListaDocumentos';
import { CadastroVendedor } from './components/CadastroVendedor';
import { ListaVendedores } from './components/ListaVendedores';
import { Dashboard } from './components/Dashboard';
import { Layout } from '../../components/Layout';
import { listarDocumentos } from './services/documentoService';
import { listarVendedores } from './services/vendedorService';
import { Documento, Usuario } from '../../types';
import { useAuthStore } from '../../store/authStore';

export default function DashboardAdmin() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [vendedores, setVendedores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCadastroVendedor, setShowCadastroVendedor] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = useAuthStore((state) => state.usuario);

  useEffect(() => {
    if (usuario?.id) {
      carregarDados();
    }
  }, [usuario?.id]);

  async function carregarDados() {
    try {
      const [docs, vends] = await Promise.all([
        listarDocumentos(usuario!.id),
        listarVendedores(usuario!.id)
      ]);
      setDocumentos(docs);
      setVendedores(vends);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  const navigation = (
    <div className="hidden sm:flex sm:space-x-8">
      <Link
        to="/admin"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          location.pathname === '/admin'
            ? 'border-blue-500 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </Link>
      <Link
        to="/admin/documentos"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          location.pathname === '/admin/documentos'
            ? 'border-blue-500 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        <FileText className="w-4 h-4 mr-2" />
        Documentos
      </Link>
      <Link
        to="/admin/vendedores"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          location.pathname === '/admin/vendedores'
            ? 'border-blue-500 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        <Users className="w-4 h-4 mr-2" />
        Vendedores
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
    <Layout title="Painel do Administrador" navigation={navigation}>
      <Routes>
        <Route
          path="/"
          element={<Dashboard documentos={documentos} vendedores={vendedores} />}
        />
        <Route
          path="/documentos"
          element={
            <ListaDocumentos
              documentos={documentos}
              onChangeStatus={async (documentoId, novoStatus) => {
                // Implementar a lógica de mudança de status
                await carregarDados();
              }}
            />
          }
        />
        <Route
          path="/vendedores"
          element={
            <>
              {showCadastroVendedor ? (
                <CadastroVendedor
                  onSuccess={() => {
                    setShowCadastroVendedor(false);
                    carregarDados();
                  }}
                  onCancel={() => setShowCadastroVendedor(false)}
                />
              ) : (
                <ListaVendedores
                  vendedores={vendedores}
                  onAddVendedor={() => setShowCadastroVendedor(true)}
                  onVendedoresChange={carregarDados}
                />
              )}
            </>
          }
        />
      </Routes>
    </Layout>
  );
}