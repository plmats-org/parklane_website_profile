"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Vendor, VendorStatus } from "@/types/vendor.types";

interface VendorDetailsProps {
  vendor: Vendor;
  onStatusUpdate?: (status: VendorStatus, admin_notes?: string) => void;
  isUpdating?: boolean;
}

export default function VendorDetails({
  vendor,
  onStatusUpdate,
  isUpdating,
}: VendorDetailsProps) {
  const [notes, setNotes] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<VendorStatus | null>(
    null
  );

  const handleStatusChange = () => {
    if (selectedStatus && onStatusUpdate) {
      onStatusUpdate(selectedStatus, notes);
      setShowStatusModal(false);
      setNotes("");
      setSelectedStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      on_hold: "bg-blue-100 text-blue-700 border-blue-200",
      suspended: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return (
      colors[status as keyof typeof colors] || "bg-slate-100 text-slate-700"
    );
  };

  const formatStatusLabel = (status: string) => {
    if (status === "on_hold") return "On Hold";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatFieldLabel = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderSection = (title: string, content: any) => {
    if (!content) return null;

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-200">
          {title}
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(content).map(([key, value]: [string, any]) => {
            if (
              !value ||
              key.includes("document") ||
              key.includes("Document") ||
              (Array.isArray(value) && value.length === 0)
            )
              return null;

            return (
              <div key={key}>
                <dt className="text-sm font-medium text-slate-600 mb-1">
                  {formatFieldLabel(key)}
                </dt>
                <dd className="text-sm text-slate-900">
                  {Array.isArray(value)
                    ? value.join(", ")
                    : typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : typeof value === "object" && value !== null
                    ? JSON.stringify(value)
                    : value?.toString() || "N/A"}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {vendor.company_information?.registered_company_name ||
                "Unknown Company"}
            </h2>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="font-mono">{vendor._id || vendor.id}</span>
              <span>•</span>
              <span>
                Submitted:{" "}
                {new Date(
                  vendor.created_at || vendor.submitted_at
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex px-4 py-2 text-sm font-medium rounded-lg border ${getStatusColor(
                vendor.status
              )}`}
            >
              {formatStatusLabel(vendor.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      {onStatusUpdate && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Update Status</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedStatus("approved");
                setShowStatusModal(true);
              }}
              disabled={vendor.status === "approved"}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Approve
            </button>
            <button
              onClick={() => {
                setSelectedStatus("rejected");
                setShowStatusModal(true);
              }}
              disabled={vendor.status === "rejected"}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject
            </button>
            <button
              onClick={() => {
                setSelectedStatus("on_hold");
                setShowStatusModal(true);
              }}
              disabled={vendor.status === "on_hold"}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              On Hold
            </button>
            <button
              onClick={() => {
                setSelectedStatus("suspended");
                setShowStatusModal(true);
              }}
              disabled={vendor.status === "suspended"}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suspend
            </button>
          </div>
        </div>
      )}

      {/* Vendor Information Sections */}
      {renderSection("Company Information", vendor.company_information)}
      {renderSection("Company Profile", vendor.company_profile)}
      {renderSection("Certifications", vendor.certifications)}
      {renderSection("Product & Technical", vendor.product_technical)}
      {renderSection("Commercial & Financial", vendor.commercial_financial)}
      {renderSection("Logistics", vendor.logistics)}
      {renderSection("Legal & Risk", vendor.legal_risk)}
      {renderSection("Sustainability", vendor.sustainability)}
      {renderSection("Additional Information", vendor.additional)}

      {/* References */}
      {vendor.references?.major_clients_list &&
        vendor.references.major_clients_list.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-200">
              References
            </h3>
            <div className="space-y-3">
              {vendor.references.major_clients_list
                .filter((client: any) => client.client_name)
                .map((client: any, index: number) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-medium text-slate-900">
                      {client.client_name}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {client.country} • {client.duration_of_relationship}
                    </p>
                    {client.contact_person && (
                      <p className="text-sm text-slate-600 mt-1">
                        Contact: {client.contact_person}
                        {client.contact_email && ` (${client.contact_email})`}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* Review History */}
      {vendor.reviewed_by && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Review History
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Reviewed by:</span>{" "}
              {typeof vendor.reviewed_by === "string"
                ? vendor.reviewed_by
                : vendor.reviewed_by}
            </p>
            {vendor.reviewed_at && (
              <p className="text-sm text-slate-600">
                <span className="font-medium">Reviewed on:</span>{" "}
                {new Date(vendor.reviewed_at).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Admin Notes History */}
      {vendor.admin_notes && vendor.admin_notes.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Admin Notes
          </h3>
          <div className="space-y-3">
            {vendor.admin_notes.map((note, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">{note.note}</p>
                <div className="mt-2 text-xs text-slate-500">
                  Added by{" "}
                  {note.added_by?.name || note.added_by?.email || "Unknown"} on{" "}
                  {new Date(note.added_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {selectedStatus === "approved"
                ? "Approve"
                : selectedStatus === "rejected"
                ? "Reject"
                : selectedStatus === "on_hold"
                ? "Put On Hold"
                : "Suspend"}{" "}
              Vendor
            </h3>
            <p className="text-slate-600 mb-4">
              Are you sure you want to{" "}
              {selectedStatus === "on_hold"
                ? "put this vendor on hold"
                : selectedStatus + " this vendor"}
              ?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add notes about your decision..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStatusChange}
                disabled={isUpdating}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Confirm"}
              </button>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedStatus(null);
                  setNotes("");
                }}
                disabled={isUpdating}
                className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
