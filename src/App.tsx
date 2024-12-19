import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Documentacao from './pages/Documentacao';
import DashboardVendedor from './pages/DashboardVendedor';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardSuperAdmin from './pages/DashboardSuperAdmin';
import { RotaProtegida } from './components/RotaProtegida';
import { useAuthLoading } from './hooks/useAuthLoading';

function App() {
  const loading = useAuthLoading();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2da44e]"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/documentacao" element={<Documentacao />} />
        <Route
          path="/vendedor/*"
          element={
            <RotaProtegida tipo="vendedor">
              <DashboardVendedor />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RotaProtegida tipo="admin">
              <DashboardAdmin />
            </RotaProtegida>
          }
        />
        <Route
          path="/super-admin/*"
          element={
            <RotaProtegida tipo="super_admin">
              <DashboardSuperAdmin />
            </RotaProtegida>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
