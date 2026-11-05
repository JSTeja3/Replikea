import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  function login(token: string, userData: AuthUser) {
    setAccessToken(token);
    setUser(userData);
    setIsLoading(false);
  }

  async function logout() {
    try {
      const response = await fetch("http://localhost:5031/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }

  const initializeAuth = useCallback(async () => {
    try {
      //1. Request new access token using the refresh token
      const refreshResponse = await fetch(
        "http://localhost:5031/api/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!refreshResponse.ok) {
        return;
      }

      const refreshData = await refreshResponse.json();

      //2. Validate the new access token and retrieve user details
      const sessionResponse = await fetch(
        "http://localhost:5031/api/auth/session",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshData.accessToken}`,
          },
        },
      );

      if (!sessionResponse.ok) {
        return;
      }

      const sessionData = await sessionResponse.json();

      login(refreshData.accessToken, sessionData);
    } catch (error) {
      console.error("Session restore failed: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = accessToken !== null && user !== null;

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
