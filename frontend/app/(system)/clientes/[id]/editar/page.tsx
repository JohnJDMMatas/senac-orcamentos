import FormCliente from '@/components/Clientes/FormCliente';
import { obterCliente } from '../../actions';

export default async function EditarClientePage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Resolve params p/ funcionar tanto no Next.js 14 quanto no 15 (onde params vira Promise)
  const resolvedParams = await params;
  const cliente = await obterCliente(resolvedParams.id);

  return (
    <div>
      <h1 className="mb-4">Editar Cliente</h1>
      <FormCliente cliente={cliente} />
    </div>
  );
}
