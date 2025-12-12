"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { Logistics } from "../../types/vendor.types";
import {
  logisticsSchema,
  type LogisticsFormValues,
} from "../../validations/vendor.schema";
import {
  INCOTERMS,
  SHIPPING_METHODS,
  YES_NO_OPTIONS,
  COUNTRIES,
} from "../../lib/constants";
import { TruckIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

interface LogisticsStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function LogisticsStep({
  data,
  onNext,
  onBack,
}: LogisticsStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LogisticsFormValues>({
    resolver: zodResolver(logisticsSchema),
    defaultValues: data.logistics || {},
  });

  const urgent_delivery_capability = watch("urgent_delivery_capability");
  const warehousing_options = watch("warehousing_options");
  const international_documentation = watch(
    "international_documentation_capability"
  );

  const onSubmit = (formData: Logistics) => {
    onNext({ logistics: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Logistics & Fulfillment
        </h2>
        <p className="text-slate-600">
          Provide details about your shipping, delivery capabilities, and
          logistics operations.
        </p>
      </div>

      <div className="space-y-6">
        {/* Country of Origin */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Country/Countries of Origin * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
            {COUNTRIES.map((country) => (
              <label
                key={country}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={country}
                  {...register("country_of_origin", {
                    required: "Select at least one country of origin",
                  })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{country}</span>
              </label>
            ))}
          </div>
          {errors.country_of_origin && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.country_of_origin.message}
            </p>
          )}
        </div>

        {/* Incoterms */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Incoterms Used * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {INCOTERMS.map((term) => (
              <label
                key={term}
                className="flex items-start space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={term}
                  {...register("incoterms_used", {
                    required: "Select at least one Incoterm",
                  })}
                  className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{term}</span>
              </label>
            ))}
          </div>
          {errors.incoterms_used && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.incoterms_used.message}
            </p>
          )}
        </div>

        {/* Shipping Methods */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Shipping Methods * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {SHIPPING_METHODS.map((method) => (
              <label
                key={method}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={method}
                  {...register("shipping_methods", {
                    required: "Select at least one shipping method",
                  })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{method}</span>
              </label>
            ))}
          </div>
          {errors.shipping_methods && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.shipping_methods.message}
            </p>
          )}
        </div>

        {/* International Documentation Capability */}
        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                International Documentation Capability? *
              </label>
              <select
                {...register("international_documentation_capability", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.international_documentation_capability
                    ? "border-red-300"
                    : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              >
                <option value="">Select option</option>
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.international_documentation_capability && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.international_documentation_capability.message}
                </p>
              )}
            </div>

            {international_documentation === "yes" && (
              <div className="flex items-center">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-sm text-emerald-700">
                    <strong>✓ Excellent!</strong> You can handle international
                    shipping documentation including commercial invoices,
                    packing lists, certificates of origin, and customs
                    declarations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Standard Lead Times */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Standard Lead Times *
          </label>
          <input
            {...register("standard_lead_times", {
              required: "Lead times are required",
            })}
            type="text"
            placeholder="e.g., 2-4 weeks for sea freight, 3-5 days for air freight"
            className={`block w-full px-3 py-3.5 border ${
              errors.standard_lead_times ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.standard_lead_times && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.standard_lead_times.message}
            </p>
          )}
        </div>

        {/* Urgent Delivery Capability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Urgent/Expedited Delivery Capability? *
            </label>
            <select
              {...register("urgent_delivery_capability", {
                required: "Please select an option",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.urgent_delivery_capability
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select option</option>
              {YES_NO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.urgent_delivery_capability && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.urgent_delivery_capability.message}
              </p>
            )}
          </div>

          {urgent_delivery_capability === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Urgent Delivery Details
              </label>
              <input
                {...register("urgent_delivery_details")}
                type="text"
                placeholder="e.g., 24-48 hours express delivery available"
                className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>

        {/* Warehousing Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Warehousing Options Available? *
            </label>
            <select
              {...register("warehousing_options", {
                required: "Please select an option",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.warehousing_options
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select option</option>
              {YES_NO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.warehousing_options && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.warehousing_options.message}
              </p>
            )}
          </div>

          {warehousing_options === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Warehousing Details
              </label>
              <input
                {...register("warehousing_details")}
                type="text"
                placeholder="e.g., Climate-controlled warehouse in Kigali, 5000 sqm"
                className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <TruckIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800">
              <strong>Logistics Tip:</strong> Clear communication about lead
              times and delivery capabilities helps us match you with the right
              procurement opportunities. Include any special handling or
              temperature-controlled transport capabilities if applicable.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4 pt-6 border-t border-slate-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onBack}
          className="px-10 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300"
        >
          ← Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-10 py-4 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Next Step →
        </motion.button>
      </div>
    </form>
  );
}
