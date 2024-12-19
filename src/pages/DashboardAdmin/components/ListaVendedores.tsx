import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, UserPlus, Power, Building2 } from 'lucide-react';
import { Usuario } from '../../../types';
import { formatarTelefone } from '../../../utils/formatters';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { Card } from '../../../components/Card';
import { Grid } from '../../../components/Grid';
import { alterarStatusVendedor } from '../services/vendedorService';
import { toast } from 'react-hot-toast';

interface ListaVendedoresProps {
  vendedores: Usuario[];
  onVendedoresChange?: () => void;
}

export function ListaVendedores({ 
  vendedores, 
  onVendedoresChange 
}: ListaVendedoresProps) {
  const navigate = useNavigate();

  const handleToggleStatus = async (vendedor: Usuario) => {
    try {
      await alterarStatusVendedor(vendedor.id, !vendedor.ativo);
      toast.success(`Vendedor ${vendedor.ativo ? 'desativado' : 'ativado'} com sucesso`);
      if (onVendedoresChange) {
        onVendedoresChange();
      }
    } catch (error) {
      toast.error('Erro ao alterar status do vendedor');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Vendedores
        </h2>
        <Button
          onClick={() => navigate('/admin/vendedores/novo')}
          className="hidden sm:flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Vendedor
        </Button>
      </div>

      <Grid cols={3}>
        {vendedores.map((vendedor) => (
          <Card key={vendedor.id}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {vendedor.nome}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Building2 className="w-4 h-4 mr-1" />
                    {vendedor.nomeOrganizacao || 'Sem organização'}
                  </p>
                </div>
                <Badge variant={vendedor.ativo ? 'green' : 'red'}>
                  {vendedor.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {vendedor.email}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {formatarTelefone(vendedor.telefone)}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant={vendedor.ativo ? 'danger' : 'primary'}
                  onClick={() => handleToggleStatus(vendedor)}
                  className="w-full flex items-center justify-center"
                >
                  <Power className="w-4 h-4 mr-2" />
                  {vendedor.ativo ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {vendedores.length === 0 && (
          <div className="col-span-full">
            <Card>
              <p className="text-gray-500 text-center">
                Nenhum vendedor cadastrado
              </p>
            </Card>
          </div>
        )}
      </Grid>

      <Button
        onClick={() => navigate('/admin/vendedores/novo')}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg sm:hidden flex items-center justify-center"
      >
        <UserPlus className="w-6 h-6" />
      </Button>
    </div>
  );
}
