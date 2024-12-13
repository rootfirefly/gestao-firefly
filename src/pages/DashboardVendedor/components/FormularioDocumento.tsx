// Update the interface to include onSuccess
interface FormularioDocumentoProps {
  onSuccess?: () => void;
}

export function FormularioDocumento({ onSuccess }: FormularioDocumentoProps) {
  // ... rest of the component code ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario?.id) return;

    if (!formData.comprovantePagamento && !comprovanteSelecionado) {
      toast.error('O comprovante de pagamento é obrigatório');
      return;
    }

    setLoading(true);
    try {
      let urlsArquivos = formData.arquivos;
      let urlComprovante = formData.comprovantePagamento;
      
      if (arquivosSelecionados.length > 0) {
        const novasUrls = await uploadArquivos(arquivosSelecionados);
        urlsArquivos = [...urlsArquivos, ...novasUrls];
      }

      if (comprovanteSelecionado) {
        urlComprovante = await uploadComprovante(comprovanteSelecionado);
      }

      const dadosDocumento = {
        ...formData,
        arquivos: urlsArquivos,
        comprovantePagamento: urlComprovante,
        idVendedor: usuario.id,
        status: 'em_andamento' as const
      };

      if (id) {
        await atualizarDocumento(id, dadosDocumento);
        toast.success('Documento atualizado com sucesso!');
      } else {
        await cadastrarDocumento(dadosDocumento);
        toast.success('Documento cadastrado com sucesso!');
      }

      if (onSuccess) {
        onSuccess();
      }

      navigate('/vendedor/documentos');
    } catch (error) {
      toast.error('Erro ao salvar documento');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component code ...
}