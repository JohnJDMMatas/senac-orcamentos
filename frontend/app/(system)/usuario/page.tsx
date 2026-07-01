import { carregarUsuario } from "./actions";
import FormPerfil from "@/components/Usuario/FormPerfil";
import FormSenha from "@/components/Usuario/FormSenha";

export const metadata = {
  title: "Perfil do Usuário",
};

export default async function UsuarioPage() {
  const usuario = await carregarUsuario();

  return (
    <div>
      <h1 className="mb-4">Perfil do Usuário</h1>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold">Dados da Conta</div>
            <div className="card-body">
              <FormPerfil usuario={usuario} />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold">Alterar Senha</div>
            <div className="card-body">
              <FormSenha />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
