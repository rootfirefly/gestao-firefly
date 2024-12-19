import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obterDocumento } from '../services/documentoService';
import { Documento } from '../../../types';

export function useDocumento() {
  const { id } = useParams();
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      carregarDocumento(id);
    }
  }, [id]);

  async function carregarDocumento(documentoId: string) {
    try {
      const doc = await obterDocumento(documentoId);
      setDocumento(doc);
    } catch (error) {
      console.error('Erro ao carregar documento:', error);
    } finally {
      setLoading(false);
    }
  }

  return { documento, loading };
}
