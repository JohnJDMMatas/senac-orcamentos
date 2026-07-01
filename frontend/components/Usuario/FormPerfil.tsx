"use client";

import { useActionState } from "react";
import { atualizarPerfil } from "@/app/(system)/usuario/actions";

export default function FormPerfil({ usuario }: { usuario: any }) {
  const [state, action, isPending] = useActionState(atualizarPerfil, null);

  const formatarData = (data: string) =>
    data ? new Date(data).toLocaleString('pt-BR') : '-';

  return (
    <div>
      {/* Informações somente leitura */}
      <div className="table-responsive mb-4">
        <table className="table table-sm table-bordered">
          <tbody>
            <tr>
              <th className="bg-light w-25">ID</th>
              <td>{usuario?.id ?? '-'}</td>
            </tr>
            <tr>
              <th className="bg-light">Perfil</th>
              <td><span className="badge bg-secondary">{usuario?.perfil ?? '-'}</span></td>
            </tr>
            <tr>
              <th className="bg-light">Status</th>
              <td>
                {usuario?.ativo
                  ? <span className="badge bg-success">Ativo</span>
                  : <span className="badge bg-danger">Inativo</span>}
              </td>
            </tr>
            <tr>
              <th className="bg-light">Criado em</th>
              <td>{formatarData(usuario?.criadoEm)}</td>
            </tr>
            <tr>
              <th className="bg-light">Atualizado em</th>
              <td>{formatarData(usuario?.atualizadoEm)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Formulário editável */}
      <form action={action}>
        {state?.success && (
          <div className="alert alert-success">{state.message}</div>
        )}
        {state?.error && (
          <div className="alert alert-danger">{state.error}</div>
        )}

        <div className="mb-3">
          <label htmlFor="nomeCompleto" className="form-label">Nome Completo</label>
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            className="form-control"
            defaultValue={usuario?.nomeCompleto ?? ""}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            defaultValue={usuario?.email ?? ""}
            required
          />
        </div>

        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? "Salvando..." : "Salvar Perfil"}
        </button>
      </form>
    </div>
  );
}
