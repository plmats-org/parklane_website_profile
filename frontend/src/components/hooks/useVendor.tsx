// React Query hooks for vendor management
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { vendorService, authService } from '@/services/api.service';
import type { VendorFilters, LoginCredentials } from '@/types/vendor.types';

// Vendor Queries
export const useVendors = (page: number = 1, limit: number = 10, filters?: VendorFilters) => {
  return useQuery({
    queryKey: ['vendors', page, limit, filters],
    queryFn: () => vendorService.getVendors(page, limit, filters),
    keepPreviousData: true,
  });
};

export const useVendor = (id: string) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: () => vendorService.getVendorById(id),
    enabled: !!id,
  });
};

// Vendor Mutations
export const useUpdateVendorStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: 'approved' | 'rejected' | 'suspended'; notes?: string }) =>
      vendorService.updateVendorStatus(id, status, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', variables.id] });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vendorService.deleteVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};

// Auth Queries and Mutations
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.success) {
        router.push('/backoffice/dashboard');
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/backoffice/login');
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: Infinity,
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset(email),
  });
};