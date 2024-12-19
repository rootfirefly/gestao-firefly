import React from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { FileText, Users, Shield, Key } from 'lucide-react';
import { VERSION } from '../../config/version';

export default function Documentacao() {
  return (
    <Layout title="Documentação do Sistema" navigation={null}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Documentação Gestão FireFly
          </h1>
          <p className="mt-2 text-gray-600">
            Versão {VERSION.full}
          </p>
        </div>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-500" />
            Níveis de Acesso
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Administrador</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Dashboard com estatísticas</li>
                <li>• Gerenciamento de vendedores</li>
                <li>• Análise e aprovação de documentos</li>
                <li>• Personalização do perfil e marca</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Vendedor</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Envio de documentos</li>
                <li>• Acompanhamento de status</li>
                <li>• Dashboard com estatísticas</li>
                <li>• Gestão de documentos em andamento</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-500" />
            Fluxo de Documentos
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Status dos Documentos</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  <strong>Em Andamento:</strong> Documento recém enviado pelo vendedor
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <strong>Aguardando:</strong> Em análise pelo administrador
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <strong>Finalizado:</strong> Processo concluído
                </li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Processo de Envio</h3>
              <ol className="mt-2 space-y-2 text-gray-600 list-decimal list-inside">
                <li>Vendedor preenche formulário com dados do cliente</li>
                <li>Upload do comprovante de pagamento (obrigatório)</li>
                <li>Upload de documentos adicionais (opcional)</li>
                <li>Administrador analisa e atualiza status</li>
                <li>Vendedor acompanha o progresso pelo painel</li>
              </ol>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-purple-500" />
            Gerenciamento de Usuários
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Cadastro de Vendedores</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Auto-registro através da página inicial</li>
                <li>• Cadastro pelo administrador</li>
                <li>• Associação a um administrador específico</li>
                <li>• Ativação/desativação de conta</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Perfil do Administrador</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Personalização da marca (logo)</li>
                <li>• Foto de perfil</li>
                <li>• Dados da organização</li>
                <li>• Gerenciamento de equipe</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Key className="w-6 h-6 mr-2 text-red-500" />
            Segurança
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Autenticação</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Login com e-mail e senha</li>
                <li>• Controle de sessão</li>
                <li>• Níveis de permissão</li>
                <li>• Proteção de rotas</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Armazenamento</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Documentos criptografados</li>
                <li>• Backup automático</li>
                <li>• Controle de acesso por usuário</li>
                <li>• Validação de uploads</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
