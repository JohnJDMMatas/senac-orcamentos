'use server';

import { apiServerFetch } from '@/lib/api-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function listarOrcamentos() {
  const response = await apiServerFetch('/orcamentos');
  if (!response.ok) {
    return [];
  }
  return response.json();
}

export async function obterOrcamento(id: string) {
  const response = await apiServerFetch(`/orcamentos/${id}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export async function listarClientes() {
  const response = await apiServerFetch('/clientes');
  if (!response.ok) {
    return [];
  }
  const clientes = await response.json();
  return clientes.filter((c: any) => c.ativo !== false);
}

export async function listarProdutos() {
  const response = await apiServerFetch('/produtos');
  if (!response.ok) {
    return [];
  }
  const produtos = await response.json();
  return produtos.filter((p: any) => p.ativo !== false);
}

export async function criarOrcamento(prevState: any, formData: FormData) {
  const clienteId = formData.get('clienteId') as string;
  const observacoes = formData.get('observacoes') as string;
  const situacao = formData.get('situacao') as string;
  
  let itens = [];
  try {
    itens = JSON.parse(formData.get('itens') as string);
  } catch (e) {
    return { error: 'Erro ao processar itens do orçamento.' };
  }

  if (!clienteId) return { error: 'Cliente é obrigatório.' };
  if (itens.length === 0) return { error: 'Adicione pelo menos um item ao orçamento.' };

  const payload = {
    clienteId,
    observacoes,
    situacao: situacao || 'pendente',
    itens
  };

  const response = await apiServerFetch('/orcamentos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { error: 'Erro ao criar orçamento.' };
  }

  revalidatePath('/orcamentos');
  redirect('/orcamentos');
}

export async function atualizarOrcamento(id: string, prevState: any, formData: FormData) {
  const clienteId = formData.get('clienteId') as string;
  const observacoes = formData.get('observacoes') as string;
  const situacao = formData.get('situacao') as string;
  
  let itens = [];
  try {
    itens = JSON.parse(formData.get('itens') as string);
  } catch (e) {
    return { error: 'Erro ao processar itens do orçamento.' };
  }

  if (!clienteId) return { error: 'Cliente é obrigatório.' };
  if (itens.length === 0) return { error: 'Adicione pelo menos um item ao orçamento.' };

  const payload = {
    clienteId,
    observacoes,
    situacao: situacao || 'pendente',
    itens
  };

  const response = await apiServerFetch(`/orcamentos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { error: 'Erro ao atualizar orçamento.' };
  }

  revalidatePath('/orcamentos');
  redirect('/orcamentos');
}
