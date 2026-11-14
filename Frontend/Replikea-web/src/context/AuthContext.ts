import { createContext } from "react";

export interface AuthUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);