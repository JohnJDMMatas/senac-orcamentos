import React from 'react';

interface RankItem {
    nome: string;
    quantidade: number;
}

interface TabelaRankProps {
    itens: RankItem[];
    colQuantidade: string;
}

export default function TabelaRank({ itens, colQuantidade }: TabelaRankProps) {
    if (!itens || itens.length === 0) {
        return <p className="text-muted">Nenhum dado disponível.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-sm table-hover align-middle">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className="text-end">{colQuantidade}</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome}</td>
                            <td className="text-end fw-bold">{item.quantidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
