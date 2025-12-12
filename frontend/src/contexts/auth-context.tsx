"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { authService, type LoginResponse } from "@/services/auth.service";
import type { BackofficeUser, LoginCredentials } from "@/types/vendor.types";

interface AuthContextValue {
  user: BackofficeUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<BackofficeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize auth state from localStorage on mount (client-side only)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for cached user first
        const cachedUser = authService.getCachedUser();

        if (cachedUser && authService.isAuthenticated()) {
          setUser(cachedUser);

          // Optionally refresh user data from API in background
          try {
            const response = await authService.getMe();
            if (response.success && response.data?.user) {
              setUser(response.data.user);
            }
          } catch {
            // Token might be expired, but we have cached user
            // Let the API client handle token refresh
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear any invalid state
        authService.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
        setIsHydrated(true);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResponse> => {
      setIsLoading(true);
      try {
        const response = await authService.login(credentials);

        if (response.success && response.data) {
          setUser(response.data.user);
          return response.data;
        }

        throw new Error(response.message || response.error || "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      router.push("/backoffice/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (!authService.isAuthenticated()) return;

    try {
      const response = await authService.getMe();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, []);

  const isAuthenticated = useMemo(() => {
    return !!user && authService.isAuthenticated();
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      isHydrated,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading, isAuthenticated, isHydrated, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Hook for protecting routes
export function useRequireAuth(redirectTo: string = "/admin/login") {
  const { isAuthenticated, isHydrated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isHydrated, isLoading, redirectTo, router]);

  return { isAuthenticated, isHydrated, isLoading };
}

// Hook for redirecting authenticated users (e.g., from login page)
export function useRedirectAuthenticated(
  redirectTo: string = "/admin/dashboard"
) {
  const { isAuthenticated, isHydrated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isHydrated, isLoading, redirectTo, router]);

  return { isAuthenticated, isHydrated, isLoading };
}

export default AuthContext;
