import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Documento } from '../../../types';
import { Card } from '../../../components/Card';

interface EstatisticasProps {
  documentos: Documento[];
}

export function Estatisticas({ documentos }: EstatisticasProps) {
  const hoje = new Date();
  const ultimos7Dias = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
  const ultimos15Dias = new Date(hoje.getTime() - 15 * 24 * 60 * 60 * 1000);
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const stats = {
    periodos: {
      ultimos7Dias: documentos.filter(doc => new Date(doc.dataCriacao) >= ultimos7Dias).length,
      ultimos15Dias: documentos.filter(doc => new Date(doc.dataCriacao) >= ultimos15Dias).length,
      mesAtual: documentos.filter(doc => new Date(doc.dataCriacao) >= inicioMes).length,
    },
    status: {
      em_andamento: documentos.filter(doc => doc.status === 'em_andamento').length,
      aguardando: documentos.filter(doc => doc.status === 'aguardando').length,
      finalizado: documentos.filter(doc => doc.status === 'finalizado').length
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Documentos por Período</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Últimos 7 dias</p>
                <p className="text-2xl font-semibold mt-2">{stats.periodos.ultimos7Dias}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Últimos 15 dias</p>
                <p className="text-2xl font-semibold mt-2">{stats.periodos.ultimos15Dias}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mês Atual</p>
                <p className="text-2xl font-semibold mt-2">{stats.periodos.mesAtual}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Documentos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-semibold mt-2">{stats.status.em_andamento}</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aguardando</p>
                <p className="text-2xl font-semibold mt-2">{stats.status.aguardando}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Finalizados</p>
                <p className="text-2xl font-semibold mt-2">{stats.status.finalizado}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
