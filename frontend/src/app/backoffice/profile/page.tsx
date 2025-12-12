"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth, useRequireAuth, useUpdateProfile } from "@/hooks";
import BackofficeNavbar from "@/components/backoffice/BackofficeNavbar";

export default function ProfilePage() {
  const { user, isHydrated, refreshUser } = useAuth();
  const { isLoading: authLoading } = useRequireAuth("/backoffice/login");
  const updateProfileMutation = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

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

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() ||
    "U";
  const fullName =
    user.fullName ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    "User";

  const handleEdit = () => {
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone: user.phone || "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      first_name: "",
      last_name: "",
      phone: "",
    });
  };

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync(formData);
      setIsEditing(false);
      // Refresh user data
      await refreshUser();
    } catch (error) {
      // Error handling is done in the mutation hook
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <BackofficeNavbar activePage="profile" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile</h1>
          <p className="text-slate-600">Manage your account information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-400 to-primary-500 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                {initials}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{fullName}</h2>
                <p className="text-primary-100">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium capitalize">
                  {user.role?.replace("_", " ") || "User"}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            {/* Edit/Save buttons */}
            <div className="flex justify-end mb-6">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    disabled={updateProfileMutation.isPending}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={updateProfileMutation.isPending}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {updateProfileMutation.isPending && (
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    <span>
                      {updateProfileMutation.isPending
                        ? "Saving..."
                        : "Save Changes"}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter first name"
                  />
                ) : (
                  <p className="text-lg text-slate-900">
                    {user.first_name || "-"}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter last name"
                  />
                ) : (
                  <p className="text-lg text-slate-900">
                    {user.last_name || "-"}
                  </p>
                )}
              </div>

              {/* Email - Read only */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  Email Address
                </label>
                <p className="text-lg text-slate-900">{user.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-lg text-slate-900">{user.phone || "-"}</p>
                )}
              </div>

              {/* Role - Read only */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  Role
                </label>
                <p className="text-lg text-slate-900 capitalize">
                  {user.role?.replace("_", " ") || "User"}
                </p>
              </div>

              {/* Status - Read only */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  Account Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      user.status === "active" ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  ></span>
                  {user.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Member Since - Read only */}
              {user.created_at && (
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Member Since
                  </label>
                  <p className="text-lg text-slate-900">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Back to Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <Link
            href="/backoffice/dashboard"
            className="inline-flex items-center text-sm text-slate-600 hover:text-primary-600 transition-colors"
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
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
