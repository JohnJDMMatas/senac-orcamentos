import FormProduto from '@/components/Produtos/FormProduto';
import { obterProduto } from '../../actions';

export default async function EditarProdutoPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Resolve params p/ funcionar tanto no Next.js 14 quanto no 15 (onde params vira Promise)
  const resolvedParams = await params;
  const produto = await obterProduto(resolvedParams.id);

  return (
    <div>
      <h1 className="mb-4">Editar Produto</h1>
      <FormProduto produto={produto} />
    </div>
  );
}
