import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, FileText, Upload, MessageSquare, ArrowLeft, Trash2, X } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { CpfCnpjInput } from '../../../components/CpfCnpjInput';
import { Card } from '../../../components/Card';
import { ConfirmacaoModal } from '../../../components/Modal/ConfirmacaoModal';
import { useAuthStore } from '../../../store/authStore';
import { obterDocumento, atualizarDocumento, excluirDocumento } from '../services/documentoService';
import { uploadArquivos, uploadComprovante } from '../services/storageService';
import { Documento } from '../../../types';

interface EditarDocumentoProps {
  onSuccess?: () => void;
}

export function EditarDocumento({ onSuccess }: EditarDocumentoProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = useAuthStore((state) => state.usuario);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingDocument, setDeletingDocument] = useState(false);
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    observacoes: ''
  });
  const [arquivosAtuais, setArquivosAtuais] = useState<string[]>([]);
  const [arquivosSelecionados, setArquivosSelecionados] = useState<File[]>([]);
  const [comprovanteSelecionado, setComprovanteSelecionado] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      carregarDocumento(id);
    }
  }, [id]);

  async function carregarDocumento(documentoId: string) {
    try {
      const doc = await obterDocumento(documentoId);
      setDocumento(doc);
      setFormData({
        nome: doc.nome,
        cpfCnpj: doc.cpfCnpj,
        observacoes: doc.observacoes
      });
      setArquivosAtuais(doc.arquivos);
    } catch (error) {
      toast.error('Erro ao carregar documento');
      navigate('/vendedor/documentos');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleArquivosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivosSelecionados(Array.from(e.target.files));
    }
  };

  const handleComprovanteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprovanteSelecionado(e.target.files[0]);
    }
  };

  const handleRemoverArquivo = (indexToRemove: number) => {
    setArquivosAtuais(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !usuario?.id) return;

    setSaving(true);
    try {
      let urlsArquivos = [...arquivosAtuais];
      let urlComprovante = documento?.comprovantePagamento;
      
      if (arquivosSelecionados.length > 0) {
        const novasUrls = await uploadArquivos(arquivosSelecionados);
        urlsArquivos = [...urlsArquivos, ...novasUrls];
      }

      if (comprovanteSelecionado) {
        urlComprovante = await uploadComprovante(comprovanteSelecionado);
      }

      await atualizarDocumento(id, {
        ...formData,
        arquivos: urlsArquivos,
        comprovantePagamento: urlComprovante || documento!.comprovantePagamento,
        idVendedor: usuario.id
      });

      toast.success('Documento atualizado com sucesso!');
      if (onSuccess) {
        onSuccess();
      }
      navigate('/vendedor/documentos');
    } catch (error) {
      toast.error('Erro ao atualizar documento');
    } finally {
      setSaving(false);
    }
  };

  const handleExcluir = async () => {
    if (!id) return;

    setDeletingDocument(true);
    try {
      await excluirDocumento(id);
      toast.success('Documento excluído com sucesso!');
      if (onSuccess) {
        onSuccess();
      }
      navigate('/vendedor/documentos');
    } catch (error) {
      toast.error('Erro ao excluir documento');
    } finally {
      setDeletingDocument(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2da44e]"></div>
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Editar Documento</h2>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => navigate('/vendedor/documentos')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome do Cliente"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            icon={<User className="w-5 h-5 text-gray-500" />}
            required
          />

          <CpfCnpjInput
            label="CPF/CNPJ"
            name="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={handleChange}
            required
          />

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Comprovante de Pagamento
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleComprovanteChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="comprovante"
              />
              <label
                htmlFor="comprovante"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="w-5 h-5 mr-2" />
                Alterar Comprovante
              </label>
              {documento?.comprovantePagamento && (
                <a
                  href={documento.comprovantePagamento}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver comprovante atual
                </a>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Documentos Adicionais
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleArquivosChange}
                multiple
                className="hidden"
                id="documentos"
              />
              <label
                htmlFor="documentos"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <FileText className="w-5 h-5 mr-2" />
                Adicionar Documentos
              </label>
              {arquivosSelecionados.length > 0 && (
                <span className="text-sm text-gray-600">
                  {arquivosSelecionados.length} arquivo(s) selecionado(s)
                </span>
              )}
            </div>
            {arquivosAtuais.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Documentos atuais:</p>
                <div className="space-y-2">
                  {arquivosAtuais.map((url, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Documento {index + 1}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoverArquivo(index)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                        title="Remover documento"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Digite aqui as observações sobre o documento..."
            />
          </div>

          <Button
            type="submit"
            loading={saving}
            className="w-full"
          >
            Salvar Alterações
          </Button>
        </form>
      </Card>

      <ConfirmacaoModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleExcluir}
        title="Excluir Documento"
        message="Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita."
        loading={deletingDocument}
      />
    </>
  );
}
