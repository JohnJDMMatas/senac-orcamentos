import Link from 'next/link';
import { listarClientes } from './actions';
import TabelaClientes from '@/components/Clientes/TabelaClientes';

export default async function ClientesPage() {
  const clientes = await listarClientes();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Clientes</h1>
        <Link href="/clientes/novo" className="btn btn-primary">
          Novo Cliente
        </Link>
      </div>
      
      <TabelaClientes clientes={clientes} />
    </div>
  );
}
