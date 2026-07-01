import React from 'react';
import { logout } from '@/app/(auth)/logout/actions';

export default function Header() {
  return (
    <header className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">
        SENAC ORÇAMENTOS
      </a>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <form action={logout} className="d-inline">
            <button type="submit" className="nav-link px-3 btn btn-link text-white border-0">
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
