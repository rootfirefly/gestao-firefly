import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { listarDocumentosVendedor } from '../services/documentoService';
import { Documento } from '../../../types';

export function useDocumentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = useAuthStore((state) => state.usuario);

  useEffect(() => {
    if (usuario?.id) {
      carregarDocumentos();
    }
  }, [usuario?.id]);

  async function carregarDocumentos() {
    try {
      const docs = await listarDocumentosVendedor(usuario!.id);
      setDocumentos(docs);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setLoading(false);
    }
  }

  return { documentos, loading, recarregar: carregarDocumentos };
}