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

## Boas Práticas de Código

### Estrutura de Arquivos
- Arquivos pequenos e focados
- Cada arquivo tem uma única responsabilidade
- Componentes reutilizáveis separados
- Lógica de negócios extraída em hooks e serviços

### Organização do Projeto
```
src/
  ├── components/      # Componentes reutilizáveis
  │   ├── Button/     # Cada componente em sua própria pasta
  │   ├── Input/      # Com index.tsx e estilos relacionados
  │   └── Layout/     # Componentes de layout
  │
  ├── pages/          # Páginas da aplicação
  │   ├── Login/      # Cada página em sua própria pasta
  │   ├── Registro/   # Com componentes específicos
  │   └── Dashboard/  # E lógica relacionada
  │
  ├── services/       # Serviços e integrações
  │   ├── api/        # Chamadas de API
  │   └── firebase/   # Configuração Firebase
  │
  ├── hooks/          # Hooks personalizados
  ├── store/          # Gerenciamento de estado
  ├── types/          # Tipos TypeScript
  └── utils/          # Funções utilitárias
```

### Padrões de Código
1. **Componentes**
   - Um componente por arquivo
   - Props tipadas com TypeScript
   - Uso de interfaces para definir tipos
   - Componentes funcionais com hooks

2. **Hooks**
   - Extrair lógica complexa em hooks customizados
   - Nomes começando com "use"
   - Documentar parâmetros e retornos

3. **Serviços**
   - Separar chamadas de API
   - Funções assíncronas com tratamento de erro
   - Tipagem de respostas

4. **Estado**
   - Gerenciamento centralizado com Zustand
   - Estados locais com useState
   - Context API para temas e configurações globais

### Boas Práticas
1. **Performance**
   - Memoização com useMemo e useCallback
   - Lazy loading de componentes
   - Otimização de re-renders

2. **Segurança**
   - Validação de inputs
   - Sanitização de dados
   - Proteção de rotas

3. **Acessibilidade**
   - Uso de tags semânticas
   - ARIA labels quando necessário
   - Suporte a navegação por teclado

4. **Responsividade**
   - Design mobile-first
   - Breakpoints consistentes
   - Componentes adaptáveis

## Configuração

1. Clone o repositório
```bash
git clone https://github.com/rootfirefly/gestao-firefly.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente (.env)
```env
VITE_FIREBASE_API_KEY=seu_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

4. Execute o projeto
```bash
npm run dev
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.