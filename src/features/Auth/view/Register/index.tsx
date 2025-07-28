import { AuthComponent } from "..";
import { ClipLoader, PacmanLoader } from "react-spinners";

export function RegisterComponent() {
  return (
    <AuthComponent
        headerTitle="Crie sua conta"
        
        labelNameUser="Nome de usuário"
        placeholderNameUser="Digite seu nome de usuário"
        valueNameUser=""
        
        valuePassword=""
        labelPassword="Senha"
        placeholderPassword="Digite sua senha"
        
        labelConfirmPassword="Confirme sua senha"
        placeholderConfirmPassword="Confirme sua senha"
        valueConfirmPassword=""
        
        textButton="Cadastrar"
        onClickButton={() => console.log("Cadastrar")}
        
        footerText="Já possui uma conta?"
        footerLinkText="Clique aqui para entrar"
        footerLink="/auth/login"

        loaderIconButton={<ClipLoader size={20} color="#fff" />}
        disabledButton={false}
        loadingButton={false}
    />
  );
}
