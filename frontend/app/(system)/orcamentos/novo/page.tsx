import { listarClientes, listarProdutos } from '../actions';
import FormOrcamento from '@/components/Orcamentos/FormOrcamento';

export default async function NovoOrcamentoPage() {
  const clientes = await listarClientes();
  const produtos = await listarProdutos();

  return (
    <div>
      <h1 className="mb-4">Novo Orçamento</h1>
      <FormOrcamento clientes={clientes} produtos={produtos} />
    </div>
  );
}
