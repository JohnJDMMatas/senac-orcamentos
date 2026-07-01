'use server'

import { apiServerFetch } from '@/lib/api-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Cliente } from '@/types';

export async function listarClientes(): Promise<Cliente[]> {
  const res = await apiServerFetch('/clientes', { method: 'GET' });
  if (!res.ok) {
    console.error('Falha ao listar clientes:', await res.text());
    return [];
  }
  return res.json();
}

export async function obterCliente(id: string): Promise<Cliente> {
  const res = await apiServerFetch(`/clientes/${id}`, { method: 'GET' });
  if (!res.ok) {
    throw new Error('Falha ao obter cliente');
  }
  return res.json();
}

export async function criarCliente(prevState: any, formData: FormData) {
  const nome = formData.get('nome') as string;
  const documento = formData.get('documento') as string;
  const email = formData.get('email') as string;
  const telefone = formData.get('telefone') as string;
  const observacoes = formData.get('observacoes') as string;

  const payload = { nome, documento, email, telefone, observacoes };

  const res = await apiServerFetch('/clientes', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return { error: 'Falha ao criar cliente' };
  }

  revalidatePath('/clientes');
  redirect('/clientes');
}

export async function atualizarCliente(id: string, prevState: any, formData: FormData) {
  const nome = formData.get('nome') as string;
  const documento = formData.get('documento') as string;
  const email = formData.get('email') as string;
  const telefone = formData.get('telefone') as string;
  const observacoes = formData.get('observacoes') as string;

  const payload = { nome, documento, email, telefone, observacoes };

  const res = await apiServerFetch(`/clientes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return { error: 'Falha ao atualizar cliente' };
  }

  revalidatePath('/clientes');
  redirect('/clientes');
}

export async function excluirCliente(id: number) {
  const res = await apiServerFetch(`/clientes/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { error: body?.mensagem ?? 'Falha ao excluir cliente' };
  }
  revalidatePath('/clientes');
}
