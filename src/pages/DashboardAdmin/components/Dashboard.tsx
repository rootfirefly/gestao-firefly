import React from 'react';
import { Estatisticas } from './Estatisticas';
import { EstatisticasVendedores } from './EstatisticasVendedores';
import { EstatisticasPorVendedor } from './EstatisticasPorVendedor';
import { Documento, Usuario } from '../../../types';

interface DashboardProps {
  documentos: Documento[];
  vendedores: Usuario[];
}

export function Dashboard({ documentos, vendedores }: DashboardProps) {
  return (
    <div className="space-y-6">
      <Estatisticas documentos={documentos} />
      <EstatisticasVendedores vendedores={vendedores} />
      <EstatisticasPorVendedor documentos={documentos} vendedores={vendedores} />
    </div>
  );
}
