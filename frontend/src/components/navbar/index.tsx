"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CloseIcon, Logo, MenuIcon } from "../icons";
import { useAuth } from "@/contexts/auth-context";
import { useLogout } from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why PLM", href: "#why-plm" },
  { name: "Logistics", href: "#logistics" },
];

// User Avatar Dropdown Component
function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
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

  const handleLogout = async () => {
    setIsOpen(false);
    await logoutMutation.mutateAsync();
  };

  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : "U";

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "User";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-400 text-white font-semibold text-sm hover:bg-primary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
      >
        {initials}
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
              className="block px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors"
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
                    {user?.email || ""}
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

              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
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

// Mobile User Section Component
function MobileUserSection({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    onClose();
    await logoutMutation.mutateAsync();
  };

  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : "U";

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "User";

  return (
    <div className="space-y-3">
      {/* User Info */}
      <Link
        href="/backoffice/profile"
        onClick={onClose}
        className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg"
      >
        <div className="w-10 h-10 rounded-full bg-primary-400 text-white flex items-center justify-center font-semibold text-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {fullName}
          </p>
          <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
        </div>
      </Link>

      {/* Dashboard Link */}
      <Link
        href="/backoffice/dashboard"
        onClick={onClose}
        className="block w-full text-center px-6 py-3 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        Dashboard
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="block w-full text-center px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
      >
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={cn(
          "rounded-2xl transition-all duration-300",
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-xl"
            : "bg-white/95 backdrop-blur-sm shadow-lg"
        )}
      >
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center space-x-3 group"
            >
              <Logo
                size={45}
                className="text-primary-400 group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <div className="font-display text-xl font-bold">
                  PLM
                </div>
                <div className="text-sm text-primary/30">
                  Global Sourcing Excellence
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-[#a68b56] transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button or User Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block"
            >
              {!isHydrated ? (
                // Loading placeholder to prevent layout shift
                <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
              ) : isAuthenticated ? (
                <UserDropdown />
              ) : (
                <div className="space-x-3">
                  <Link
                    href="/backoffice/login"
                    className="inline-flex text-sm items-center justify-center px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/registration"
                    className="inline-flex items-center text-sm justify-center px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Become a Vendor
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-slate-200"
            >
              <div className="px-6 py-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:text-[#a68b56] transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4 space-y-3"
                  >
                    {isAuthenticated ? (
                      <MobileUserSection onClose={() => setIsOpen(false)} />
                    ) : (
                      <>
                        <Link
                          href="/backoffice/login"
                          onClick={() => setIsOpen(false)}
                          className="block w-full text-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-300"
                        >
                          Login
                        </Link>
                        <Link
                          href="/registration"
                          onClick={() => setIsOpen(false)}
                          className="block w-full text-center px-6 py-3 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                        >
                          Become a Vendor
                        </Link>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
