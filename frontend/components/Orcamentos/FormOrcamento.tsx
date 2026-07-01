'use client';

import { useState, useActionState } from 'react';
import { criarOrcamento, atualizarOrcamento } from '@/app/(system)/orcamentos/actions';
import Link from 'next/link';

type FormOrcamentoProps = {
  orcamento?: any;
  clientes: any[];
  produtos: any[];
};

export default function FormOrcamento({ orcamento, clientes, produtos }: FormOrcamentoProps) {
  const [itens, setItens] = useState<any[]>(
    orcamento?.itens ? orcamento.itens.map((i: any) => ({
      produtoId: i.produtoId,
      quantidade: i.quantidade,
      precoUnitario: i.precoUnitarioRegistro ?? i.precoUnitario ?? 0,
      produtoNome: i.nomeProdutoRegistro ?? produtos.find((p: any) => p.id === i.produtoId)?.nome ?? 'Produto'
    })) : []
  );

  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState<number | ''>('');

  const action = orcamento ? atualizarOrcamento.bind(null, String(orcamento.id)) : criarOrcamento;
  const [state, formAction, pending] = useActionState(action, null);

  const handleAdicionarItem = () => {
    if (!produtoSelecionado || !quantidade || Number(quantidade) <= 0) return;
    const produto = produtos.find((p: any) => String(p.id) === produtoSelecionado);
    if (!produto) return;
    setItens([...itens, {
      produtoId: produto.id,
      quantidade: Number(quantidade),
      precoUnitario: produto.precoUnitario,
      produtoNome: produto.nome
    }]);
    setProdutoSelecionado('');
    setQuantidade('');
  };

  const handleRemoverItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const total = itens.reduce((acc, item) => acc + item.quantidade * item.precoUnitario, 0);

  return (
    <form action={formAction}>
      {state?.error && (
        <div className="alert alert-danger">{state.error}</div>
      )}

      <div className="row mb-3">
        <div className="col-md-6 mb-3 mb-md-0">
          <label htmlFor="clienteId" className="form-label">Cliente <span className="text-danger">*</span></label>
          <select name="clienteId" id="clienteId" className="form-select" defaultValue={orcamento?.clienteId ?? ''} required>
            <option value="">Selecione um cliente...</option>
            {clientes.map((c: any) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="situacao" className="form-label">Situação</label>
          <select name="situacao" id="situacao" className="form-select" defaultValue={orcamento?.situacao ?? 'pendente'}>
            <option value="pendente">Pendente</option>
            <option value="enviado">Enviado</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="observacoes" className="form-label">Observações</label>
        <textarea name="observacoes" id="observacoes" className="form-control" rows={3} defaultValue={orcamento?.observacoes ?? ''} />
      </div>

      {/* Itens */}
      <div className="card mb-3">
        <div className="card-header fw-semibold">Itens do Orçamento</div>
        <div className="card-body">
          <input type="hidden" name="itens" value={JSON.stringify(itens.map(i => ({
            produtoId: i.produtoId,
            quantidade: i.quantidade,
            precoUnitario: i.precoUnitario
          })))} />

          <div className="row g-2 align-items-end mb-3">
            <div className="col">
              <label className="form-label">Produto</label>
              <select
                className="form-select"
                value={produtoSelecionado}
                onChange={(e) => setProdutoSelecionado(e.target.value)}
              >
                <option value="">Selecione...</option>
                {produtos.map((p: any) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.nome} — {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.precoUnitario)}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto" style={{ width: '120px' }}>
              <label className="form-label">Qtd</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value ? Number(e.target.value) : '')}
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-secondary" onClick={handleAdicionarItem}>
                Adicionar
              </button>
            </div>
          </div>

          {itens.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-sm table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Produto</th>
                    <th className="text-end">Qtd</th>
                    <th className="text-end">Preço Unit.</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center">Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.produtoNome}</td>
                      <td className="text-end">{item.quantidade}</td>
                      <td className="text-end">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario)}</td>
                      <td className="text-end">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.quantidade * item.precoUnitario)}</td>
                      <td className="text-center">
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoverItem(idx)}>
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-semibold">
                  <tr>
                    <td colSpan={3} className="text-end">Total:</td>
                    <td className="text-end">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-muted fst-italic mb-0">Nenhum item adicionado.</p>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <Link href="/orcamentos" className="btn btn-secondary">Cancelar</Link>
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
