import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthUser } from "./AuthContext";
import { refreshSession, getSession, logout as logoutRequest} from "../services/authService"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  const login = useCallback((token: string, userData: AuthUser) => {
    setAccessToken(token);
    setUser(userData);
    setIsLoading(false);
  }, []);

  async function logout() {
    try {
      await logoutRequest();
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
      const refreshData = await refreshSession();

      //2. Validate the new access token and retrieve user details
      const sessionData = await getSession(refreshData.accessToken);

      login(refreshData.accessToken, {
        userId: sessionData.userId,
        firstName: sessionData.firstName,
        lastName: sessionData.lastName,
        email: sessionData.email,
        role: sessionData.role,
      });
    } catch (error) {
      console.error("Session restore failed: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [login]);

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
