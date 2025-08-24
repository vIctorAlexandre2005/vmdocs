import { AuthComponent } from "..";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { useAuth } from "../../modelView/useAuth";

export function LoginComponent() {
  const {
    userNameLogin,
    passwordLogin,
    setUserNameLogin,
    setPasswordLogin,
    handleLogin,
    loadingSendRequestLogin,
  } = useAuth();
  return (
    <AuthComponent
      headerTitle="Entre na sua conta"
      typeForm="login"
      labelNameUser="Nome de usuário"
      placeholderNameUser="Digite seu nome de usuário"
      valueNameUser={userNameLogin}
      onChangeNameUser={(e) => setUserNameLogin(e.target.value)}
      onChangePassword={(e) => setPasswordLogin(e.target.value)}
      valuePassword={passwordLogin}
      labelPassword="Senha"
      placeholderPassword="Digite sua senha"
      textButton="Entrar"
      onClickButton={() => handleLogin(userNameLogin, passwordLogin)}
      footerText="Não possui uma conta?"
      footerLinkText="Registre-se"
      footerLink="/auth/register"
      loaderIconButton={<ClipLoader size={20} color="#fff" />}
      disabledButton={loadingSendRequestLogin}
      loadingButton={loadingSendRequestLogin}
    />
  );
}
