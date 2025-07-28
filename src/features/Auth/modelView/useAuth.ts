import { useUserContext } from "@/shared/contexts/UserContext";
import { loginService, registerService } from "../service/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { errorToast, successToast } from "@/shared/utils/toasts";

export function useAuth() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [loadingSendRequestLogin, setLoadingSendRequestLogin] = useState(false);

  const [userNameRegister, setUserNameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loadingSendRequestRegister, setLoadingSendRequestRegister] =
    useState(false);

  async function handleLogin(login: string, password: string) {
    setLoadingSendRequestLogin(true);
    try {
      const response = await loginService(login, password);
      setUser(response);
      successToast("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      errorToast("Login não realizado!");
      console.error("Failed to login:", error);
    } finally {
      setUserNameLogin("");
      setPasswordLogin("");
      setLoadingSendRequestLogin(false);
    }
  }

  async function handleRegister(
    login: string,
    password: string,
    confirmPassword: string
  ) {
    setLoadingSendRequestRegister(true);
    try {
      await registerService(
        login.trim(),
        password.trim(),
        confirmPassword.trim()
      );

      successToast("Registro realizado com sucesso!");
      router.push("/auth/login");
    } catch (error) {
      errorToast("Registro não realizado!");
      console.error("Failed to login:", error);
    } finally {
      setUserNameRegister("");
      setPasswordRegister("");
      setConfirmPassword("");
      setLoadingSendRequestRegister(false);
    }
  }

  return {
    user,
    setUser,

    // login
    userNameLogin,
    setUserNameLogin,
    passwordLogin,
    setPasswordLogin,
    loadingSendRequestLogin,
    setLoadingSendRequestLogin,
    handleLogin,

    // register
    userNameRegister,
    setUserNameRegister,
    passwordRegister,
    setPasswordRegister,
    confirmPassword,
    setConfirmPassword,
    loadingSendRequestRegister,
    setLoadingSendRequestRegister,
    handleRegister,
  };
}
