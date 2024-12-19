import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Power, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Grid } from '../../../components/Grid';
import { Badge } from '../../../components/Badge';
import { AssociarVendedor } from './AssociarVendedor';
import { listarAdmins, alterarStatusAdmin } from '../services/adminService';
import { Usuario } from '../../../types';

export function ListaAdmins() {
  const [admins, setAdmins] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminSelecionado, setAdminSelecionado] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAdmins();
  }, []);

  async function carregarAdmins() {
    try {
      const lista = await listarAdmins();
      setAdmins(lista);
    } catch (error) {
      toast.error('Erro ao carregar administradores');
    } finally {
      setLoading(false);
    }
  }

  const handleToggleStatus = async (admin: Usuario) => {
    try {
      await alterarStatusAdmin(admin.id, !admin.ativo);
      toast.success(`Administrador ${admin.ativo ? 'desativado' : 'ativado'} com sucesso`);
      carregarAdmins();
    } catch (error) {
      toast.error('Erro ao alterar status do administrador');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Grid cols={3}>
        {admins.map((admin) => (
          <Card key={admin.id}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {admin.nomeOrganizacao}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{admin.nome}</p>
              </div>
              <Badge variant={admin.ativo ? 'green' : 'red'}>
                {admin.ativo ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">{admin.email}</p>
              <p className="text-sm text-gray-600">{admin.telefone}</p>
            </div>

            <div className="pt-4 border-t border-gray-200 flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/super-admin/admins/${admin.id}`)}
                className="flex-1 flex items-center justify-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant={admin.ativo ? 'danger' : 'primary'}
                onClick={() => handleToggleStatus(admin)}
                className="flex-1 flex items-center justify-center"
              >
                <Power className="w-4 h-4 mr-2" />
                {admin.ativo ? 'Desativar' : 'Ativar'}
              </Button>
            </div>

            <div className="mt-2">
              <Button
                variant="secondary"
                onClick={() => setAdminSelecionado(admin)}
                className="w-full flex items-center justify-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Associar Vendedores
              </Button>
            </div>
          </Card>
        ))}

        {admins.length === 0 && (
          <div className="col-span-full">
            <Card>
              <p className="text-gray-500 text-center">
                Nenhum administrador cadastrado
              </p>
            </Card>
          </div>
        )}
      </Grid>

      {adminSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <AssociarVendedor
              admin={adminSelecionado}
              onSuccess={carregarAdmins}
              onClose={() => setAdminSelecionado(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
