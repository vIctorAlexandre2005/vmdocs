import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: string | null;
  setUser: Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUser(token);
    } else if (!["/auth/login", "/auth/register"].includes(router.pathname)) {
      router.push("/auth/login");
    }
  }, []); // <- dependência vazia

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
