import { AuthComponent } from "..";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { useAuth } from "../../modelView/useAuth";

export function RegisterComponent() {
  const {
    handleRegister,
    loadingSendRequestRegister,
    userNameRegister,
    setUserNameRegister,
    passwordRegister,
    setPasswordRegister,
    confirmPassword,
    setConfirmPassword,
    full_name,
    setFull_Name,
    email,
    setEmail,
    errorRegister,
  } = useAuth();
  return (
    <AuthComponent
      headerTitle="Crie sua conta"
      typeForm="register"
      valueFull_Name={full_name}
      onChangeFull_Name={(e) => setFull_Name(e.target.value)}
      valueEmail={email}
      onChangeEmail={(e) => setEmail(e.target.value)}
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
      error={errorRegister}
      onClickButton={() =>
        handleRegister({
          login: userNameRegister,
          email: email,
          full_name: full_name,
          password: passwordRegister,
          confirmPassword: confirmPassword,
        })
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
