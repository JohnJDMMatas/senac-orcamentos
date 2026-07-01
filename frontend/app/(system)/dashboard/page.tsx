import React from 'react';
import { 
    getResumo, 
    getOrcamentosPorStatus, 
    getOrcamentosPorMes, 
    getValorOrcadoPorMes, 
    getTopClientesOrcamentos, 
    getTopProdutosOrcados 
} from './actions';

import CardResumo from '@/components/Dashboard/CardResumo';
import GraficoPizza from '@/components/Dashboard/GraficoPizza';
import GraficoBarras from '@/components/Dashboard/GraficoBarras';
import TabelaRank from '@/components/Dashboard/TabelaRank';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const ano = new Date().getFullYear();
    
    const [
        resumo,
        orcamentosPorStatus,
        orcamentosPorMes,
        valorOrcadoPorMes,
        topClientes,
        topProdutos
    ] = await Promise.all([
        getResumo(),
        getOrcamentosPorStatus(),
        getOrcamentosPorMes(ano),
        getValorOrcadoPorMes(ano),
        getTopClientesOrcamentos(10),
        getTopProdutosOrcados(10)
    ]);

    const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

    // Formatando dados para o Gráfico de Pizza (Status)
    const pizzaLabels = orcamentosPorStatus.map((item: any) => item.situacao);
    const pizzaData = orcamentosPorStatus.map((item: any) => item.total);

    // Formatando dados para o Gráfico de Barras (Orçamentos por Mês)
    const barraMesLabels = orcamentosPorMes.map((item: any) => meses[(item.mes ?? 1) - 1]);
    const barraMesData = orcamentosPorMes.map((item: any) => item.total);

    // Formatando dados para o Gráfico de Barras (Valor por Mês)
    const barraValorLabels = valorOrcadoPorMes.map((item: any) => meses[(item.mes ?? 1) - 1]);
    const barraValorData = valorOrcadoPorMes.map((item: any) => item.total);

    // Formatando dados para Tabelas Rank
    const rankClientes = topClientes.map((item: any) => ({
        nome: item.nome,
        quantidade: item.totalOrcamentos
    }));

    const rankProdutos = topProdutos.map((item: any) => ({
        nome: item.nome,
        quantidade: item.totalOcorrencias
    }));

    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Dashboard</h1>
            
            <div className="row mb-4">
                <CardResumo resumo={resumo} />
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-4 mb-md-0">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Orçamentos por Mês ({ano})</h5>
                            <GraficoBarras 
                                labels={barraMesLabels} 
                                datasets={[{
                                    label: 'Qtd de Orçamentos',
                                    data: barraMesData,
                                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                                }]} 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Valor Orçado por Mês ({ano})</h5>
                            <GraficoBarras 
                                labels={barraValorLabels} 
                                datasets={[{
                                    label: 'Valor Total (R$)',
                                    data: barraValorData,
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                                }]} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Orçamentos por Status</h5>
                            <GraficoPizza 
                                labels={pizzaLabels} 
                                data={pizzaData} 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Top 10 Clientes</h5>
                            <TabelaRank 
                                itens={rankClientes} 
                                colQuantidade="Orçamentos" 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Top 10 Produtos</h5>
                            <TabelaRank 
                                itens={rankProdutos} 
                                colQuantidade="Vezes Orçado" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}