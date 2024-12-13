# Gestão FireFly

Sistema web para gestão de documentos com diferentes níveis de acesso (Super Admin, Admin e Vendedor).

## Funcionalidades

### Super Admin
- Gerenciamento de administradores
- Ativação/desativação de administradores
- Associação de vendedores a administradores
- Visualização de estatísticas

### Admin
- Gerenciamento de vendedores
- Visualização e aprovação de documentos
- Dashboard com estatísticas
- Indicadores de performance

### Vendedor
- Cadastro de documentos
- Upload de arquivos
- Acompanhamento de status
- Dashboard personalizado

## Tecnologias

- React
- TypeScript
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- React Router
- Zustand

## Configuração

1. Clone o repositório
```bash
git clone https://github.com/rootfirefly/gestao-firefly.git
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
  ├── components/      # Componentes reutilizáveis
  ├── pages/          # Páginas da aplicação
  ├── services/       # Serviços e integrações
  ├── store/          # Gerenciamento de estado
  ├── types/          # Tipos TypeScript
  └── utils/          # Funções utilitárias
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request