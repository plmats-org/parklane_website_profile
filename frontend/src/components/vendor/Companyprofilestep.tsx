"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { CompanyProfile } from "../../types/vendor.types";
import {
  companyProfileSchema,
  type CompanyProfileFormValues,
} from "../../validations/vendor.schema";
import {
  BUSINESS_TYPES,
  INDUSTRIES,
  COUNTRIES,
  CUSTOMIZATION_OPTIONS,
} from "../../lib/constants";

interface CompanyProfileStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function CompanyProfileStep({
  data,
  onNext,
  onBack,
}: CompanyProfileStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: data.company_profile || {},
  });

  const customization_capability = watch("customization_capability");

  const onSubmit = (formData: CompanyProfileFormValues) => {
    onNext({ company_profile: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Company Profile & Capabilities
        </h2>
        <p className="text-slate-600">
          Tell us about your business operations, capabilities, and what you
          offer.
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Overview */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Company Overview *
          </label>
          <textarea
            {...register("company_overview", {
              required: "Company overview is required",
            })}
            rows={4}
            placeholder="Provide a brief overview of your company, its history, mission, and key strengths..."
            className={`block w-full px-3 py-3.5 border ${
              errors.company_overview ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.company_overview && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.company_overview.message}
            </p>
          )}
        </div>

        {/* Core Activities */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Core Activities *
          </label>
          <textarea
            {...register("core_activities", {
              required: "Core activities are required",
            })}
            rows={3}
            placeholder="Describe your main business activities and operations..."
            className={`block w-full px-3 py-3.5 border ${
              errors.core_activities ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.core_activities && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.core_activities.message}
            </p>
          )}
        </div>

        {/* Industries Served */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Industries Served * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
            {INDUSTRIES.map((industry) => (
              <label
                key={industry}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={industry}
                  {...register("industries_served", {
                    required: "Select at least one industry",
                  })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{industry}</span>
              </label>
            ))}
          </div>
          {errors.industries_served && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.industries_served.message}
            </p>
          )}
        </div>

        {/* Products/Services Offered */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            List of Products/Services Offered *
          </label>
          <textarea
            {...register("products_services_offered", {
              required: "Products/services list is required",
            })}
            rows={4}
            placeholder="List your main products or services (e.g., Industrial Equipment, Construction Materials, etc.)"
            className={`block w-full px-3 py-3.5 border ${
              errors.products_services_offered
                ? "border-red-300"
                : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.products_services_offered && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.products_services_offered.message}
            </p>
          )}
          <p className="mt-1.5 text-xs text-slate-500">
            Separate multiple items with commas or line breaks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Business Type *
            </label>
            <select
              {...register("business_type", {
                required: "Business type is required",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.business_type ? "border-red-300" : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.business_type && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.business_type.message}
              </p>
            )}
          </div>

          {/* Customization Capability */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Customization Capability *
            </label>
            <select
              {...register("customization_capability", {
                required: "Please select customization capability",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.customization_capability
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select option</option>
              {CUSTOMIZATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.customization_capability && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.customization_capability.message}
              </p>
            )}
          </div>
        </div>

        {/* Customization Details (conditional) */}
        {(customization_capability === "yes" ||
          customization_capability === "limited") && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Customization Details
            </label>
            <textarea
              {...register("customization_details")}
              rows={3}
              placeholder="Describe what types of customization you can provide..."
              className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* Countries/Regions Supplied */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Countries/Regions You Supply To * (Select all that apply)
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
                  {...register("countries_regions_supplied", {
                    required: "Select at least one country",
                  })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{country}</span>
              </label>
            ))}
          </div>
          {errors.countries_regions_supplied && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.countries_regions_supplied.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Production/Service Capacity */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Production/Service Capacity *
            </label>
            <input
              {...register("production_service_capacity", {
                required: "Capacity is required",
              })}
              type="text"
              placeholder="e.g., 10,000 units/month"
              className={`block w-full px-3 py-3.5 border ${
                errors.production_service_capacity
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
            {errors.production_service_capacity && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.production_service_capacity.message}
              </p>
            )}
          </div>

          {/* Minimum Order Quantities */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Minimum Order Quantities (MOQs) *
            </label>
            <input
              {...register("minimum_order_quantities", {
                required: "MOQ is required",
              })}
              type="text"
              placeholder="e.g., 100 units or No minimum"
              className={`block w-full px-3 py-3.5 border ${
                errors.minimum_order_quantities
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
            {errors.minimum_order_quantities && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.minimum_order_quantities.message}
              </p>
            )}
          </div>

          {/* Lead Times */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Standard Lead Times *
            </label>
            <input
              {...register("lead_times", {
                required: "Lead times are required",
              })}
              type="text"
              placeholder="e.g., 2-4 weeks for standard orders"
              className={`block w-full px-3 py-3.5 border ${
                errors.lead_times ? "border-red-300" : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
            {errors.lead_times && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.lead_times.message}
              </p>
            )}
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
