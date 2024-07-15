'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component to provide the context value
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
