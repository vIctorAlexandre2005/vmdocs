import { useUserContext } from "@/shared/contexts/UserContext";
import { loginService } from "../service/auth";
import { useState } from "react";

export function useAuth() {
  const { user, setUser } = useUserContext();
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");

  async function handleLogin(login: string, password: string) {
    try {
      const response = await loginService(login, password);
      console.log("Login response HANDLE LOGIN:", response);
      setUser(response);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return {
    user,
    setUser,
    handleLogin,

    userNameLogin,
    setUserNameLogin,
    passwordLogin,
    setPasswordLogin
  };
}
