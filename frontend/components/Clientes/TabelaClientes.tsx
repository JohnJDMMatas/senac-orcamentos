'use client'

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { excluirCliente } from '@/app/(system)/clientes/actions';
import { Cliente } from '@/types';

export default function TabelaClientes({ clientes }: { clientes: Cliente[] }) {
  const [erro, setErro] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleExcluir(id: number) {
    if (!confirm('Confirma a exclusão do cliente?')) return;
    setErro(null);
    startTransition(async () => {
      const result = await excluirCliente(id);
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
              <th>Documento</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-3">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.documento}</td>
                <td>{c.email || '-'}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link href={`/clientes/${c.id}/editar`} className="btn btn-sm btn-primary">
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      disabled={isPending}
                      onClick={() => handleExcluir(c.id)}
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
