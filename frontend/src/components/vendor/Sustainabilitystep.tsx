"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type { SustainabilityESG, VendorDocument } from "../../types/vendor.types";
import { YES_NO_OPTIONS } from "../../lib/constants";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface SustainabilityStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function SustainabilityStep({
  data,
  onNext,
  onBack,
}: SustainabilityStepProps) {
  const [environmentalDoc, setEnvironmentalDoc] =
    useState<VendorDocument | null>(
      data.sustainability?.environmentalPolicyDocument || null
    );
  const [laborRightsDoc, setLaborRightsDoc] = useState<VendorDocument | null>(
    data.sustainability?.laborRightsDocument || null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SustainabilityESG>({
    defaultValues: data.sustainability || {},
  });

  const environmentalPolicies = watch("environmentalPolicies");
  const ethicalSourcing = watch("ethicalSourcing");
  const laborRightsCompliance = watch("laborRightsCompliance");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<VendorDocument | null>>,
    docType: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: VendorDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: docType,
        category: "certification",
        file: file,
        required: false,
        uploadedAt: new Date(),
      };
      setter(newDoc);
    }
  };

  const removeDocument = (
    setter: React.Dispatch<React.SetStateAction<VendorDocument | null>>
  ) => {
    setter(null);
  };

  const onSubmit = (formData: SustainabilityESG) => {
    onNext({
      sustainability: {
        ...formData,
        environmentalPolicyDocument: environmentalDoc,
        laborRightsDocument: laborRightsDoc,
      },
    });
  };

  const renderDocumentUpload = (
    title: string,
    document: VendorDocument | null,
    setter: React.Dispatch<React.SetStateAction<VendorDocument | null>>,
    docType: string
  ) => (
    <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e, setter, docType)}
          />
          <div className="flex items-center gap-2 px-3 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors text-sm">
            <CloudArrowUpIcon className="h-4 w-4" />
            Upload
          </div>
        </label>
      </div>

      {document && (
        <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="h-4 w-4 text-emerald-600" />
            <div>
              <p className="text-xs font-medium text-slate-900">
                {document.name}
              </p>
              <p className="text-xs text-slate-500">
                {document.uploadedAt?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeDocument(setter)}
            className="text-red-600 hover:text-red-700 text-xs font-medium"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-emerald-600" />
          Sustainability & ESG Standards
        </h2>
        <p className="text-slate-600">
          Share your commitment to environmental, social, and governance
          practices.
        </p>
      </div>

      <div className="space-y-6">
        {/* Environmental Policies */}
        <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
          <h3 className="font-semibold text-slate-900 mb-4">
            Environmental Policies
          </h3>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Do you have formal Environmental Policies? *
          </label>
          <select
            {...register("environmentalPolicies", {
              required: "Please select an option",
            })}
            className={`block w-full px-3 py-3.5 border ${
              errors.environmentalPolicies ? "border-red-300" : "border-white"
            } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white`}
          >
            <option value="">Select option</option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.environmentalPolicies && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.environmentalPolicies.message}
            </p>
          )}

          {environmentalPolicies === "yes" &&
            renderDocumentUpload(
              "Upload Environmental Policy Document (Optional)",
              environmentalDoc,
              setEnvironmentalDoc,
              "environmental_policy"
            )}
        </div>

        {/* Waste Management */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Waste Management Practices *
          </label>
          <textarea
            {...register("wasteManagement", {
              required: "Waste management information is required",
            })}
            rows={4}
            placeholder="Describe your waste management practices, recycling programs, hazardous waste disposal methods, etc."
            className={`block w-full px-3 py-3.5 border ${
              errors.wasteManagement ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.wasteManagement && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.wasteManagement.message}
            </p>
          )}
        </div>

        {/* Ethical Sourcing */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-4">
            Ethical Sourcing
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Do you practice Ethical Sourcing? *
              </label>
              <select
                {...register("ethicalSourcing", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.ethicalSourcing ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white`}
              >
                <option value="">Select option</option>
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.ethicalSourcing && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.ethicalSourcing.message}
                </p>
              )}
            </div>

            {ethicalSourcing === "yes" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ethical Sourcing Details
                </label>
                <input
                  {...register("ethicalSourcingDetails")}
                  type="text"
                  placeholder="Describe your ethical sourcing practices"
                  className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            )}
          </div>

          <div className="mt-4 bg-blue-100 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Ethical Sourcing</strong> includes ensuring fair treatment
              of workers, avoiding conflict minerals, responsible procurement
              from suppliers, and transparency in supply chains.
            </p>
          </div>
        </div>

        {/* Social Responsibility */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Social Responsibility Initiatives *
          </label>
          <textarea
            {...register("socialResponsibility", {
              required: "Social responsibility information is required",
            })}
            rows={4}
            placeholder="Describe your social responsibility programs, community engagement, charitable activities, employee welfare programs, etc."
            className={`block w-full px-3 py-3.5 border ${
              errors.socialResponsibility
                ? "border-red-300"
                : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.socialResponsibility && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.socialResponsibility.message}
            </p>
          )}
        </div>

        {/* Labor Rights Compliance */}
        <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
          <h3 className="font-semibold text-slate-900 mb-4">
            Labor Rights Compliance
          </h3>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Do you comply with International Labor Standards? *
          </label>
          <select
            {...register("laborRightsCompliance", {
              required: "Please select an option",
            })}
            className={`block w-full px-3 py-3.5 border ${
              errors.laborRightsCompliance ? "border-red-300" : "border-white"
            } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white`}
          >
            <option value="">Select option</option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.laborRightsCompliance && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.laborRightsCompliance.message}
            </p>
          )}

          {laborRightsCompliance === "yes" &&
            renderDocumentUpload(
              "Upload Labor Rights Compliance Document (Optional)",
              laborRightsDoc,
              setLaborRightsDoc,
              "labor_rights_compliance"
            )}

          <div className="mt-4 bg-amber-100 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>Labor Rights</strong> include fair wages, safe working
              conditions, reasonable working hours, freedom of association, no
              child labor, no forced labor, and non-discrimination.
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <SparklesIcon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-emerald-800">
              <strong>Why ESG Matters:</strong> Parklane Materials is committed
              to sustainable and ethical business practices. Strong ESG
              performance can open doors to more procurement opportunities and
              long-term partnerships.
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
