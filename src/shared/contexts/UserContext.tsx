import { getMyUserService } from "@/features/Auth/service/auth";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserData {
  userName: string;
}

type UserContextType = {
  user: UserData | null;
  setUser: Dispatch<React.SetStateAction<UserData | null>>;

  token: string | null;
  setToken: Dispatch<React.SetStateAction<string | null>>;

  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;

  error: boolean;
  setError: Dispatch<React.SetStateAction<boolean>>;

  getUserMe: (token: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <- começa carregando
  const [error, setError] = useState(false);

  const router = useRouter();

  async function getUserMe(token: string) {
    try {
      const response = await getMyUserService(token);
      setUser(response);
    } catch (error) {
      setError(true);
      setUser(null);
      router.push("/auth/login");
    } finally {
      setLoading(false); // só libera aqui
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      getUserMe(storedToken);
    } else {
      // sem token e não está nas rotas públicas → manda pra login
      if (!["/auth/login", "/auth/register"].includes(router.pathname)) {
        router.push("/auth/login");
      }
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
        error,
        setError,
        getUserMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserContextProvider");
  return context;
}
