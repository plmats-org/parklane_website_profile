"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useAuth,
  useRequireAuth,
  useLogout,
  useVendor,
  useUpdateVendorStatus,
} from "@/hooks";
import VendorDetails from "./Vendordetails";
import type { VendorStatus } from "@/types/vendor.types";

export default function VendorDetailsScreen() {
  const params = useParams();
  const { user, isHydrated } = useAuth();
  const { isLoading: authLoading } = useRequireAuth("/backoffice/login");
  const logoutMutation = useLogout();
  const vendorId = params.id as string;

  const { data: vendor, isLoading } = useVendor(vendorId);
  const updateStatusMutation = useUpdateVendorStatus();

  const handleStatusUpdate = async (
    status: VendorStatus,
    admin_notes?: string
  ) => {
    await updateStatusMutation.mutateAsync({
      id: vendorId,
      status,
      admin_notes,
    });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
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
                    PLM
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
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Vendors
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-right hidden sm:block">
                <p className="font-medium text-slate-900">
                  {user.fullName || `${user.first_name} ${user.last_name}`}
                </p>
                <p className="text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/backoffice/vendors"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Vendors
          </Link>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : vendor ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VendorDetails
              vendor={vendor}
              onStatusUpdate={handleStatusUpdate}
              isUpdating={updateStatusMutation.isPending}
            />
          </motion.div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-slate-600 text-lg">Vendor not found</p>
            <Link
              href="/backoffice/vendors"
              className="inline-block mt-4 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Vendors List
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
