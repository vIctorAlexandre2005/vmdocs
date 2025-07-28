import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { IoLogIn } from "react-icons/io5";

export function RegisterComponent() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="fixed top-1/2 left-1/2 transform flex flex-col gap-12 -translate-x-1/2 -translate-y-1/2">
        <header className="flex justify-center items-center flex-col gap-2">
          <img src={"/logo-vmdocs.png"} height={150} width={150} />
          <h1 className="text-3xl font-bold text-slate-800">
            Entre na sua conta
          </h1>
        </header>

        <div className="flex justify-center items-center flex-col gap-6">
          <div className="flex flex-col gap-4">
            <InputComponent
              label="Nome de usuário"
              classNameLabel="text-slate-800 text-sm"
              placeholder="Digite seu nome de usuário"
              className="bg-transparent p-2 text-slate-900 text-sm w-md"
            />
            <InputComponent
              label="Senha"
              classNameLabel="text-slate-800 text-sm"
              placeholder="Digite sua senha"
              type="password"
              className="bg-transparent p-2 text-slate-900 text-sm w-md"
            />

            <InputComponent
              label="Confirme sua senha"
              classNameLabel="text-slate-800 text-sm"
              placeholder="Confirme sua senha"
              type="password"
              className="bg-transparent p-2 text-slate-900 text-sm w-md"
            />
          </div>

          <ButtonComponent
            text="Registrar"
            iconRight={<IoLogIn size={20} />}
            className="w-full text-base font-semibold text-gray-100 rounded-full bg-indigo-600"
          />
          <p className="text-sm font-bold text-slate-800">
            Já possui uma conta?{" "}
            <a href="/auth/register" className="text-indigo-500 cursor-pointer">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
