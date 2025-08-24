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

  loadUser: boolean;
  setLoadUser: Dispatch<React.SetStateAction<boolean>>;
  errorLoadingUser: boolean;
  setErrorLoadingUser: Dispatch<React.SetStateAction<boolean>>;
  getUserMe: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadUser, setLoadUser] = useState(false);
  const [errorLoadingUser, setErrorLoadingUser] = useState(false);


  const router = useRouter();

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
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
      getUserMe();
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
        loadUser,
        setLoadUser,
        getUserMe,
        errorLoadingUser,
        setErrorLoadingUser
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
