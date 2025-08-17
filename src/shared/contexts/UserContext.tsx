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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
    } else if (!["/auth/login", "/auth/register"].includes(router.pathname)) {
      router.push("/auth/login");
    }
  }, []); // <- dependência vazia

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
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
