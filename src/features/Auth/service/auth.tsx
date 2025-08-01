import { errorToast } from "@/shared/utils/toasts";
import axios from "axios";

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
    console.error("Failed to login: " + error.message);
  }
}

export async function registerService(
  login: string,
  password: string,
  confirmPassword: string
) {
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
      confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to login: " + error.message);
  }
}
