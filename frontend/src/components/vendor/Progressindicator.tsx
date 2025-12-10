"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Step {
  id: number;
  title: string;
  icon: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: readonly Step[];
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  steps,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full shadow-sm"
          />
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs text-slate-600">
            {steps[currentStep - 1].title}
          </p>
        </div>
      </div>

      {/* Desktop Step Grid */}
      <div className="hidden lg:grid grid-cols-11 gap-2">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                scale: isCurrent ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`relative text-center p-3 rounded-xl border-2 transition-all duration-300 ${
                isCurrent
                  ? "border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg"
                  : isCompleted
                  ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* Completion Checkmark */}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={`text-2xl mb-1 ${isCurrent ? "animate-bounce" : ""}`}
              >
                {step.icon}
              </div>

              {/* Step Number */}
              <div
                className={`text-xs font-bold ${
                  isCurrent
                    ? "text-primary-700"
                    : isCompleted
                    ? "text-emerald-700"
                    : "text-slate-500"
                }`}
              >
                {step.id}
              </div>

              {/* Step Title - Only show on hover for completed/upcoming */}
              <div
                className={`absolute left-0 right-0 -bottom-8 text-xs font-medium transition-opacity ${
                  isCurrent
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } ${
                  isCurrent
                    ? "text-primary-700"
                    : isCompleted
                    ? "text-emerald-700"
                    : "text-slate-600"
                }`}
              >
                {isCurrent && (
                  <span className="block truncate px-1">{step.title}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop - Current Step Title */}
      <div className="hidden lg:block mt-6 text-center">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-slate-600 mb-1">Current Step</p>
          <p className="text-lg font-semibold text-slate-900">
            {steps[currentStep - 1].title}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
