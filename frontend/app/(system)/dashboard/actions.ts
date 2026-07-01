'use server'

import { apiServerFetch } from '@/lib/api-server'

export async function getResumo() {
    const res = await apiServerFetch('/dashboard/resumo');
    if (!res.ok) return { totalOrcamentos: 0, totalClientes: 0, totalProdutosAtivos: 0 };
    return res.json();
}

export async function getOrcamentosPorStatus() {
    const res = await apiServerFetch('/dashboard/orcamentos-por-status');
    if (!res.ok) return [];
    return res.json();
}

export async function getOrcamentosPorMes(ano?: number) {
    const year = ano || new Date().getFullYear();
    const res = await apiServerFetch(`/dashboard/orcamentos-por-mes?ano=${year}`);
    if (!res.ok) return [];
    return res.json();
}

export async function getValorOrcadoPorMes(ano?: number) {
    const year = ano || new Date().getFullYear();
    const res = await apiServerFetch(`/dashboard/valor-orcado-por-mes?ano=${year}`);
    if (!res.ok) return [];
    return res.json();
}

export async function getTopClientesOrcamentos(limit = 10) {
    const res = await apiServerFetch(`/dashboard/top-clientes-orcamentos?limit=${limit}`);
    if (!res.ok) return [];
    return res.json();
}

export async function getTopProdutosOrcados(limit = 10) {
    const res = await apiServerFetch(`/dashboard/top-produtos-orcados?limit=${limit}`);
    if (!res.ok) return [];
    return res.json();
}
