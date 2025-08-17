import { useUserContext } from "@/shared/contexts/UserContext";
import {
  getMyUserService,
  loginService,
  registerService,
} from "../service/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { errorToast, successToast } from "@/shared/utils/toasts";

export function useAuth() {
  const { user, setUser, token, setToken } = useUserContext();
  const router = useRouter();
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [loadingSendRequestLogin, setLoadingSendRequestLogin] = useState(false);

  const [userNameRegister, setUserNameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loadingSendRequestRegister, setLoadingSendRequestRegister] =
    useState(false);

  const [loadUser, setLoadUser] = useState(false);
  const [errorLoadingUser, setErrorLoadingUser] = useState(false);

  async function handleLogin(login: string, password: string) {
    setLoadingSendRequestLogin(true);
    if (login.trim() === "" || password.trim() === "") {
      errorToast("Preencha todos os campos!");
      setLoadingSendRequestLogin(false);
      return null;
    }
    try {
      const response = await loginService(login, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", response?.tokenJWT); // se for string
      }
      setToken(response?.tokenJWT);
      successToast("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      errorToast("Usuário ou senha incorretos!");
    } finally {
      setPasswordLogin("");
      setLoadingSendRequestLogin(false);
    }
  }

  async function handleRegister(
    login: string,
    password: string,
    confirmPassword: string
  ) {
    if (
      login.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      errorToast("Preencha todos os campos!");
      setLoadingSendRequestLogin(false);
      return null;
    }
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

  async function getUserMe() {
    setLoadUser(true);
    try {
      const response = await getMyUserService(token);
      setUser(response);
    } catch (error) {
      setErrorLoadingUser(true);
    } finally {
      setLoadUser(false);
    }
  }

  useEffect(() => {
    getUserMe();
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/auth/login");
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

    handleLogout,

    loadUser,
    setLoadUser,
    getUserMe,
    errorLoadingUser,
    token
  };
}
