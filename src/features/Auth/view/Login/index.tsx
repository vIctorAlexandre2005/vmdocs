import { AuthComponent } from "..";
import { ClipLoader, PacmanLoader } from "react-spinners";

export function LoginComponent() {
  return (
    <AuthComponent
        headerTitle="Entre na sua conta"
        
        labelNameUser="Nome de usuário"
        placeholderNameUser="Digite seu nome de usuário"
        valueNameUser=""
        
        valuePassword=""
        labelPassword="Senha"
        placeholderPassword="Digite sua senha"
        
        textButton="Entrar"
        onClickButton={() => console.log("Cadastrar")}
        
        footerText="Não possui uma conta?"
        footerLinkText="Registre-se"
        footerLink="/auth/register"

        loaderIconButton={<ClipLoader size={20} color="#fff" />}
        disabledButton={false}
        loadingButton={false}
    />
  );
}
