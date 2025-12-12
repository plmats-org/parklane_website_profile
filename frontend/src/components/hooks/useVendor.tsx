import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { vendorService } from "../../services/api.service";
import type { VendorFilters } from "../../types/vendor.types";

// Vendor Queries
export const useVendors = (
  page: number = 1,
  limit: number = 10,
  filters?: VendorFilters
) => {
  return useQuery({
    queryKey: ["vendors", page, limit, filters],
    queryFn: () => vendorService.getVendors(page, limit, filters),
    placeholderData: keepPreviousData,
  });
};

export const useVendor = (id: string) => {
  return useQuery({
    queryKey: ["vendor", id],
    queryFn: () => vendorService.getVendorById(id),
    enabled: !!id,
  });
};

// Vendor Mutations
export const useUpdateVendorStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: "approved" | "rejected" | "suspended";
      notes?: string;
    }) => vendorService.updateVendorStatus(id, status, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", variables.id] });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vendorService.deleteVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
};
