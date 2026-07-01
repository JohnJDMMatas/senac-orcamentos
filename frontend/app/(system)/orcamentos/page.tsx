import Link from 'next/link';
import { listarOrcamentos } from './actions';
import TabelaOrcamentos from '@/components/Orcamentos/TabelaOrcamentos';

export default async function OrcamentosPage() {
  const orcamentos = await listarOrcamentos();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Orçamentos</h1>
        <Link href="/orcamentos/novo" className="btn btn-primary">
          Novo Orçamento
        </Link>
      </div>
      <TabelaOrcamentos orcamentos={orcamentos} />
    </div>
  );
}
