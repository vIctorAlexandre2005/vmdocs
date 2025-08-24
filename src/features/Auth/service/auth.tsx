import { errorToast } from "@/shared/utils/toasts";
import axios from "axios";
import { DataRegisterProps } from "../modelView/useAuth";

export async function loginService(login: string, password: string) {
  if (login.trim() === "" || password.trim() === "") {
    errorToast("Preencha todos os campos!");
    return null;
  };
  try {
    const response = await axios.post("/api/login", {
      login: login,
      password: password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to login: " + error.message);
  }
}

export async function registerService({
  login,
  full_name,
  email,
  password,
  confirmPassword,
}: DataRegisterProps) {
  if (password.trim() !== confirmPassword.trim()) {
    errorToast("Senhas não coincidem!");
    return null;
  }

  if (
    login.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === ""
  ) {
    errorToast("Preencha todos os campos!");
    return null;
  }

  try {
    const response = await axios.post("/api/register", {
      login: login,
      full_name: full_name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`${error?.response?.data?.error}`);
  }
}

export async function getMyUserService(token: string | null) {
  try {
    const response = await axios.post("/api/getMyUser", {
      token: token
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }}
