'use client'

import { useActionState } from 'react';
import { criarProduto, atualizarProduto } from '@/app/(system)/produtos/actions';
import { Produto } from '@/types';
import Link from 'next/link';

interface FormProdutoProps {
  produto?: Produto;
}

export default function FormProduto({ produto }: FormProdutoProps) {
  const action = produto ? atualizarProduto.bind(null, String(produto.id)) : criarProduto;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      {state?.error && <div className="alert alert-danger">{state.error}</div>}
      
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome</label>
        <input type="text" className="form-control" id="nome" name="nome" defaultValue={produto?.nome} required />
      </div>

      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição</label>
        <input type="text" className="form-control" id="descricao" name="descricao" defaultValue={produto?.descricao} required />
      </div>

      <div className="mb-3">
        <label htmlFor="precoUnitario" className="form-label">Preço Unitário (R$)</label>
        <input type="number" step="0.01" min="0" className="form-control" id="precoUnitario" name="precoUnitario" defaultValue={produto?.precoUnitario} required />
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="ativo" name="ativo" defaultChecked={produto ? produto.ativo : true} />
        <label className="form-check-label" htmlFor="ativo">Ativo</label>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </button>
        <Link href="/produtos" className="btn btn-secondary">Cancelar</Link>
      </div>
    </form>
  );
}
