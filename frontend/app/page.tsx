import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white">
      <div className="text-center p-5 rounded shadow bg-secondary bg-opacity-10" style={{ maxWidth: '600px' }}>
        <h1 className="display-4 fw-bold mb-4">Bem-vindo ao SENAC Orçamentos</h1>
        <p className="lead mb-5">
          O sistema completo para gestão de orçamentos, produtos e clientes da sua empresa.
        </p>
        <Link href="/login" className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-semibold shadow-sm">
          Acessar o Sistema
        </Link>
      </div>
    </div>
  );
}
