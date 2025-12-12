// Vendor API Service - Using mock data (to be replaced with real API)
import type {
  Vendor,
  VendorFormData,
  ApiResponse,
  PaginatedResponse,
  VendorFilters,
} from "../types/vendor.types";

// Mock imports - Remove these when connecting to real API
import { delay, generateMockVendors } from "./mock";

// Vendor Service (still using mocks - to be integrated with backend)
export const vendorService = {
  // Submit vendor registration
  async submitRegistration(
    data: VendorFormData
  ): Promise<ApiResponse<{ id: string; referenceNumber: string }>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // return await response.json();

      // Mock response
      return {
        status: "success" as const,
        data: {
          id: `VND${Date.now()}`,
          referenceNumber: `VR-${Date.now().toString().slice(-8)}`,
        },
        message: "Vendor registration submitted successfully",
      };
    } catch (error) {
      return {
        status: "error" as const,
        error: "Failed to submit registration",
      };
    }
  },

  // Get vendors with filters
  async getVendors(
    page: number = 1,
    limit: number = 10,
    filters?: VendorFilters
  ): Promise<ApiResponse<PaginatedResponse<Vendor>>> {
    await delay(800);

    try {
      // TODO: Replace with actual API call
      // const params = new URLSearchParams({
      //   page: page.toString(),
      //   limit: limit.toString(),
      //   ...(filters?.status && { status: filters.status }),
      //   ...(filters?.search && { search: filters.search }),
      //   ...(filters?.country && { country: filters.country }),
      //   ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
      //   ...(filters?.dateTo && { dateTo: filters.dateTo }),
      // });
      // const response = await fetch(`${API_BASE_URL}/vendors?${params}`);
      // return await response.json();

      // Mock response
      let mockVendors = generateMockVendors();

      // Apply filters
      if (filters?.status && filters.status.length > 0) {
        mockVendors = mockVendors.filter((v: Vendor) =>
          filters.status!.includes(v.status)
        );
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        mockVendors = mockVendors.filter(
          (v: Vendor) =>
            v.company_information.registered_company_name
              .toLowerCase()
              .includes(searchLower) ||
            v.company_information.corporate_email
              .toLowerCase()
              .includes(searchLower) ||
            (v._id || "").toLowerCase().includes(searchLower)
        );
      }
      if (filters?.country && filters.country.length > 0) {
        mockVendors = mockVendors.filter((v: Vendor) =>
          filters.country!.includes(
            v.company_information.country_of_registration
          )
        );
      }

      const total = mockVendors.length;
      const start = (page - 1) * limit;
      const paginatedVendors = mockVendors.slice(start, start + limit);

      return {
        status: "success" as const,
        data: {
          data: paginatedVendors,
          total,
          page,
          pageSize: limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return {
        status: "error" as const,
        error: "Failed to fetch vendors",
      };
    }
  },

  // Get vendor by ID
  async getVendorById(id: string): Promise<ApiResponse<Vendor>> {
    await delay(600);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/${id}`);
      // return await response.json();

      // Mock response
      const vendors = generateMockVendors();
      const vendor = vendors.find((v: Vendor) => v.id === id);

      if (vendor) {
        return {
          status: "success" as const,
          data: vendor,
        };
      } else {
        return {
          status: "error" as const,
          error: "Vendor not found",
        };
      }
    } catch (error) {
      return {
        status: "error" as const,
        error: "Failed to fetch vendor details",
      };
    }
  },

  // Update vendor status
  async updateVendorStatus(
    id: string,
    status: "approved" | "rejected" | "suspended",
    notes?: string
  ): Promise<ApiResponse<Vendor>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status, notes }),
      // });
      // return await response.json();

      // Mock response
      return {
        status: "success" as const,
        data: {} as Vendor,
        message: `Vendor status updated to ${status}`,
      };
    } catch (error) {
      return {
        status: "error" as const,
        error: "Failed to update vendor status",
      };
    }
  },

  // Delete vendor
  async deleteVendor(id: string): Promise<ApiResponse<void>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/${id}`, {
      //   method: 'DELETE',
      // });
      // return await response.json();

      // Mock response
      return {
        status: "success" as const,
        message: "Vendor deleted successfully",
      };
    } catch (error) {
      return {
        status: "error" as const,
        error: "Failed to delete vendor",
      };
    }
  },
};
