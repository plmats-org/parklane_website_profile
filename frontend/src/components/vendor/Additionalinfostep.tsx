"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { Additional, VendorDocument } from "../../types/vendor.types";
import {
  additionalSchema,
  type AdditionalFormValues,
} from "../../validations/vendor.schema";
import { YES_NO_OPTIONS } from "../../lib/constants";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface AdditionalInfoStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function AdditionalInfoStep({
  data,
  onNext,
  onBack,
}: AdditionalInfoStepProps) {
  const [additionalDocuments, setAdditionalDocuments] = useState<
    VendorDocument[]
  >(data.additional?.additional_documents || []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdditionalFormValues>({
    resolver: zodResolver(additionalSchema),
    defaultValues: data.additional || {},
  });

  const exclusivePartnerships = watch("exclusive_partnerships_interest");
  const jvCollaboration = watch("jv_distribution_collaboration_interest");
  const preferredSupplier = watch("preferred_supplier_program_interest");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: VendorDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: "additional",
        category: "other",
        file: file,
        required: false,
        uploaded_at: new Date(),
      };
      setAdditionalDocuments((prev) => [...prev, newDoc]);
    }
  };

  const removeDocument = (id: string) => {
    setAdditionalDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const onSubmit = (formData: AdditionalFormValues) => {
    onNext({
      additional: {
        ...formData,
        additional_documents: additionalDocuments,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Additional Information
        </h2>
        <p className="text-slate-600">
          Tell us about your interest in partnerships and provide any additional
          information.
        </p>
      </div>

      <div className="space-y-6">
        {/* Exclusive Partnerships */}
        <div className="bg-gradient-to-br from-primary-50 to-amber-50 rounded-xl p-6 border-2 border-primary-200">
          <h3 className="font-semibold text-slate-900 mb-4 text-lg">
            Exclusive Partnerships
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Interested in Exclusive Partnerships? *
              </label>
              <select
                {...register("exclusive_partnerships_interest", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.exclusive_partnerships_interest
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
              {errors.exclusive_partnerships_interest && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.exclusive_partnerships_interest.message}
                </p>
              )}
            </div>

            {exclusivePartnerships === "yes" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Exclusive Partnership Details
                </label>
                <textarea
                  {...register("exclusive_partnerships_details")}
                  rows={3}
                  placeholder="Describe the type of exclusive partnerships you're interested in..."
                  className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white resize-none"
                />
              </div>
            )}
          </div>

          {exclusivePartnerships === "yes" && (
            <div className="mt-4 bg-white rounded-lg p-3">
              <p className="text-sm text-slate-700">
                <strong>Exclusive Partnerships</strong> can include territorial
                exclusivity, product-line exclusivity, or strategic
                collaborations for specific market segments.
              </p>
            </div>
          )}
        </div>

        {/* JV / Distribution Collaboration */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-4 text-lg">
            Joint Ventures & Distribution
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Interested in JV or Distribution Collaboration? *
              </label>
              <select
                {...register("jv_distribution_collaboration_interest", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.jv_distribution_collaboration_interest
                    ? "border-red-300"
                    : "border-white"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white`}
              >
                <option value="">Select option</option>
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.jv_distribution_collaboration_interest && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.jv_distribution_collaboration_interest.message}
                </p>
              )}
            </div>

            {jvCollaboration === "yes" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  JV/Distribution Details
                </label>
                <textarea
                  {...register("jv_collaboration_details")}
                  rows={3}
                  placeholder="Describe your vision for joint ventures or distribution partnerships..."
                  className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                />
              </div>
            )}
          </div>

          {jvCollaboration === "yes" && (
            <div className="mt-4 bg-white rounded-lg p-3">
              <p className="text-sm text-slate-700">
                <strong>JV & Distribution Partnerships</strong> can include
                equity partnerships, regional distribution rights, co-branding
                opportunities, or technology transfer arrangements.
              </p>
            </div>
          )}
        </div>

        {/* Preferred Supplier Program */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
          <h3 className="font-semibold text-slate-900 mb-4 text-lg">
            Preferred Supplier Program
          </h3>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Interested in our Preferred Supplier Program? *
          </label>
          <select
            {...register("preferred_supplier_program_interest", {
              required: "Please select an option",
            })}
            className={`block w-full px-3 py-3.5 border ${
              errors.preferred_supplier_program_interest
                ? "border-red-300"
                : "border-white"
            } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white`}
          >
            <option value="">Select option</option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.preferred_supplier_program_interest && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.preferred_supplier_program_interest.message}
            </p>
          )}

          {preferredSupplier === "yes" && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-2">
                Preferred Supplier Benefits:
              </h4>
              <ul className="text-sm text-slate-700 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>
                    Priority consideration for new projects and tenders
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>
                    Simplified procurement processes and faster approvals
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>
                    Long-term volume commitments and better pricing arrangements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Collaborative product development opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>
                    Access to market intelligence and forecasting information
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Additional Comments */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Additional Comments or Information
          </label>
          <textarea
            {...register("additional_comments")}
            rows={5}
            placeholder="Include any other relevant information about your company, capabilities, unique value propositions, or special services you'd like us to know about..."
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Additional Documents */}
        <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-primary-500" />
                Additional Documents
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Upload any additional supporting documents (brochures, awards,
                etc.)
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors">
                <CloudArrowUpIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Upload</span>
              </div>
            </label>
          </div>

          {additionalDocuments.length > 0 ? (
            <div className="space-y-2">
              {additionalDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {doc.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Uploaded{" "}
                        {doc.uploaded_at
                          ? new Date(
                              doc.uploaded_at as string | Date
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <DocumentTextIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No additional documents uploaded yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Almost There!</strong> You're on the final steps. In the next
          screen, you'll be able to review all your information before final
          submission.
        </p>
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
