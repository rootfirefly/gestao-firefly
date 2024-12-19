import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { listarDocumentos } from '../services/documentoService';
import { listarVendedores } from '../services/vendedorService';
import { Documento, Usuario } from '../../../types';

export function useAdminDashboard() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [vendedores, setVendedores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = useAuthStore((state) => state.usuario);

  useEffect(() => {
    if (usuario?.id) {
      carregarDados();
    }
  }, [usuario?.id]);

  async function carregarDados() {
    try {
      setLoading(true);
      const [docs, vends] = await Promise.all([
        listarDocumentos(usuario!.id),
        listarVendedores(usuario!.id)
      ]);
      setDocumentos(docs);
      setVendedores(vends);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  return {
    documentos,
    vendedores,
    loading,
    recarregarDados: carregarDados
  };
}
