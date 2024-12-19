import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, Building2, Phone, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Input } from '../../../components/Input';
import { MaskedInput } from '../../../components/MaskedInput';
import { Button } from '../../../components/Button';
import { cadastrarAdmin, obterAdmin, atualizarAdmin } from '../services/adminService';

export function CadastroAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    nomeOrganizacao: '',
    telefone: '',
    email: '',
    senha: ''
  });

  useEffect(() => {
    if (id) {
      carregarAdmin(id);
    }
  }, [id]);

  async function carregarAdmin(adminId: string) {
    try {
      const admin = await obterAdmin(adminId);
      setFormData({
        nome: admin.nome,
        nomeOrganizacao: admin.nomeOrganizacao,
        telefone: admin.telefone,
        email: admin.email,
        senha: ''
      });
    } catch (error) {
      toast.error('Erro ao carregar dados do administrador');
      navigate('/super-admin/admins');
    }
  }

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
      if (id) {
        await atualizarAdmin(id, formData);
        toast.success('Administrador atualizado com sucesso!');
      } else {
        await cadastrarAdmin(formData);
        toast.success('Administrador cadastrado com sucesso!');
      }
      navigate('/super-admin/admins');
    } catch (error) {
      toast.error(id ? 'Erro ao atualizar administrador' : 'Erro ao cadastrar administrador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {id ? 'Editar Administrador' : 'Novo Administrador'}
          </h2>
          <Button
            variant="secondary"
            onClick={() => navigate('/super-admin/admins')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome da Organização"
            name="nomeOrganizacao"
            value={formData.nomeOrganizacao}
            onChange={handleChange}
            icon={<Building2 className="w-5 h-5 text-gray-500" />}
            required
          />

          <Input
            label="Nome do Administrador"
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
            label={id ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha'}
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            icon={<Lock className="w-5 h-5 text-gray-500" />}
            required={!id}
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {id ? 'Atualizar' : 'Cadastrar'} Administrador
          </Button>
        </form>
      </div>
    </div>
  );
}
