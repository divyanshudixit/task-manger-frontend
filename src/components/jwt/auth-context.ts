// src/context/jwt/auth-context.ts
import { createContext, Context } from 'react';

// Define the shape of your context value
export interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithRedirect: (options?: any) => Promise<void>;
  loginWithPopup: (options?: any) => Promise<void>;
  loading: boolean;
  authenticated: boolean;
}

// Provide a default value that matches the shape of AuthContextType
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  loginWithRedirect: async () => {},
  loginWithPopup: async () => {},
  loading: false,
  authenticated: false,
};

// Create the context with the specified type
export const AuthContext: Context<AuthContextType> = createContext<AuthContextType>(defaultAuthContext);
