"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/config";
import { authService, type LoginResponse } from "@/services/auth.service";
import type { LoginCredentials } from "@/types/vendor.types";

/**
 * Hook for login mutation
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      credentials: LoginCredentials
    ): Promise<LoginResponse> => {
      const response = await authService.login(credentials);
      if (!response.success) {
        throw new Error(response.message || response.error || "Login failed");
      }
      if (!response.data) {
        throw new Error("Invalid response from server");
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.USER], data.user);
      toast.success("Login successful");
      router.push("/backoffice/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/backoffice/login");
    },
    onError: (error: Error) => {
      // Still clear state even on error
      queryClient.clear();
      authService.logout();
      router.push("/backoffice/login");
      console.error("Logout error:", error);
    },
  });
}

/**
 * Hook for forgot password mutation
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await authService.forgotPassword(email);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to send reset email"
        );
      }
      return true;
    },
    onSuccess: () => {
      toast.success("Password reset email sent. Check your inbox.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });
}

/**
 * Hook for reset password mutation
 */
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      token,
      new_password,
    }: {
      token: string;
      new_password: string;
    }) => {
      const response = await authService.resetPassword(token, new_password);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to reset password"
        );
      }
      return true;
    },
    onSuccess: () => {
      toast.success("Password reset successful. Please login.");
      router.push("/backoffice/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
}

/**
 * Hook for updating user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      first_name?: string;
      last_name?: string;
      phone?: string;
    }) => {
      const response = await authService.updateProfile(data);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to update profile"
        );
      }
      return response.data?.user;
    },
    onSuccess: (user) => {
      if (user) {
        queryClient.setQueryData([QUERY_KEYS.USER], user);
      }
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}

/**
 * Hook for changing password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const response = await authService.changePassword(
        currentPassword,
        newPassword
      );
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to change password"
        );
      }
      return true;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
}

// Re-export useAuth from context for convenience
export {
  useAuth,
  useRequireAuth,
  useRedirectAuthenticated,
} from "@/contexts/auth-context";
