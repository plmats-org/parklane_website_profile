"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const resetMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetMutation.mutateAsync(email);
      setSubmitted(true);
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PLM</span>
              </div>
              <div>
                <div className="font-bold text-xl text-slate-900">
                  Parklane Materials
                </div>
              </div>
            </Link>
          </div>

          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Reset Password
                </h2>
                <p className="text-slate-600">
                  Enter your email address and we'll send you instructions to
                  reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="you@company.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetMutation.isPending}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {resetMutation.isPending
                    ? "Sending..."
                    : "Send Reset Instructions"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/backoffice/login"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-slate-600 mb-6">
                We've sent password reset instructions to{" "}
                <strong>{email}</strong>
              </p>
              <Link
                href="/backoffice/login"
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
