import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { User, Phone, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Input } from '../../../components/Input';
import { MaskedInput } from '../../../components/MaskedInput';
import { Button } from '../../../components/Button';
import { cadastrarVendedor } from '../services/vendedorService';
import { useAuthStore } from '../../../store/authStore';

interface CadastroVendedorProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CadastroVendedor({ onSuccess, onCancel }: CadastroVendedorProps) {
  const [loading, setLoading] = useState(false);
  const usuario = useAuthStore((state) => state.usuario);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await cadastrarVendedor(formData, usuario!.id);
      toast.success('Vendedor cadastrado com sucesso!');
      onSuccess();
    } catch (error) {
      toast.error('Erro ao cadastrar vendedor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Novo Vendedor</h2>
        <Button
          variant="secondary"
          onClick={onCancel}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome Completo"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          icon={<User className="w-5 h-5 text-gray-500" />}
          required
        />

        <MaskedInput
          label="WhatsApp"
          mask="(99) 99999-9999"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          icon={<Phone className="w-5 h-5 text-gray-500" />}
          required
        />

        <Input
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail className="w-5 h-5 text-gray-500" />}
          required
        />

        <Input
          label="Senha"
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Cadastrar Vendedor
        </Button>
      </form>
    </div>
  );
}
