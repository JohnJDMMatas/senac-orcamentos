"use server";

import { apiServerFetch } from "@/lib/api-server";
import { revalidatePath } from "next/cache";

export async function carregarUsuario() {
  try {
    const res = await apiServerFetch("/usuarios/atual", {
      method: "GET",
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    return null;
  }
}

export async function atualizarPerfil(prevState: any, formData: FormData) {
  const nomeCompleto = formData.get("nomeCompleto")?.toString();
  const email = formData.get("email")?.toString();

  if (!nomeCompleto || !email) {
    return { error: "Nome e e-mail são obrigatórios.", success: false };
  }

  try {
    const res = await apiServerFetch("/usuarios/atual", {
      method: "PATCH",
      body: JSON.stringify({ nomeCompleto, email }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { error: errorData?.message || "Erro ao atualizar perfil.", success: false };
    }

    revalidatePath("/usuario");
    return { success: true, message: "Perfil atualizado com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return { error: "Erro interno ao atualizar perfil.", success: false };
  }
}

export async function alterarSenha(prevState: any, formData: FormData) {
  const senhaAtual = formData.get("senhaAtual")?.toString();
  const novaSenha = formData.get("novaSenha")?.toString();
  const confirmacaoSenha = formData.get("confirmacaoSenha")?.toString();

  if (!senhaAtual || !novaSenha || !confirmacaoSenha) {
    return { error: "Todos os campos de senha são obrigatórios.", success: false };
  }

  if (novaSenha !== confirmacaoSenha) {
    return { error: "A nova senha e a confirmação não conferem.", success: false };
  }

  try {
    const res = await apiServerFetch("/usuarios/atual/senha", {
      method: "PATCH",
      body: JSON.stringify({ senhaAtual, novaSenha, confirmacaoSenha }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { error: errorData?.message || "Erro ao alterar senha.", success: false };
    }

    return { success: true, message: "Senha alterada com sucesso!" };
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return { error: "Erro interno ao alterar senha.", success: false };
  }
}
