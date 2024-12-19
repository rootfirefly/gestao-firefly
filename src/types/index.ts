export interface Usuario {
  id: string;
  nome: string;
  nomeOrganizacao: string;
  email: string;
  telefone: string;
  tipo: 'admin' | 'vendedor' | 'super_admin';
  ativo: boolean;
  dataCriacao: Date;
  logo?: string;
  avatar?: string;
}

export interface Documento {
  id: string;
  nome: string;
  cpfCnpj: string;
  observacoes: string;
  idVendedor: string;
  status: 'em_andamento' | 'aguardando' | 'finalizado';
  arquivos: string[];
  comprovantePagamento: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
