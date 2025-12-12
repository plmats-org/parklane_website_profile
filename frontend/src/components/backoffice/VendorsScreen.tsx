"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth, useRequireAuth, useVendors, useDeleteVendor } from "@/hooks";
import VendorFilters from "./Vendorfilters";
import VendorTable from "./Vendortable";
import BackofficeNavbar from "./BackofficeNavbar";
import type {
  VendorFilters as VendorFiltersType,
  VendorStatus,
} from "@/types/vendor.types";

export default function VendorsScreen() {
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuth();
  const { isLoading: authLoading } = useRequireAuth("/backoffice/login");

  const [page, setPage] = useState(1);
  const statusParam = searchParams.get("status") as VendorStatus | null;
  const [filters, setFilters] = useState<VendorFiltersType>({
    status: statusParam ? [statusParam] : undefined,
  });

  const { data: vendorsData, isLoading } = useVendors({
    page,
    limit: 10,
    ...filters,
  });
  const deleteMutation = useDeleteVendor();

  const handleFilterChange = (newFilters: VendorFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  // Show loading state during hydration
  if (!isHydrated || authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Extract pagination info directly from PaginatedResponse
  const totalPages = vendorsData?.totalPages ?? 1;
  const totalItems = vendorsData?.total ?? 0;
  const pageSize = vendorsData?.pageSize ?? 10;
  const currentPage = vendorsData?.page ?? 1;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <BackofficeNavbar activePage="vendors" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Vendors</h1>
          <p className="text-slate-600">
            Manage and review all vendor applications.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <VendorFilters onFilterChange={handleFilterChange} />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VendorTable
            vendors={vendorsData?.data || []}
            isLoading={isLoading}
            onDelete={handleDelete}
          />
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex items-center justify-between"
          >
            <p className="text-sm text-slate-600">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
              vendors
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm font-medium text-slate-900">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
