import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={{ minHeight: 'calc(100vh - 48px)' }}>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/dashboard" className="nav-link text-dark">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/produtos" className="nav-link text-dark">
              Produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/clientes" className="nav-link text-dark">
              Clientes
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/orcamentos" className="nav-link text-dark">
              Orçamentos
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/usuario" className="nav-link text-dark">
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
