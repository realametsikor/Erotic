"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  login as identityLogin,
  logout as identityLogout,
  getUser,
  handleAuthCallback,
  AuthError,
} from "@netlify/identity";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  clearError: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    async function init() {
      try {
        // Handle any auth callbacks (OAuth, email confirmation, recovery)
        await handleAuthCallback();
      } catch {
        // No callback to handle — normal page load
      }

      try {
        const currentUser = await getUser();
        if (currentUser?.email) {
          setUser({
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name ?? undefined,
          });
        }
      } catch {
        // Not authenticated
      }
      setLoading(false);
    }
    init();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const loggedInUser = await identityLogin(email, password);
      setUser({
        id: loggedInUser.id,
        email: loggedInUser.email ?? email,
        name: loggedInUser.name ?? undefined,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.status) {
          case 401:
            setError("Invalid email or password.");
            break;
          case 403:
            setError("Login is not allowed.");
            break;
          case 422:
            setError("Invalid input. Please check your email and password.");
            break;
          default:
            setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await identityLogout();
    } catch {
      // Logout may fail if session already expired
    }
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}
