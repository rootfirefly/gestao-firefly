import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { listarDocumentosVendedor } from '../services/documentoService';
import { Documento } from '../../../types';

export function useDocumentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = useAuthStore((state) => state.usuario);

  const carregarDocumentos = useCallback(async () => {
    if (!usuario?.id) return;
    
    try {
      setLoading(true);
      const docs = await listarDocumentosVendedor(usuario.id);
      setDocumentos(docs);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setLoading(false);
    }
  }, [usuario?.id]);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  return {
    documentos,
    loading,
    recarregar: carregarDocumentos
  };
}
