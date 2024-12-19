import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CreditCard, Key } from 'lucide-react';
import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { obterConfiguracaoAsaas, salvarConfiguracaoAsaas } from '../services/configService';

export function ConfiguracaoAsaas() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: '',
    ambiente: 'sandbox'
  });

  useEffect(() => {
    carregarConfiguracao();
  }, []);

  const carregarConfiguracao = async () => {
    try {
      const config = await obterConfiguracaoAsaas();
      if (config) {
        setFormData({
          apiKey: config.apiKey || '',
          ambiente: config.ambiente || 'sandbox'
        });
      }
    } catch (error) {
      toast.error('Erro ao carregar configurações do Asaas');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await salvarConfiguracaoAsaas(formData);
      toast.success('Configurações do Asaas salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações do Asaas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Configurações de Pagamento</h2>
          <CreditCard className="w-6 h-6 text-gray-400" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Chave API Asaas"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            type="password"
            icon={<Key className="w-5 h-5 text-gray-500" />}
            required
          />

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Ambiente
            </label>
            <select
              name="ambiente"
              value={formData.ambiente}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-3"
            >
              <option value="sandbox">Sandbox (Testes)</option>
              <option value="producao">Produção</option>
            </select>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Salvar Configurações
          </Button>
        </form>
      </div>
    </Card>
  );
}
