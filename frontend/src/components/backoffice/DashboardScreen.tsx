"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  useAuth,
  useRequireAuth,
  useVendors,
  useVendorStatistics,
} from "@/hooks";
import DashboardStats from "./Dashboardstats";
import BackofficeNavbar from "./BackofficeNavbar";

export default function DashboardScreen() {
  const { user, isHydrated } = useAuth();
  const { isLoading: authLoading } = useRequireAuth("/backoffice/login");

  // Fetch vendor statistics
  const { data: statistics, isLoading: statsLoading } = useVendorStatistics();

  // Fetch recent vendors
  const { data: vendorsData, isLoading: vendorsLoading } = useVendors({
    page: 1,
    limit: 5,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const isLoading = statsLoading || vendorsLoading;

  const stats = {
    total: statistics?.total || 0,
    pending: statistics?.by_status?.pending || 0,
    approved: statistics?.by_status?.approved || 0,
    rejected: statistics?.by_status?.rejected || 0,
    on_hold: statistics?.by_status?.on_hold || 0,
    suspended: statistics?.by_status?.suspended || 0,
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
      <BackofficeNavbar activePage="dashboard" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">
              Welcome back, {user.first_name || user.fullName?.split(" ")[0]}!
              Here&apos;s your vendor overview.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="mb-8">
            <DashboardStats stats={stats} />
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Link
            href="/backoffice/vendors?status=pending"
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-slate-900">
                Pending Reviews
              </h3>
              <span className="text-2xl font-bold text-amber-600">
                {stats.pending}
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Vendors waiting for approval
            </p>
            <span className="text-primary-600 text-sm font-medium group-hover:underline">
              Review now →
            </span>
          </Link>

          <Link
            href="/backoffice/vendors"
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-slate-900">
                All Vendors
              </h3>
              <span className="text-2xl font-bold text-blue-600">
                {stats.total}
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              View and manage all vendors
            </p>
            <span className="text-primary-600 text-sm font-medium group-hover:underline">
              View all →
            </span>
          </Link>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg text-slate-900 mb-4">
            Recent Submissions
          </h3>
          {vendorsLoading ? (
            <div className="text-center py-8 text-slate-500">Loading...</div>
          ) : vendorsData?.data && vendorsData.data.length > 0 ? (
            <div className="space-y-3">
              {vendorsData.data.map((vendor) => (
                <Link
                  key={vendor._id || vendor.id}
                  href={`/backoffice/vendors/${vendor._id || vendor.id}`}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {vendor.company_information?.registered_company_name ||
                        "Unknown Company"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(
                        vendor.created_at || vendor.submitted_at
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      vendor.status === "pending"
                        ? "bg-amber-100 text-amber-700 border-amber-200"
                        : vendor.status === "approved"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : vendor.status === "on_hold"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : vendor.status === "suspended"
                        ? "bg-purple-100 text-purple-700 border-purple-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {vendor.status === "on_hold"
                      ? "On Hold"
                      : vendor.status.charAt(0).toUpperCase() +
                        vendor.status.slice(1)}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No vendors yet
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
