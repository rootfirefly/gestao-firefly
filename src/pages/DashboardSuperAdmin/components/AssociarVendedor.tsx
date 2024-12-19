import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { User, Building2, Search } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { listarVendedoresSemAdmin, associarVendedorAdmin } from '../services/vendedorService';
import { Usuario } from '../../../types';

interface AssociarVendedorProps {
  admin: Usuario;
  onSuccess: () => void;
  onClose: () => void;
}

export function AssociarVendedor({ admin, onSuccess, onClose }: AssociarVendedorProps) {
  const [vendedores, setVendedores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarVendedores();
  }, []);

  async function carregarVendedores() {
    try {
      const lista = await listarVendedoresSemAdmin();
      setVendedores(lista);
    } catch (error) {
      toast.error('Erro ao carregar vendedores');
    } finally {
      setLoading(false);
    }
  }

  const vendedoresFiltrados = vendedores.filter(vendedor => 
    vendedor.nome.toLowerCase().includes(busca.toLowerCase()) ||
    vendedor.email.toLowerCase().includes(busca.toLowerCase())
  );

  const handleToggleVendedor = (id: string) => {
    setSelecionados(prev => 
      prev.includes(id) 
        ? prev.filter(v => v !== id)
        : [...prev, id]
    );
  };

  const handleAssociar = async () => {
    if (selecionados.length === 0) {
      toast.error('Selecione pelo menos um vendedor');
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        selecionados.map(vendedorId => 
          associarVendedorAdmin(vendedorId, admin.id)
        )
      );
      toast.success('Vendedores associados com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Erro ao associar vendedores');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Associar Vendedores</h2>
          <p className="text-sm text-gray-600 mt-1">
            Administrador: {admin.nome} ({admin.nomeOrganizacao})
          </p>
        </div>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </div>

      <div className="mb-4">
        <Input
          label="Buscar vendedores"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          icon={<Search className="w-5 h-5 text-gray-500" />}
          placeholder="Digite o nome ou email do vendedor"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {vendedoresFiltrados.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {vendedoresFiltrados.map(vendedor => (
                <div
                  key={vendedor.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selecionados.includes(vendedor.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleToggleVendedor(vendedor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{vendedor.nome}</h3>
                        <p className="text-sm text-gray-600">{vendedor.email}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selecionados.includes(vendedor.id)}
                      onChange={() => handleToggleVendedor(vendedor.id)}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {busca 
                ? 'Nenhum vendedor encontrado com os critérios de busca'
                : 'Não há vendedores disponíveis para associação'}
            </div>
          )}

          {vendedoresFiltrados.length > 0 && (
            <div className="flex justify-end pt-4 border-t mt-4">
              <Button
                onClick={handleAssociar}
                disabled={selecionados.length === 0}
                loading={loading}
              >
                Associar Vendedores ({selecionados.length})
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
