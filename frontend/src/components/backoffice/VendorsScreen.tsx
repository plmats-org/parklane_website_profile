"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { authService } from "../../services/api.service";
import { useVendors, useDeleteVendor, useLogout } from "../hooks/useVendor";
import VendorFilters from "./Vendorfilters";
import VendorTable from "./Vendortable";
import type { VendorFilters as VendorFiltersType } from "../../types/vendor.types";

export default function VendorsScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const logoutMutation = useLogout();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<VendorFiltersType>({
    status: (searchParams.get("status") as any) || undefined,
  } as any);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/backoffice/login");
    }
  }, [router]);

  const { data: vendorsResponse, isLoading } = useVendors(page, 10, filters);
  const deleteMutation = useDeleteVendor();

  const currentUser = authService.getCurrentUser();

  const handleFilterChange = (newFilters: VendorFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!currentUser) {
    return null;
  }

  const pagination = vendorsResponse?.success
    ? vendorsResponse.data.pagination
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PLM</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900">
                    Parklane Materials
                  </div>
                  <div className="text-xs text-slate-600">Back Office</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/backoffice/dashboard"
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/backoffice/vendors"
                  className="px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg"
                >
                  Vendors
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-right hidden sm:block">
                <p className="font-medium text-slate-900">{currentUser.name}</p>
                <p className="text-slate-500">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

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
            vendors={vendorsResponse?.success ? vendorsResponse.data.data : []}
            isLoading={isLoading}
            onDelete={handleDelete}
          />
        </motion.div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex items-center justify-between"
          >
            <p className="text-sm text-slate-600">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} vendors
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
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
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
