"use client";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  DocumentCheckIcon,
  ClockIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface SuccessScreenProps {
  onReturnHome: () => void;
}

export default function SuccessScreen({ onReturnHome }: SuccessScreenProps) {
  const referenceNumber = `VR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-primary-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header Section with Icon */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl"
          >
            <CheckCircleIcon className="h-16 w-16 text-emerald-600" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-emerald-400"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
          >
            Registration Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-emerald-100 text-lg"
          >
            Your application has been submitted
          </motion.p>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-10">
          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-lg text-slate-700 leading-relaxed">
              Thank you for your interest in partnering with{" "}
              <strong className="text-primary-600">PLM</strong>.
              Your vendor application has been successfully submitted and is now
              under review by our procurement team.
            </p>
          </motion.div>

          {/* Reference Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 mb-8"
          >
            <div className="flex items-center justify-center gap-3">
              <DocumentCheckIcon className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <p className="text-sm text-blue-600 font-medium mb-1">
                  Your Reference Number
                </p>
                <p className="text-2xl font-bold text-blue-900 tracking-wide">
                  {referenceNumber}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Please save this for your records
                </p>
              </div>
            </div>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-50 rounded-xl p-6 mb-8"
          >
            <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
              <SparklesIcon className="h-6 w-6 text-primary-500" />
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <ClockIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Review Process
                  </h4>
                  <p className="text-sm text-slate-600">
                    Our procurement team will review your application within{" "}
                    <strong>3-5 business days</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Email Notification
                  </h4>
                  <p className="text-sm text-slate-600">
                    You'll receive an email notification about your application
                    status and next steps
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DocumentCheckIcon className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Additional Information
                  </h4>
                  <p className="text-sm text-slate-600">
                    We may contact you for additional information or
                    clarification if needed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Approval & Onboarding
                  </h4>
                  <p className="text-sm text-slate-600">
                    Once approved, you'll be added to our vendor database and
                    can start receiving purchase orders
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
          >
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Please check your email regularly
              (including spam folder) for updates on your application. If you
              have any questions, feel free to contact our procurement team.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
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
              Return to Homepage
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
