'use client'

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { excluirProduto } from '@/app/(system)/produtos/actions';
import { Produto } from '@/types';

export default function TabelaProdutos({ produtos }: { produtos: Produto[] }) {
  const [erro, setErro] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleExcluir(id: number) {
    if (!confirm('Confirma a exclusão do produto?')) return;
    setErro(null);
    startTransition(async () => {
      const result = await excluirProduto(id);
      if (result?.error) setErro(result.error);
    });
  }

  return (
    <div>
      {erro && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {erro}
          <button type="button" className="btn-close" onClick={() => setErro(null)} />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-3">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            )}
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.precoUnitario)}
                </td>
                <td>
                  {p.ativo ? (
                    <span className="badge bg-success">Ativo</span>
                  ) : (
                    <span className="badge bg-danger">Inativo</span>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Link href={`/produtos/${p.id}/editar`} className="btn btn-sm btn-primary">
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      disabled={isPending}
                      onClick={() => handleExcluir(p.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
