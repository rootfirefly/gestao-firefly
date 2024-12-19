import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { RegistroForm } from './RegistroForm';
import { registrarUsuario } from './registroService';
import { validarFormulario } from './validacao';

export default function Registro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const erros = validarFormulario(formData);
    if (erros) {
      toast.error(erros);
      return;
    }

    setLoading(true);
    try {
      await registrarUsuario(formData);
      toast.success('Registro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao realizar registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Gestão FireFly
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Criar Nova Conta
        </p>
        
        <RegistroForm
          formData={formData}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onLoginClick={() => navigate('/login')}
        />
      </div>
    </div>
  );
}
