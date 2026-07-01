'use server'

import { apiServerFetch } from '@/lib/api-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Produto } from '@/types';

export async function listarProdutos(): Promise<Produto[]> {
  const res = await apiServerFetch('/produtos', { method: 'GET' });
  if (!res.ok) {
    console.error('Falha ao listar produtos:', await res.text());
    return [];
  }
  return res.json();
}

export async function obterProduto(id: string): Promise<Produto> {
  const res = await apiServerFetch(`/produtos/${id}`, { method: 'GET' });
  if (!res.ok) {
    throw new Error('Falha ao obter produto');
  }
  return res.json();
}

export async function criarProduto(prevState: any, formData: FormData) {
  const nome = formData.get('nome') as string;
  const descricao = formData.get('descricao') as string;
  const precoUnitario = parseFloat(formData.get('precoUnitario') as string);
  const ativo = formData.get('ativo') === 'on';

  const payload = { nome, descricao, precoUnitario, ativo };

  const res = await apiServerFetch('/produtos', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return { error: 'Falha ao criar produto' };
  }

  revalidatePath('/produtos');
  redirect('/produtos');
}

export async function atualizarProduto(id: string, prevState: any, formData: FormData) {
  const nome = formData.get('nome') as string;
  const descricao = formData.get('descricao') as string;
  const precoUnitario = parseFloat(formData.get('precoUnitario') as string);
  const ativo = formData.get('ativo') === 'on';

  const payload = { nome, descricao, precoUnitario, ativo };

  const res = await apiServerFetch(`/produtos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return { error: 'Falha ao atualizar produto' };
  }

  revalidatePath('/produtos');
  redirect('/produtos');
}

export async function excluirProduto(id: number) {
  const res = await apiServerFetch(`/produtos/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { error: body?.mensagem ?? 'Falha ao excluir produto' };
  }
  revalidatePath('/produtos');
}
