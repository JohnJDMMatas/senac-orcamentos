"use client";

import { useActionState, useEffect, useRef } from "react";
import { alterarSenha } from "@/app/(system)/usuario/actions";

export default function FormSenha() {
  const [state, action, isPending] = useActionState(alterarSenha, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={action}>
      {state?.success && (
        <div className="alert alert-success">{state.message}</div>
      )}
      {state?.error && (
        <div className="alert alert-danger">{state.error}</div>
      )}

      <div className="mb-3">
        <label htmlFor="senhaAtual" className="form-label">Senha Atual</label>
        <input type="password" id="senhaAtual" name="senhaAtual" className="form-control" required />
      </div>

      <div className="mb-3">
        <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
        <input type="password" id="novaSenha" name="novaSenha" className="form-control" required />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmacaoSenha" className="form-label">Confirmar Nova Senha</label>
        <input type="password" id="confirmacaoSenha" name="confirmacaoSenha" className="form-control" required />
      </div>

      <button type="submit" disabled={isPending} className="btn btn-warning">
        {isPending ? "Alterando..." : "Alterar Senha"}
      </button>
    </form>
  );
}
