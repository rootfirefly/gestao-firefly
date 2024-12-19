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
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const stats = {
    total: documentos.length,
    ultimos7Dias: documentos.filter(doc => new Date(doc.dataCriacao) >= ultimos7Dias).length,
    mesAtual: documentos.filter(doc => new Date(doc.dataCriacao) >= inicioMes).length,
    porStatus: {
      em_andamento: documentos.filter(doc => doc.status === 'em_andamento').length,
      aguardando: documentos.filter(doc => doc.status === 'aguardando').length,
      finalizado: documentos.filter(doc => doc.status === 'finalizado').length
    }
  };

  const cards = [
    {
      titulo: 'Total de Documentos',
      valor: stats.total,
      icon: FileText,
      cor: 'bg-blue-500'
    },
    {
      titulo: 'Últimos 7 dias',
      valor: stats.ultimos7Dias,
      icon: Clock,
      cor: 'bg-purple-500'
    },
    {
      titulo: 'Mês Atual',
      valor: stats.mesAtual,
      icon: FileText,
      cor: 'bg-green-500'
    }
  ];

  const statusCards = [
    {
      titulo: 'Em Andamento',
      valor: stats.porStatus.em_andamento,
      icon: Clock,
      cor: 'bg-yellow-500'
    },
    {
      titulo: 'Aguardando',
      valor: stats.porStatus.aguardando,
      icon: AlertCircle,
      cor: 'bg-blue-500'
    },
    {
      titulo: 'Finalizados',
      valor: stats.porStatus.finalizado,
      icon: CheckCircle,
      cor: 'bg-green-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.titulo}</p>
                <p className="text-2xl font-semibold mt-2">{card.valor}</p>
              </div>
              <div className={`p-3 rounded-full ${card.cor}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Documentos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statusCards.map((card, index) => (
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
    </div>
  );
}
