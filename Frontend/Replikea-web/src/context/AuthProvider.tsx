import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(token: string, userData: AuthUser) {
    setAccessToken(token);
    setUser(userData);
  }

  function logout() {
    setAccessToken(null);
    setUser(null);
  }

  const isAuthenticated = accessToken !== null && user !== null;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}