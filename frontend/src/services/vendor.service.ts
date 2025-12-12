import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/config";
import type {
  Vendor,
  VendorFormData,
  VendorFilters,
  VendorStatistics,
  ApiResponse,
  PaginatedResponse,
  VendorStatus,
  AdminNote,
} from "@/types/vendor.types";

export interface VendorListParams extends VendorFilters {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface VendorUpdateData extends Partial<VendorFormData> {
  status?: VendorStatus;
  admin_notes?: string;
  reviewed_by?: string;
}

export interface VendorExportParams {
  format?: "csv" | "excel";
  status?: VendorStatus;
  date_from?: string;
  date_to?: string;
}

/**
 * Helper to normalize response with success boolean
 */
const normalizeResponse = <T>(response: ApiResponse<T>): ApiResponse<T> => {
  return {
    ...response,
    success: response.status === "success",
  };
};

export const vendorService = {
  /**
   * Get paginated list of vendors with optional filters
   */
  getAll: async (
    params?: VendorListParams
  ): Promise<ApiResponse<PaginatedResponse<Vendor>>> => {
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
      ? `${API_ENDPOINTS.VENDORS}?${queryString}`
      : API_ENDPOINTS.VENDORS;

    const response = await apiClient.get<
      ApiResponse<PaginatedResponse<Vendor>>
    >(url);
    return normalizeResponse(response);
  },

  /**
   * Get a single vendor by ID (public - no auth required)
   */
  getById: async (id: string): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.get<ApiResponse<{ vendor: Vendor }>>(
      API_ENDPOINTS.VENDOR_BY_ID(id)
    );
    return normalizeResponse(response);
  },

  /**
   * Create a new vendor registration (public - no auth required)
   * Data is already in snake_case format matching backend
   */
  create: async (
    data: VendorFormData
  ): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.post<ApiResponse<{ vendor: Vendor }>>(
      API_ENDPOINTS.VENDORS,
      data
    );
    return normalizeResponse(response);
  },

  /**
   * Update vendor details (including status and admin notes)
   */
  update: async (
    id: string,
    data: VendorUpdateData
  ): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.patch<ApiResponse<{ vendor: Vendor }>>(
      API_ENDPOINTS.VENDOR_BY_ID(id),
      data
    );
    return normalizeResponse(response);
  },

  /**
   * Soft delete a vendor
   */
  delete: async (id: string): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.delete<ApiResponse<{ vendor: Vendor }>>(
      API_ENDPOINTS.VENDOR_BY_ID(id)
    );
    return normalizeResponse(response);
  },

  /**
   * Hard delete a vendor (permanent removal)
   */
  hardDelete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${API_ENDPOINTS.VENDOR_BY_ID(id)}/permanent`
    );
    return normalizeResponse(response);
  },

  /**
   * Restore a soft-deleted vendor
   */
  restore: async (id: string): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.patch<ApiResponse<{ vendor: Vendor }>>(
      `${API_ENDPOINTS.VENDOR_BY_ID(id)}/restore`,
      {}
    );
    return normalizeResponse(response);
  },

  /**
   * Update vendor status with optional admin note
   */
  updateStatus: async (
    id: string,
    status: VendorStatus,
    admin_notes?: string
  ): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.patch<ApiResponse<{ vendor: Vendor }>>(
      API_ENDPOINTS.VENDOR_BY_ID(id),
      { status, admin_notes }
    );
    return normalizeResponse(response);
  },

  /**
   * Add admin note to vendor
   */
  addNote: async (
    id: string,
    note: string
  ): Promise<ApiResponse<{ vendor: Vendor }>> => {
    const response = await apiClient.patch<ApiResponse<{ vendor: Vendor }>>(
      API_ENDPOINTS.VENDOR_BY_ID(id),
      { note }
    );
    return normalizeResponse(response);
  },

  /**
   * Get vendor statistics
   */
  getStatistics: async (): Promise<
    ApiResponse<{ statistics: VendorStatistics }>
  > => {
    const response = await apiClient.get<
      ApiResponse<{ statistics: VendorStatistics }>
    >(API_ENDPOINTS.VENDOR_STATISTICS);
    return normalizeResponse(response);
  },

  /**
   * Export vendors to CSV/Excel
   */
  export: async (params?: VendorExportParams): Promise<Blob> => {
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
      ? `${API_ENDPOINTS.VENDOR_EXPORT}?${queryString}`
      : API_ENDPOINTS.VENDOR_EXPORT;

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const fullUrl = `${baseUrl}${url}`;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          typeof window !== "undefined"
            ? localStorage.getItem("plm_access_token")
            : ""
        }`,
      },
    });

    if (!response.ok) {
      throw new Error("Export failed");
    }

    return await response.blob();
  },

  /**
   * Bulk update vendor status
   */
  bulkUpdateStatus: async (
    vendor_ids: string[],
    status: VendorStatus,
    admin_notes?: string
  ): Promise<ApiResponse<{ updated_count: number }>> => {
    const response = await apiClient.patch<
      ApiResponse<{ updated_count: number }>
    >(`${API_ENDPOINTS.VENDORS}/bulk-status`, {
      vendor_ids,
      status,
      admin_notes,
    });
    return normalizeResponse(response);
  },

  /**
   * Get vendor history/audit log
   */
  getHistory: async (
    id: string
  ): Promise<ApiResponse<{ history: AdminNote[] }>> => {
    const response = await apiClient.get<ApiResponse<{ history: AdminNote[] }>>(
      `${API_ENDPOINTS.VENDOR_BY_ID(id)}/history`
    );
    return normalizeResponse(response);
  },
};

export default vendorService;
