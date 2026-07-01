'use client'

import { useActionState } from 'react';
import { criarCliente, atualizarCliente } from '@/app/(system)/clientes/actions';
import { Cliente } from '@/types';
import Link from 'next/link';

interface FormClienteProps {
  cliente?: Cliente;
}

export default function FormCliente({ cliente }: FormClienteProps) {
  const action = cliente ? atualizarCliente.bind(null, String(cliente.id)) : criarCliente;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      {state?.error && <div className="alert alert-danger">{state.error}</div>}
      
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome</label>
        <input type="text" className="form-control" id="nome" name="nome" defaultValue={cliente?.nome} required />
      </div>

      <div className="mb-3">
        <label htmlFor="documento" className="form-label">Documento</label>
        <input type="text" className="form-control" id="documento" name="documento" defaultValue={cliente?.documento} required />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input type="email" className="form-control" id="email" name="email" defaultValue={cliente?.email} />
      </div>

      <div className="mb-3">
        <label htmlFor="telefone" className="form-label">Telefone</label>
        <input type="text" className="form-control" id="telefone" name="telefone" defaultValue={cliente?.telefone} />
      </div>

      <div className="mb-3">
        <label htmlFor="observacoes" className="form-label">Observações</label>
        <textarea className="form-control" id="observacoes" name="observacoes" rows={3} defaultValue={cliente?.observacoes} />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </button>
        <Link href="/clientes" className="btn btn-secondary">Cancelar</Link>
      </div>
    </form>
  );
}
