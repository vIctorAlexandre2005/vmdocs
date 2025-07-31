import { AuthComponent } from "..";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { useAuth } from "../../modelView/useAuth";

export function RegisterComponent() {
  const {
    handleRegister,
    loadingSendRequestRegister,
    setLoadingSendRequestRegister,
    userNameRegister,
    setUserNameRegister,
    passwordRegister,
    setPasswordRegister,
    confirmPassword,
    setConfirmPassword,
  } = useAuth();
  return (
    <AuthComponent
      headerTitle="Crie sua conta"
      labelNameUser="Nome de usuário"
      placeholderNameUser="Digite seu nome de usuário"
      valueNameUser={userNameRegister}
      onChangeNameUser={(e) => setUserNameRegister(e.target.value)}
      valuePassword={passwordRegister}
      onChangePassword={(e) => setPasswordRegister(e.target.value)}
      valueConfirmPassword={confirmPassword}
      onChangeConfirmPassword={(e) => setConfirmPassword(e.target.value)}
      labelPassword="Senha"
      placeholderPassword="Digite sua senha"
      labelConfirmPassword="Confirme sua senha"
      placeholderConfirmPassword="Confirme sua senha"
      textButton="Cadastrar"
      onClickButton={() =>
        handleRegister(userNameRegister, passwordRegister, confirmPassword)
      }
      footerText="Já possui uma conta?"
      footerLinkText="Clique aqui para entrar"
      footerLink="/auth/login"
      loaderIconButton={<ClipLoader size={20} color="#fff" />}
      disabledButton={loadingSendRequestRegister}
      loadingButton={loadingSendRequestRegister}
    />
  );
}
