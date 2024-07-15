'use client'
import {  useState, ReactNode } from "react";
import { createContext } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
  }
  
  const initialAuthContext: AuthContextType = {
    token: null,
    setToken: () => {},
  };

export const AuthContext = createContext(null)

const AuthProvider = ({children}:{children: ReactNode} ) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token,setToken}}>
            {children}

        </AuthContext.Provider>
    )


}

export default AuthProvider
