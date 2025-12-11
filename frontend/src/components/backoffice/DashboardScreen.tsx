"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { authService } from "../../services/api.service";
import { useVendors, useLogout } from "../hooks/useVendor";
import DashboardStats from "./Dashboardstats";

export default function DashboardScreen() {
  const router = useRouter();
  const logoutMutation = useLogout();
  const { data: vendorsResponse, isLoading } = useVendors(1, 100);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/backoffice/login");
    }
  }, [router]);

  const currentUser = authService.getCurrentUser();

  const calculateStats = () => {
    if (!vendorsResponse?.success) {
      return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }

    const vendors = vendorsResponse.data.data;
    return {
      total: vendors.length,
      pending: vendors.filter((v) => v.status === "pending").length,
      approved: vendors.filter((v) => v.status === "approved").length,
      rejected: vendors.filter((v) => v.status === "rejected").length,
    };
  };

  const stats = calculateStats();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!currentUser) {
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
                    Parklane Materials
                  </div>
                  <div className="text-xs text-slate-600">Back Office</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/backoffice/dashboard"
                  className="px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg"
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
              Welcome back, {currentUser.name.split(" ")[0]}! Here's your vendor
              overview.
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
          {isLoading ? (
            <div className="text-center py-8 text-slate-500">Loading...</div>
          ) : vendorsResponse?.success &&
            vendorsResponse.data.data.length > 0 ? (
            <div className="space-y-3">
              {vendorsResponse.data.data.slice(0, 5).map((vendor) => (
                <Link
                  key={vendor.id}
                  href={`/backoffice/vendors/${vendor.id}`}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {vendor.companyInformation.registeredCompanyName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(vendor.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      vendor.status === "pending"
                        ? "bg-amber-100 text-amber-700 border-amber-200"
                        : vendor.status === "approved"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {vendor.status.charAt(0).toUpperCase() +
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
