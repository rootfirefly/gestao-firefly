import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ListaAdmins } from './components/ListaAdmins';
import { CadastroAdmin } from './components/CadastroAdmin';
import { Layout } from '../../components/Layout';
import { useAuthStore } from '../../store/authStore';

export default function DashboardSuperAdmin() {
  const navigate = useNavigate();
  const usuario = useAuthStore((state) => state.usuario);

  const navigation = (
    <div className="hidden sm:flex sm:space-x-8">
      <button
        onClick={() => navigate('/super-admin/admins/novo')}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Novo Administrador
      </button>
    </div>
  );

  return (
    <Layout title="Painel Super Admin" navigation={navigation}>
      <Routes>
        <Route path="/" element={<ListaAdmins />} />
        <Route path="/admins" element={<ListaAdmins />} />
        <Route path="/admins/novo" element={<CadastroAdmin />} />
        <Route path="/admins/:id" element={<CadastroAdmin />} />
      </Routes>
    </Layout>
  );
}