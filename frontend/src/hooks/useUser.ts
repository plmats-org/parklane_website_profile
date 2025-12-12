"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/config";
import {
  userService,
  type UserListParams,
  type CreateUserData,
  type UpdateUserData,
  type User,
  type PaginatedUsersResponse,
} from "@/services/user.service";

// ============================================================================
// Query Hooks (GET requests)
// ============================================================================

/**
 * Hook to fetch paginated users list with filters
 */
export function useUsers(params?: UserListParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, params],
    queryFn: async () => {
      const response = await userService.getAll(params);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to fetch users"
        );
      }
      return response.data as PaginatedUsersResponse;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to fetch a single user by ID
 */
export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_DETAIL, id],
    queryFn: async () => {
      if (!id) throw new Error("User ID is required");
      const response = await userService.getById(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to fetch user"
        );
      }
      return response.data?.user as User;
    },
    enabled: !!id,
  });
}

// ============================================================================
// Mutation Hooks (POST, PATCH, DELETE requests)
// ============================================================================

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserData) => {
      const response = await userService.create(data);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to create user"
        );
      }
      return response.data?.user as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      toast.success("User created successfully. Credentials sent via email.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create user");
    },
  });
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserData }) => {
      const response = await userService.update(id, data);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to update user"
        );
      }
      return response.data?.user as User;
    },
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_DETAIL, user.id || user._id],
      });
      toast.success("User updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
}

/**
 * Hook to deactivate a user
 */
export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await userService.deactivate(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to deactivate user"
        );
      }
      return response.data?.user as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      toast.success("User deactivated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to deactivate user");
    },
  });
}

/**
 * Hook to activate a user
 */
export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await userService.activate(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to activate user"
        );
      }
      return response.data?.user as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      toast.success("User activated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to activate user");
    },
  });
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await userService.delete(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to delete user"
        );
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      toast.success("User deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
}
