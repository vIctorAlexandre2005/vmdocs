import { createContext, Dispatch, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: { tokenJWT: string } | null;
  setUser: Dispatch<React.SetStateAction<{ tokenJWT: string } | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ tokenJWT: string } | null>(null);

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
