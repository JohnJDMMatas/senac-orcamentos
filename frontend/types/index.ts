export type PerfilUsuario = 'admin' | 'operador';

export interface Usuario {
  id: number;
  email: string;
  nomeCompleto: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
}

export interface Produto {
  id: number;
  codigoSku?: string;
  nome: string;
  descricao?: string;
  precoUnitario: number;
  unidade?: string;
  ativo: boolean;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
}

export interface Cliente {
  id: number;
  nome: string;
  documento: string;
  email?: string;
  telefone?: string;
  observacoes?: string;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
}

export enum SituacaoOrcamento {
  PENDENTE = 'pendente',
  ENVIADO = 'enviado',
  APROVADO = 'aprovado',
  REJEITADO = 'rejeitado',
  CANCELADO = 'cancelado',
}

export interface ItemOrcamento {
  id: number;
  orcamentoId: number;
  produtoId: number;
  nomeProdutoRegistro?: string;
  precoUnitarioRegistro?: number;
  quantidade: number;
  totalLinha?: number;
}

export interface Orcamento {
  id: number;
  clienteId: number;
  cliente?: Cliente;
  observacoes?: string;
  situacao: SituacaoOrcamento;
  subtotal?: number;
  valorDesconto?: number;
  total: number;
  itens: ItemOrcamento[];
  criadoEm: Date | string;
  atualizadoEm: Date | string;
}
