"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/config";
import {
  vendorService,
  type VendorListParams,
  type VendorUpdateData,
  type VendorExportParams,
} from "@/services/vendor.service";
import type {
  Vendor,
  VendorFormData,
  VendorStatistics,
  VendorStatus,
  PaginatedResponse,
} from "@/types/vendor.types";

// ============================================================================
// Query Hooks (GET requests)
// ============================================================================

/**
 * Hook to fetch paginated vendors list with filters
 */
export function useVendors(params?: VendorListParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.VENDORS, params],
    queryFn: async () => {
      const response = await vendorService.getAll(params);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to fetch vendors"
        );
      }
      return response.data as PaginatedResponse<Vendor>;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to fetch a single vendor by ID
 */
export function useVendor(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.VENDOR, id],
    queryFn: async () => {
      if (!id) throw new Error("Vendor ID is required");
      const response = await vendorService.getById(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to fetch vendor"
        );
      }
      return response.data?.vendor as Vendor;
    },
    enabled: !!id,
  });
}

/**
 * Hook to fetch vendor statistics
 */
export function useVendorStatistics() {
  return useQuery({
    queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
    queryFn: async () => {
      const response = await vendorService.getStatistics();
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to fetch statistics"
        );
      }
      return response.data?.statistics as VendorStatistics;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

// ============================================================================
// Mutation Hooks (POST, PATCH, DELETE requests)
// ============================================================================

/**
 * Hook for public vendor registration (no auth required)
 * Does not show toast on success since the page shows a success screen
 */
export function useRegisterVendor() {
  return useMutation({
    mutationFn: async (data: VendorFormData) => {
      const response = await vendorService.create(data);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to submit registration"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to submit registration. Please try again."
      );
    },
  });
}

/**
 * Hook to create a new vendor (admin use)
 */
export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VendorFormData) => {
      const response = await vendorService.create(data);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to create vendor"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success("Vendor created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create vendor");
    },
  });
}

/**
 * Hook to update a vendor
 */
export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: VendorUpdateData;
    }) => {
      const response = await vendorService.update(id, data);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to update vendor"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onSuccess: (vendor) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR, vendor._id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success("Vendor updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update vendor");
    },
  });
}

/**
 * Hook to update vendor status
 */
export function useUpdateVendorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      admin_notes,
    }: {
      id: string;
      status: VendorStatus;
      admin_notes?: string;
    }) => {
      const response = await vendorService.updateStatus(
        id,
        status,
        admin_notes
      );
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to update status"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onSuccess: (vendor) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR, vendor._id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success("Vendor status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
}

/**
 * Hook to add admin note to vendor
 */
export function useAddVendorNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      const response = await vendorService.addNote(id, note);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to add note"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onSuccess: (vendor) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR, vendor._id],
      });
      toast.success("Note added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add note");
    },
  });
}

/**
 * Hook to soft delete a vendor
 */
export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await vendorService.delete(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to delete vendor"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success("Vendor deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete vendor");
    },
  });
}

/**
 * Hook to restore a soft-deleted vendor
 */
export function useRestoreVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await vendorService.restore(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to restore vendor"
        );
      }
      return response.data?.vendor as Vendor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success("Vendor restored successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to restore vendor");
    },
  });
}

/**
 * Hook to hard delete a vendor (permanent)
 */
export function useHardDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await vendorService.hardDelete(id);
      if (!response.success) {
        throw new Error(
          response.message ||
            response.error ||
            "Failed to permanently delete vendor"
        );
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success("Vendor permanently deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to permanently delete vendor");
    },
  });
}

/**
 * Hook to bulk update vendor status
 */
export function useBulkUpdateVendorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      vendor_ids,
      status,
      admin_notes,
    }: {
      vendor_ids: string[];
      status: VendorStatus;
      admin_notes?: string;
    }) => {
      const response = await vendorService.bulkUpdateStatus(
        vendor_ids,
        status,
        admin_notes
      );
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to bulk update status"
        );
      }
      return response.data?.updated_count as number;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_STATISTICS],
      });
      toast.success(`${count} vendors updated successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to bulk update status");
    },
  });
}

/**
 * Hook to export vendors
 */
export function useExportVendors() {
  return useMutation({
    mutationFn: async (params?: VendorExportParams) => {
      const blob = await vendorService.export(params);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vendors-export-${
        new Date().toISOString().split("T")[0]
      }.${params?.format || "csv"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    },
    onSuccess: () => {
      toast.success("Export downloaded successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to export vendors");
    },
  });
}

/**
 * Hook to get vendor history
 */
export function useVendorHistory(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.VENDOR, id, "history"],
    queryFn: async () => {
      if (!id) throw new Error("Vendor ID is required");
      const response = await vendorService.getHistory(id);
      if (!response.success) {
        throw new Error(
          response.message || response.error || "Failed to fetch history"
        );
      }
      return response.data?.history || [];
    },
    enabled: !!id,
  });
}
