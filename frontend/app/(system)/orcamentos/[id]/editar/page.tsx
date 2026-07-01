import { listarClientes, listarProdutos, obterOrcamento } from '../../actions';
import FormOrcamento from '@/components/Orcamentos/FormOrcamento';
import { notFound } from 'next/navigation';

export default async function EditarOrcamentoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [orcamento, clientes, produtos] = await Promise.all([
    obterOrcamento(id),
    listarClientes(),
    listarProdutos()
  ]);

  if (!orcamento) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-4">Editar Orçamento</h1>
      <FormOrcamento orcamento={orcamento} clientes={clientes} produtos={produtos} />
    </div>
  );
}
