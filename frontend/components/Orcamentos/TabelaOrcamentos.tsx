'use client';

import Link from 'next/link';

type TabelaOrcamentosProps = {
  orcamentos: any[];
};

const situacaoBadge: Record<string, string> = {
  aprovado: 'bg-success',
  rejeitado: 'bg-danger',
  cancelado: 'bg-secondary',
  enviado: 'bg-primary',
  pendente: 'bg-warning text-dark',
};

export default function TabelaOrcamentos({ orcamentos }: TabelaOrcamentosProps) {
  if (!orcamentos || orcamentos.length === 0) {
    return (
      <div className="alert alert-secondary">Nenhum orçamento encontrado.</div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Situação</th>
            <th className="text-end">Total</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((orcamento) => (
            <tr key={orcamento.id}>
              <td className="text-muted small">{orcamento.id}</td>
              <td>{orcamento.cliente?.nome ?? 'Cliente Desconhecido'}</td>
              <td>{new Date(orcamento.criadoEm).toLocaleDateString('pt-BR')}</td>
              <td>
                <span className={`badge ${situacaoBadge[orcamento.situacao] ?? 'bg-secondary'}`}>
                  {orcamento.situacao ?? 'pendente'}
                </span>
              </td>
              <td className="text-end fw-semibold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orcamento.total ?? 0)}
              </td>
              <td className="text-center">
                <Link href={`/orcamentos/${orcamento.id}/editar`} className="btn btn-sm btn-primary">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
