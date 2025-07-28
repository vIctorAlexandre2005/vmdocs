import { createContext, Dispatch, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: any;
  setUser: Dispatch<React.SetStateAction<any>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

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
