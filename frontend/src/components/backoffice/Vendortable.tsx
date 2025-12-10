"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Vendor } from "../../types/vendor.types";

interface VendorTableProps {
  vendors: Vendor[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
}

export default function VendorTable({
  vendors,
  isLoading,
  onDelete,
}: VendorTableProps) {
  const [sortField, setSortField] = useState<"submittedAt" | "companyName">(
    "submittedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      suspended: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return (
      colors[status as keyof typeof colors] || "bg-slate-100 text-slate-700"
    );
  };

  const sortedVendors = [...vendors].sort((a, b) => {
    if (sortField === "submittedAt") {
      const dateA = new Date(a.submittedAt).getTime();
      const dateB = new Date(b.submittedAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      const nameA = a.companyInformation.registeredCompanyName.toLowerCase();
      const nameB = b.companyInformation.registeredCompanyName.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
  });

  const handleSort = (field: "submittedAt" | "companyName") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="text-slate-600 mt-4">Loading vendors...</p>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <p className="text-slate-600 text-lg">No vendors found</p>
        <p className="text-slate-500 text-sm mt-2">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                <button
                  onClick={() => handleSort("companyName")}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  Company
                  <span className="text-xs">
                    {sortField === "companyName" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </span>
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Vendor ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Country
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                <button
                  onClick={() => handleSort("submittedAt")}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  Submitted
                  <span className="text-xs">
                    {sortField === "submittedAt" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </span>
                </button>
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedVendors.map((vendor, index) => (
              <motion.tr
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      {vendor.companyInformation.registeredCompanyName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {vendor.companyInformation.corporateEmail}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                  {vendor.id}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {vendor.companyInformation.countryOfRegistration}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      vendor.status
                    )}`}
                  >
                    {vendor.status.charAt(0).toUpperCase() +
                      vendor.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(vendor.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/backoffice/vendors/${vendor.id}`}
                      className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      View
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(vendor.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
