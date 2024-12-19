import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';
import { Usuario } from '../../../types';
import { Card } from '../../../components/Card';

interface EstatisticasVendedoresProps {
  vendedores: Usuario[];
}

export function EstatisticasVendedores({ vendedores }: EstatisticasVendedoresProps) {
  const stats = {
    total: vendedores.length,
    ativos: vendedores.filter(v => v.ativo).length,
    inativos: vendedores.filter(v => !v.ativo).length
  };

  const cards = [
    {
      titulo: 'Total de Vendedores',
      valor: stats.total,
      icon: Users,
      cor: 'bg-blue-500'
    },
    {
      titulo: 'Vendedores Ativos',
      valor: stats.ativos,
      icon: UserCheck,
      cor: 'bg-green-500'
    },
    {
      titulo: 'Vendedores Inativos',
      valor: stats.inativos,
      icon: UserX,
      cor: 'bg-red-500'
    }
  ];

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Vendedores</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.titulo}</p>
                <p className="text-2xl font-semibold mt-2">{card.valor}</p>
              </div>
              <div className={`p-3 rounded-full ${card.cor}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
