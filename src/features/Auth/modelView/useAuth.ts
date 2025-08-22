import { useUserContext } from "@/shared/contexts/UserContext";
import {
  getMyUserService,
  loginService,
  registerService,
} from "../service/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { errorToast, successToast } from "@/shared/utils/toasts";

export interface DataRegisterProps {
  login: string;
  email: string;
  full_name: string;
  password: string;
  confirmPassword: string;
}

export function useAuth() {
  const { user, setUser, token, setToken, loadUser, setLoadUser } =
    useUserContext();
  const router = useRouter();
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [loadingSendRequestLogin, setLoadingSendRequestLogin] = useState(false);

  const [full_name, setFull_Name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorRegister, setErrorRegister] = useState<string>("");

  const [userNameRegister, setUserNameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loadingSendRequestRegister, setLoadingSendRequestRegister] =
    useState(false);

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

  function validRegister(
    login: string,
    password: string,
    confirmPassword: string
  ) {
    const somethingEmpty =
      login.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "";
    if (somethingEmpty) {
      errorToast("Preencha todos os campos!");
      setLoadingSendRequestLogin(false);
      return null;
    }

    if (password.trim() !== confirmPassword.trim()) {
      errorToast("Senhas não coincidem!");
      return null;
    }
  }

  async function handleRegister({
    login,
    email,
    full_name,
    password,
    confirmPassword,
  }: DataRegisterProps) {
    const validationRegister = validRegister(login, password, confirmPassword);
    if (validationRegister === null) {
      return;
    }
    setLoadingSendRequestRegister(true);
    try {
      const data = {
        login: login,
        email: email,
        full_name: full_name,
        password: password,
        confirmPassword: confirmPassword,
      };
      await registerService(data);

      successToast("Registro realizado com sucesso!");
      router.push("/auth/login");
    } catch (error: any) {
      setErrorRegister(`${error}`);
      console.error(error);
      errorToast(error);
    } finally {
      /* setFull_Name("");
      setEmail("");
      setUserNameRegister("");
      setPasswordRegister("");
      setConfirmPassword(""); */
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

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/auth/login");
    errorToast("Você foi desconectado!");
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
    token,
    setToken,
    full_name,
    setFull_Name,
    email,
    errorRegister,
    setEmail,
  };
}
