import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface RotaProtegidaProps {
  children: React.ReactNode;
  tipo: 'admin' | 'vendedor' | 'super_admin';
}

export function RotaProtegida({ children, tipo }: RotaProtegidaProps) {
  const { usuario } = useAuthStore();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.tipo !== tipo) {
    return <Navigate to={`/${usuario.tipo}`} replace />;
  }

  return <>{children}</>;
}
