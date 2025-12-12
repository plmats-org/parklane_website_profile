import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/config";
import type {
  BackofficeUser,
  ApiResponse,
  LoginCredentials,
} from "@/types/vendor.types";

export interface LoginResponse {
  user: BackofficeUser;
  access_token: string;
  refresh_token: string;
}

/**
 * Helper to check if response is successful
 * Backend uses status: "success" | "error"
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

export const authService = {
  /**
   * Login with email and password
   */
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.LOGIN,
      credentials
    );

    console.log("Raw API response:", JSON.stringify(response, null, 2));
    console.log(
      "Status check:",
      response.status,
      "isSuccess:",
      isSuccessResponse(response)
    );

    // Store tokens and user data on successful login
    if (isSuccessResponse(response) && response.data) {
      if (typeof window !== "undefined") {
        localStorage.setItem("plm_access_token", response.data.access_token);
        localStorage.setItem("plm_refresh_token", response.data.refresh_token);

        // Store user with computed fullName
        const userWithFullName = {
          ...response.data.user,
          fullName: `${response.data.user.first_name} ${response.data.user.last_name}`,
        };
        localStorage.setItem("plm_user", JSON.stringify(userWithFullName));
      }
    }

    return normalizeResponse(response);
  },

  /**
   * Logout and clear all tokens
   */
  logout: async (): Promise<void> => {
    // No logout endpoint in backend, just clear local tokens
    apiClient.clearTokens();
  },

  /**
   * Get current authenticated user from API
   */
  getMe: async (): Promise<ApiResponse<{ user: BackofficeUser }>> => {
    const response = await apiClient.get<ApiResponse<{ user: BackofficeUser }>>(
      API_ENDPOINTS.ME
    );

    // Update cached user data with computed fullName
    if (isSuccessResponse(response) && response.data?.user) {
      if (typeof window !== "undefined") {
        const userWithFullName = {
          ...response.data.user,
          fullName: `${response.data.user.first_name} ${response.data.user.last_name}`,
        };
        localStorage.setItem("plm_user", JSON.stringify(userWithFullName));
      }
    }

    return normalizeResponse(response);
  },

  /**
   * Get cached user from localStorage (client-side only)
   */
  getCachedUser: (): BackofficeUser | null => {
    if (typeof window === "undefined") return null;

    const userStr = localStorage.getItem("plm_user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated (has token)
   */
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("plm_access_token");
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.FORGOT_PASSWORD,
      { email }
    );
    return normalizeResponse(response);
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.RESET_PASSWORD,
      { token, newPassword }
    );
    return normalizeResponse(response);
  },

  /**
   * Change password (authenticated)
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch<ApiResponse<void>>(
      API_ENDPOINTS.CHANGE_PASSWORD,
      { currentPassword, newPassword }
    );
    return normalizeResponse(response);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }): Promise<ApiResponse<{ user: BackofficeUser }>> => {
    const response = await apiClient.patch<
      ApiResponse<{ user: BackofficeUser }>
    >(API_ENDPOINTS.UPDATE_PROFILE, data);

    // Update cached user data
    if (isSuccessResponse(response) && response.data?.user) {
      if (typeof window !== "undefined") {
        const userWithFullName = {
          ...response.data.user,
          fullName: `${response.data.user.first_name} ${response.data.user.last_name}`,
        };
        localStorage.setItem("plm_user", JSON.stringify(userWithFullName));
      }
    }

    return normalizeResponse(response);
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<ApiResponse<{ access_token: string }>> => {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("plm_refresh_token")
        : null;

    if (!refreshToken) {
      return { status: "error", success: false, message: "No refresh token" };
    }

    const response = await apiClient.post<
      ApiResponse<{ access_token: string }>
    >(API_ENDPOINTS.REFRESH, { refresh_token: refreshToken });

    if (isSuccessResponse(response) && response.data?.access_token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("plm_access_token", response.data.access_token);
      }
    }

    return normalizeResponse(response);
  },
};

export default authService;
