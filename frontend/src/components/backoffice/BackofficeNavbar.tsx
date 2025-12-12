"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, useLogout } from "@/hooks";
import type { BackofficeUser } from "@/types/vendor.types";

type ActivePage = "dashboard" | "vendors" | "profile" | null;

interface BackofficeNavbarProps {
  activePage?: ActivePage;
}

// User Dropdown Component
function UserDropdown({ user }: { user: BackofficeUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoutMutation = useLogout();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() ||
    "U";
  const fullName =
    user.fullName ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    "User";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-slate-900">{fullName}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-400 text-white flex items-center justify-center font-semibold text-sm">
          {initials}
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-[9999]"
          >
            {/* User Info Section */}
            <Link
              href="/backoffice/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-400 text-white flex items-center justify-center font-semibold text-sm">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {fullName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                href="/backoffice/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                href="/backoffice/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>

              <Link
                href="/backoffice/vendors"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Vendors
              </Link>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 rounded-b-xl"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Nav Link Component
function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "text-primary-600 bg-primary-50"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      {children}
    </Link>
  );
}

export default function BackofficeNavbar({
  activePage,
}: BackofficeNavbarProps) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
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

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink
                href="/backoffice/dashboard"
                isActive={activePage === "dashboard"}
              >
                Dashboard
              </NavLink>
              <NavLink
                href="/backoffice/vendors"
                isActive={activePage === "vendors"}
              >
                Vendors
              </NavLink>
            </div>
          </div>

          {/* Right side - User Dropdown */}
          <UserDropdown user={user} />
        </div>
      </div>
    </nav>
  );
}
