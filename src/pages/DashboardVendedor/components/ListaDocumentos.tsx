import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, FileText } from 'lucide-react';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Documento } from '../../../types';

interface ListaDocumentosProps {
  documentos: Documento[];
  onUpdate: () => Promise<void>;
}

const statusMap = {
  em_andamento: { label: 'Em Andamento', color: 'yellow' },
  aguardando: { label: 'Aguardando', color: 'blue' },
  finalizado: { label: 'Finalizado', color: 'green' }
};

export function ListaDocumentos({ documentos, onUpdate }: ListaDocumentosProps) {
  const navigate = useNavigate();

  const podeEditar = (status: Documento['status']) => {
    return status === 'em_andamento';
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documentos.map((documento) => (
        <Card key={documento.id}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{documento.nome}</h3>
            <Badge variant={statusMap[documento.status].color}>
              {statusMap[documento.status].label}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-4">
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

          <div className="space-y-2">
            {podeEditar(documento.status) ? (
              <Button
                variant="secondary"
                onClick={() => navigate(`/vendedor/documentos/${documento.id}`)}
                className="w-full flex items-center justify-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            ) : (
              <p className="text-sm text-gray-500 text-center italic">
                {documento.status === 'finalizado' 
                  ? 'Documento finalizado não pode ser editado'
                  : 'Documento em análise não pode ser editado'}
              </p>
            )}

            <Button
              variant="secondary"
              onClick={() => navigate(`/vendedor/documentos/${documento.id}/visualizar`)}
              className="w-full flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Visualizar Documentos
            </Button>
          </div>
        </Card>
      ))}

      {documentos.length === 0 && (
        <div className="col-span-full">
          <Card>
            <p className="text-gray-500 text-center">Nenhum documento cadastrado</p>
          </Card>
        </div>
      )}
    </div>
  );
}
