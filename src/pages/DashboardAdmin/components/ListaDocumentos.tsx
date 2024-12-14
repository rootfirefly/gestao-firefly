// src/pages/DashboardAdmin/components/ListaDocumentos.tsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { FileText, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Documento } from '../../../types';
import { atualizarStatusDocumento } from '../services/documentoService';

interface ListaDocumentosProps {
  documentos: (Documento & { nomeVendedor: string })[];
  onChangeStatus: (documentoId: string, novoStatus: Documento['status']) => void;
}

const statusMap = {
  em_andamento: { label: 'Em Andamento', color: 'yellow' },
  aguardando: { label: 'Aguardando', color: 'blue' },
  finalizado: { label: 'Finalizado', color: 'green' }
};

export function ListaDocumentos({ documentos, onChangeStatus }: ListaDocumentosProps) {
  const [documentoExpandido, setDocumentoExpandido] = useState<string | null>(null);

  const toggleDocumento = (documentoId: string) => {
    setDocumentoExpandido(documentoExpandido === documentoId ? null : documentoId);
  };

  const handleStatusChange = async (documentoId: string, novoStatus: Documento['status']) => {
    try {
      await atualizarStatusDocumento(documentoId, novoStatus);
      if (onChangeStatus) {
        onChangeStatus(documentoId, novoStatus);
      }
    } catch (error) {
      toast.error('Erro ao atualizar status do documento');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documentos.map((documento) => (
        <div key={documento.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{documento.nome}</h3>
            <Badge variant={statusMap[documento.status].color}>
              {statusMap[documento.status].label}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Vendedor:</span> {documento.nomeVendedor}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">CPF/CNPJ:</span> {documento.cpfCnpj}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Observações:</span> {documento.observacoes}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Data:</span>{' '}
              {new Date(documento.dataCriacao).toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="space-y-4">
            <select
              className="w-full p-2 border rounded-md"
              value={documento.status}
              onChange={(e) => handleStatusChange(documento.id, e.target.value as Documento['status'])}
            >
              <option value="em_andamento">Em Andamento</option>
              <option value="aguardando">Aguardando</option>
              <option value="finalizado">Finalizado</option>
            </select>

            <Button
              variant="secondary"
              onClick={() => toggleDocumento(documento.id)}
              className="w-full flex items-center justify-center"
            >
              {documentoExpandido === documento.id ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Ocultar Documentos
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Ver Documentos
                </>
              )}
            </Button>

            {documentoExpandido === documento.id && (
              <div className="mt-4 bg-gray-50 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Documentos do Cliente</h4>
                  <button
                    onClick={() => setDocumentoExpandido(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Comprovante de Pagamento
                    </p>
                    <a
                      href={documento.comprovantePagamento}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Baixar Comprovante
                    </a>
                  </div>

                  {documento.arquivos.length > 0 && (
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Documentos Adicionais
                      </p>
                      <ul className="space-y-2">
                        {documento.arquivos.map((url, index) => (
                          <li key={index}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Baixar Documento {index + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {documentos.length === 0 && (
        <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Nenhum documento cadastrado</p>
        </div>
      )}
    </div>
  );
}
