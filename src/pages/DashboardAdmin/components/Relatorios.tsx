import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { useAuthStore } from '../../../store/authStore';
import { listarDocumentos } from '../services/documentoService';
import { Documento } from '../../../types';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function Relatorios() {
  const usuario = useAuthStore((state) => state.usuario);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    const carregarDocumentos = async () => {
      if (usuario?.id) {
        try {
          const docs = await listarDocumentos(usuario.id);
          setDocumentos(docs);
        } catch (error) {
          console.error('Erro ao carregar documentos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    carregarDocumentos();
  }, [usuario]);

  const filtrarDocumentos = () => {
    return documentos.filter(doc => {
      const dataCriacao = new Date(doc.dataCriacao);
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);
      return dataCriacao >= inicio && dataCriacao <= fim;
    });
  };

  const exportarCSV = () => {
    const documentosFiltrados = filtrarDocumentos();
    if (documentosFiltrados.length === 0) {
      alert('Sem documentos para exportar');
      return;
    }

    const csvContent = [
      ['Nome', 'CPF/CNPJ', 'Data', 'Status', 'Observações', 'Link Comprovante', 'Link dos Documentos'],
      ...documentosFiltrados.map(doc => [
        doc.nome,
        doc.cpfCnpj,
        new Date(doc.dataCriacao).toLocaleDateString('pt-BR'),
        doc.status,
        doc.observacoes || '',
        doc.comprovantePagamento || '',
        doc.arquivos.join('""') || ''
      ])
    ]
    .map(e => e.join(','))
    .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'documentos_relatorio.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2da44e]"></div>
      </div>
    );
  }

  const documentosFiltrados = filtrarDocumentos();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'aguardando':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'finalizado':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Relatórios</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="border rounded-md p-2 flex-1"
        />
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="border rounded-md p-2 flex-1"
        />
        <Button onClick={exportarCSV} className="bg-blue-500 text-white rounded-md px-4 py-2">
          Exportar CSV
        </Button>
      </div>
      <Card>
        <h3 className="text-lg font-medium mb-4">Total de Documentos: {documentosFiltrados.length}</h3>
        {documentosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum documento encontrado para o filtro aplicado.</p>
        ) : (
          <ul className="space-y-2">
            {documentosFiltrados.map((doc) => (
              <li key={doc.id} className="border-b py-2 flex items-center justify-between">
                <div>
                  <span className="font-medium">{doc.nome}</span>
                  <p className="text-xs text-gray-600">CPF/CNPJ: {doc.cpfCnpj}</p>
                </div>
                <span className="flex items-center">
                  {getStatusIcon(doc.status)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
