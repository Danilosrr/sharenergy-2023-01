import { createContext, ReactNode, useState } from "react";

interface IAuthContext {
  token: string | null;
  signIn: (token: string, remember: boolean) => void;
  signOut: () => void;
}

const LOCAL_STORAGE_KEY = "SHARENERGY_TOKEN";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(persistedToken);

  function signIn(token: string, remember: boolean) {
    setToken(token);
    if (remember) localStorage.setItem(LOCAL_STORAGE_KEY, token);
    else localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  function signOut() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
