import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/config";
import type { BackofficeUser, ApiResponse } from "@/types/vendor.types";

// User types
export type UserRole = "super_admin" | "admin" | "agent";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserListParams extends UserFilters {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  role?: UserRole;
  phone?: string;
  status?: UserStatus;
}

export interface PaginatedUsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Helper to check if response is successful
 */
const isSuccessResponse = <T>(response: ApiResponse<T>): boolean => {
  return response.status === "success";
};

/**
 * Helper to normalize response with success boolean
 */
const normalizeResponse = <T>(response: ApiResponse<T>): ApiResponse<T> => {
  return {
    ...response,
    success: response.status === "success",
  };
};

export const userService = {
  /**
   * Get paginated list of users with optional filters
   */
  getAll: async (
    params?: UserListParams
  ): Promise<ApiResponse<PaginatedUsersResponse>> => {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_ENDPOINTS.USERS}?${queryString}`
      : API_ENDPOINTS.USERS;

    const response = await apiClient.get<ApiResponse<PaginatedUsersResponse>>(
      url
    );
    return normalizeResponse(response);
  },

  /**
   * Get a single user by ID
   */
  getById: async (id: string): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USER_BY_ID(id)
    );
    return normalizeResponse(response);
  },

  /**
   * Create a new user
   */
  create: async (
    data: CreateUserData
  ): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.post<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USERS,
      data
    );
    return normalizeResponse(response);
  },

  /**
   * Update a user
   */
  update: async (
    id: string,
    data: UpdateUserData
  ): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.patch<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USER_BY_ID(id),
      data
    );
    return normalizeResponse(response);
  },

  /**
   * Deactivate a user
   */
  deactivate: async (id: string): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.patch<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USER_DEACTIVATE(id),
      {}
    );
    return normalizeResponse(response);
  },

  /**
   * Activate a user
   */
  activate: async (id: string): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.patch<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USER_ACTIVATE(id),
      {}
    );
    return normalizeResponse(response);
  },

  /**
   * Delete a user (super_admin only)
   */
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.USER_BY_ID(id)
    );
    return normalizeResponse(response);
  },
};

export default userService;
