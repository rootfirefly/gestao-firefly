import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { useDocumento } from '../hooks/useDocumento';

const statusMap = {
  em_andamento: { label: 'Em Andamento', color: 'yellow' },
  aguardando: { label: 'Aguardando', color: 'blue' },
  finalizado: { label: 'Finalizado', color: 'green' }
};

export function VisualizarDocumento() {
  const navigate = useNavigate();
  const { documento, loading } = useDocumento();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!documento) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Documento não encontrado</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Visualizar Documento</h2>
          <Button
            variant="secondary"
            onClick={() => navigate('/vendedor/documentos')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{documento.nome}</h3>
              <p className="text-sm text-gray-600 mt-1">{documento.cpfCnpj}</p>
            </div>
            <Badge variant={statusMap[documento.status].color}>
              {statusMap[documento.status].label}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Observações</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {documento.observacoes || 'Nenhuma observação'}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Comprovante de Pagamento</h4>
              <a
                href={documento.comprovantePagamento}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Baixar Comprovante
              </a>
            </div>

            {documento.arquivos.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Documentos Adicionais</h4>
                <div className="space-y-2">
                  {documento.arquivos.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Documento {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500">
                Data de criação: {new Date(documento.dataCriacao).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-gray-500">
                Última atualização: {new Date(documento.dataAtualizacao).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
