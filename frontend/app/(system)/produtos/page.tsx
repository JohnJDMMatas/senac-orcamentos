import Link from 'next/link';
import { listarProdutos } from './actions';
import TabelaProdutos from '@/components/Produtos/TabelaProdutos';

export default async function ProdutosPage() {
  const produtos = await listarProdutos();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Produtos</h1>
        <Link href="/produtos/novo" className="btn btn-primary">
          Novo Produto
        </Link>
      </div>
      
      <TabelaProdutos produtos={produtos} />
    </div>
  );
}
