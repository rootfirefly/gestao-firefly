import React from 'react';
import { User, Phone, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { MaskedInput } from '../../components/MaskedInput';

interface RegistroFormProps {
  formData: {
    nome: string;
    whatsapp: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLoginClick: () => void;
}

export function RegistroForm({ 
  formData, 
  loading, 
  onChange, 
  onSubmit,
  onLoginClick 
}: RegistroFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Nome Completo"
        name="nome"
        value={formData.nome}
        onChange={onChange}
        icon={<User className="w-5 h-5 text-gray-500" />}
        required
      />

      <MaskedInput
        label="WhatsApp"
        mask="(99) 99999-9999"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={onChange}
        icon={<Phone className="w-5 h-5 text-gray-500" />}
        required
      />

      <Input
        label="E-mail"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        icon={<Mail className="w-5 h-5 text-gray-500" />}
        required
      />

      <Input
        label="Senha"
        type="password"
        name="senha"
        value={formData.senha}
        onChange={onChange}
        icon={<Lock className="w-5 h-5 text-gray-500" />}
        required
      />

      <Input
        label="Confirmar Senha"
        type="password"
        name="confirmarSenha"
        value={formData.confirmarSenha}
        onChange={onChange}
        icon={<Lock className="w-5 h-5 text-gray-500" />}
        required
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Registrar
      </Button>

      <p className="text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <button
          type="button"
          onClick={onLoginClick}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Faça login
        </button>
      </p>
    </form>
  );
}
