import React from 'react';
import { User } from 'lucide-react';
import { Documento, Usuario } from '../../../types';
import { Card } from '../../../components/Card';

interface EstatisticasPorVendedorProps {
  documentos: Documento[];
  vendedores: Usuario[];
}

export function EstatisticasPorVendedor({ documentos, vendedores }: EstatisticasPorVendedorProps) {
  const estatisticasPorVendedor = vendedores.map(vendedor => {
    const docsVendedor = documentos.filter(doc => doc.idVendedor === vendedor.id);
    
    return {
      vendedor,
      total: docsVendedor.length,
      emAndamento: docsVendedor.filter(doc => doc.status === 'em_andamento').length,
      aguardando: docsVendedor.filter(doc => doc.status === 'aguardando').length,
      finalizado: docsVendedor.filter(doc => doc.status === 'finalizado').length
    };
  }).sort((a, b) => b.total - a.total);

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Documentos por Vendedor</h3>
      <div className="space-y-4">
        {estatisticasPorVendedor.map(({ vendedor, total, emAndamento, aguardando, finalizado }) => (
          <div key={vendedor.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-full">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h4 className="ml-3 font-medium text-gray-900">{vendedor.nome}</h4>
              </div>
              <span className="text-sm font-medium text-gray-600">
                Total: {total}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-2 bg-white rounded-lg">
                <p className="text-sm text-yellow-600 font-medium">Em Andamento</p>
                <p className="text-lg font-semibold">{emAndamento}</p>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Aguardando</p>
                <p className="text-lg font-semibold">{aguardando}</p>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <p className="text-sm text-green-600 font-medium">Finalizados</p>
                <p className="text-lg font-semibold">{finalizado}</p>
              </div>
            </div>
          </div>
        ))}

        {estatisticasPorVendedor.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Nenhum vendedor com documentos registrados
          </p>
        )}
      </div>
    </Card>
  );
}
