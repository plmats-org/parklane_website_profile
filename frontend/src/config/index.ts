export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  appName: "Parklane Materials",
  appVersion: "1.0.0",
};

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  REFRESH: "/auth/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
  UPDATE_PROFILE: "/auth/profile",

  // Users (Admin CRUD)
  USERS: "/users",
  USER_BY_ID: (id: string) => `/users/${id}`,
  USER_DEACTIVATE: (id: string) => `/users/${id}/deactivate`,
  USER_ACTIVATE: (id: string) => `/users/${id}/activate`,

  // Vendors
  VENDORS: "/vendors",
  VENDOR_BY_ID: (id: string) => `/vendors/${id}`,
  VENDOR_STATISTICS: "/vendors/statistics",
  VENDOR_EXPORT: "/vendors/export",
} as const;

export const QUERY_KEYS = {
  // Auth
  CURRENT_USER: ["currentUser"],
  USER: "user",

  // Users (Admin CRUD)
  USERS: "users",
  USER_DETAIL: "user-detail",

  // Vendors
  VENDORS: "vendors",
  VENDOR: "vendor",
  VENDOR_STATISTICS: "vendor-statistics",
} as const;
