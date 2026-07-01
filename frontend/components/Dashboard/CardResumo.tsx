import React from 'react';

interface ResumoProps {
    resumo: {
        totalOrcamentos: number;
        totalClientes: number;
        totalProdutosAtivos: number;
    }
}

export default function CardResumo({ resumo }: ResumoProps) {
    return (
        <>
            <div className="col-md-4 mb-3">
                <div className="card text-bg-primary shadow-sm h-100">
                    <div className="card-body">
                        <h5 className="card-title">Total de Orçamentos</h5>
                        <p className="card-text fs-2 fw-bold">{resumo?.totalOrcamentos ?? 0}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card text-bg-success shadow-sm h-100">
                    <div className="card-body">
                        <h5 className="card-title">Total de Clientes</h5>
                        <p className="card-text fs-2 fw-bold">{resumo?.totalClientes ?? 0}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card text-bg-info shadow-sm h-100 text-white">
                    <div className="card-body">
                        <h5 className="card-title">Produtos Ativos</h5>
                        <p className="card-text fs-2 fw-bold">{resumo?.totalProdutosAtivos ?? 0}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
