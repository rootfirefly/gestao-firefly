import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Camera, Building2, User } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Card } from '../../../components/Card';
import { useAuthStore } from '../../../store/authStore';
import { atualizarPerfilAdmin, uploadImagem, obterPerfilAdmin } from '../services/adminService';

export function ConfiguracaoPerfil() {
  const usuario = useAuthStore((state) => state.usuario);
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: usuario?.nome || '',
    nomeOrganizacao: usuario?.nomeOrganizacao || ''
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usuario?.id) {
      carregarPerfil();
    }
  }, [usuario?.id]);

  const carregarPerfil = async () => {
    try {
      const perfilAtualizado = await obterPerfilAdmin(usuario!.id);
      setUsuario(perfilAtualizado);
      setFormData({
        nome: perfilAtualizado.nome,
        nomeOrganizacao: perfilAtualizado.nomeOrganizacao
      });
    } catch (error) {
      toast.error('Erro ao carregar perfil');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImagemUpload = async (file: File, tipo: 'logo' | 'avatar') => {
    try {
      setLoading(true);
      const url = await uploadImagem(file, tipo, usuario!.id);
      await atualizarPerfilAdmin(usuario!.id, { [tipo]: url });
      
      setUsuario({
        ...usuario!,
        [tipo]: url
      });
      
      toast.success(`${tipo === 'logo' ? 'Logo' : 'Avatar'} atualizado com sucesso!`);
    } catch (error: any) {
      toast.error(error.message || `Erro ao atualizar ${tipo === 'logo' ? 'logo' : 'avatar'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await atualizarPerfilAdmin(usuario!.id, formData);
      setUsuario({
        ...usuario!,
        ...formData
      });
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const renderImageUpload = (
    tipo: 'logo' | 'avatar',
    label: string,
    inputRef: React.RefObject<HTMLInputElement>,
    icon: React.ReactNode
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <div className={`w-24 h-24 ${tipo === 'avatar' ? 'rounded-full' : 'rounded-lg'} border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50`}>
          {usuario?.[tipo] ? (
            <img
              src={usuario[tipo]}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            icon
          )}
        </div>
        <Button
          variant="secondary"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          <Camera className="w-4 h-4 mr-2" />
          Alterar {label}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImagemUpload(file, tipo);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h2 className="text-xl font-semibold mb-6">Configurações do Perfil</h2>

        <div className="space-y-6">
          {renderImageUpload(
            'logo',
            'Logo da Empresa',
            logoInputRef,
            <Building2 className="w-8 h-8 text-gray-400" />
          )}

          {renderImageUpload(
            'avatar',
            'Foto do Perfil',
            avatarInputRef,
            <User className="w-8 h-8 text-gray-400" />
          )}

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

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Salvar Alterações
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
