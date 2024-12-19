import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { User, FileText, Upload, MessageSquare } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { CpfCnpjInput } from '../../../components/CpfCnpjInput';
import { useAuthStore } from '../../../store/authStore';
import { cadastrarDocumento } from '../services/documentoService';
import { uploadArquivos, uploadComprovante } from '../services/storageService';

interface FormularioDocumentoProps {
  onSuccess?: () => void;
}

export function FormularioDocumento({ onSuccess }: FormularioDocumentoProps) {
  const usuario = useAuthStore((state) => state.usuario);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    observacoes: '',
    arquivos: [] as string[],
    comprovantePagamento: ''
  });

  const [arquivosSelecionados, setArquivosSelecionados] = useState<File[]>([]);
  const [comprovanteSelecionado, setComprovanteSelecionado] = useState<File | null>(null);

  const resetForm = () => {
    setFormData({
      nome: '',
      cpfCnpj: '',
      observacoes: '',
      arquivos: [],
      comprovantePagamento: ''
    });
    setArquivosSelecionados([]);
    setComprovanteSelecionado(null);
  };

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
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Formato de arquivo não suportado. Use PDF, JPG ou PNG.');
        return;
      }
      
      setComprovanteSelecionado(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario?.id) return;

    if (!comprovanteSelecionado) {
      toast.error('O comprovante de pagamento é obrigatório');
      return;
    }

    setLoading(true);
    try {
      let urlsArquivos: string[] = [];
      let urlComprovante = '';
      
      if (arquivosSelecionados.length > 0) {
        urlsArquivos = await uploadArquivos(arquivosSelecionados);
      }

      if (comprovanteSelecionado) {
        urlComprovante = await uploadComprovante(comprovanteSelecionado);
      }

      await cadastrarDocumento({
        ...formData,
        arquivos: urlsArquivos,
        comprovantePagamento: urlComprovante,
        idVendedor: usuario.id,
        status: 'em_andamento'
      });

      toast.success('Documento cadastrado com sucesso!');
      resetForm();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Erro ao cadastrar documento');
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Comprovante de Pagamento (PDF, JPG ou PNG)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            onChange={handleComprovanteChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="comprovante"
            required
          />
          <label
            htmlFor="comprovante"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="w-5 h-5 mr-2" />
            {comprovanteSelecionado ? 'Alterar Comprovante' : 'Selecionar Comprovante'}
          </label>
          {comprovanteSelecionado && (
            <span className="text-sm text-gray-600">
              {comprovanteSelecionado.name}
            </span>
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
            {arquivosSelecionados.length > 0 ? 'Alterar Documentos' : 'Adicionar Documentos'}
          </label>
          {arquivosSelecionados.length > 0 && (
            <span className="text-sm text-gray-600">
              {arquivosSelecionados.length} arquivo(s) selecionado(s)
            </span>
          )}
        </div>
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
        loading={loading}
        className="w-full"
      >
        Cadastrar Documento
      </Button>
    </form>
  );
}
