# Gestão FireFly v1.0.1

Sistema web para gestão de documentos com diferentes níveis de acesso (Super Admin, Admin e Vendedor).

## 🚀 Principais Funcionalidades

### Super Admin
- Gerenciamento completo de administradores
- Associação de vendedores aos administradores
- Configuração do gateway de pagamento Asaas
- Monitoramento geral do sistema

### Administrador
- Dashboard com estatísticas de documentos e vendedores
- Gerenciamento de vendedores
- Análise e aprovação de documentos
- Personalização do perfil e marca

### Vendedor
- Envio de documentos com múltiplos arquivos
- Acompanhamento de status
- Dashboard com estatísticas
- Gestão de documentos em andamento

## 🆕 Atualizações v1.0.1

- Novo layout inspirado no GitHub
- Design responsivo aprimorado
- Menu hamburguer para mobile
- Botão flutuante na dashboard do vendedor
- Melhorias nos formulários e inputs
- Rodapé com versão e créditos
- Configurações de perfil do admin
- Suporte para logo e avatar
- Preparação para integração com Asaas

## 🛠️ Tecnologias

- React + TypeScript
- Vite
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- React Router DOM
- Zustand
- React Hot Toast

## 📦 Instalação

### Requisitos
- Node.js 18+
- NPM 9+
- Firebase Project

### Configuração Local

1. Clone o repositório:
```bash
git clone https://github.com/rootfirefly/gestao-firefly.git
cd gestao-firefly
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Preencha as credenciais do Firebase no arquivo `.env`

5. Execute o projeto:
```bash
npm run dev
```

### Instalação em Produção

Utilize o script `setup.sh` para instalação automatizada em VPS:

1. Faça upload do script:
```bash
scp setup.sh root@seu-servidor:/root/
```

2. Execute o script:
```bash
chmod +x setup.sh
./setup.sh
```

O script irá:
- Verificar requisitos do sistema
- Instalar dependências
- Configurar Nginx
- Configurar SSL com Let's Encrypt
- Configurar PM2 para gerenciamento do processo

## 👥 Níveis de Acesso

### Super Admin
- Acesso: super@admin.com
- Senha inicial: superadmin123
- Responsável pela gestão geral do sistema

### Administrador
- Gerencia sua própria organização
- Acesso aos seus vendedores e documentos

### Vendedor
- Acesso limitado ao envio e acompanhamento de documentos
- Vinculado a um administrador

## 🔒 Segurança

- Autenticação via Firebase Auth
- Regras de segurança no Firestore
- Validação de uploads no Storage
- Proteção contra XSS e CSRF
- Certificado SSL/TLS

## 📱 Responsividade

- Layout adaptativo para todas as telas
- Experiência otimizada para mobile
- Menu hamburguer em telas pequenas
- Botões flutuantes para ações principais

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Criado e mantido por [@rootfirefly](https://github.com/rootfirefly).

---

**Versão:** 1.0.1  
**Última atualização:** Março 2024
