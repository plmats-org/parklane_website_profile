"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { Certifications, VendorDocument } from "../../types/vendor.types";
import {
  certificationsSchema,
  type CertificationsFormValues,
} from "../../validations/vendor.schema";
import {
  ISO_CERTIFICATIONS,
  INDUSTRY_CERTIFICATIONS,
} from "../../lib/constants";
import {
  CloudArrowUpIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

interface CertificationsStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function CertificationsStep({
  data,
  onNext,
  onBack,
}: CertificationsStepProps) {
  const [certification_documents, setCertificationDocuments] = useState<
    VendorDocument[]
  >(data.certifications?.certification_documents || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CertificationsFormValues, "certification_documents">>({
    resolver: zodResolver(
      certificationsSchema.omit({ certification_documents: true })
    ),
    defaultValues: data.certifications || {},
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
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
        uploaded_at: new Date(),
      };
      setCertificationDocuments((prev) => [...prev, newDoc]);
    }
  };

  const removeDocument = (id: string) => {
    setCertificationDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const onSubmit = (
    formData: Omit<Certifications, "certification_documents">
  ) => {
    onNext({
      certifications: {
        ...formData,
        certification_documents,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Certifications & Compliance
        </h2>
        <p className="text-slate-600">
          Provide information about your certifications, quality systems, and
          compliance.
        </p>
      </div>

      <div className="space-y-6">
        {/* ISO Certifications */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ISO Certifications (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {ISO_CERTIFICATIONS.map((cert) => (
              <label
                key={cert}
                className="flex items-start space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={cert}
                  {...register("iso_certifications")}
                  className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Industry-Specific Certifications */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Industry-Specific Certifications (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {INDUSTRY_CERTIFICATIONS.map((cert) => (
              <label
                key={cert}
                className="flex items-start space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={cert}
                  {...register("industry_specific_certifications")}
                  className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quality Control Systems */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Quality Control Systems *
          </label>
          <textarea
            {...register("quality_control_systems", {
              required: "Quality control information is required",
            })}
            rows={4}
            placeholder="Describe your quality control processes, testing procedures, inspection methods, etc."
            className={`block w-full px-3 py-3.5 border ${
              errors.quality_control_systems
                ? "border-red-300"
                : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.quality_control_systems && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.quality_control_systems.message}
            </p>
          )}
        </div>

        {/* Environmental & Safety Compliance */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Environmental & Safety Compliance
          </label>
          <textarea
            {...register("environmental_safety_compliance")}
            rows={3}
            placeholder="List your environmental and safety compliance standards, policies, and practices..."
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Regulatory Approvals */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Regulatory Approvals
          </label>
          <textarea
            {...register("regulatory_approvals")}
            rows={3}
            placeholder="List any regulatory approvals, licenses, or permits you hold..."
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Export/Import Licenses */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Export/Import Licenses
          </label>
          <textarea
            {...register("export_import_licenses")}
            rows={3}
            placeholder="List your export/import licenses and relevant trade authorizations..."
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Upload Certification Documents */}
        <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <DocumentCheckIcon className="h-5 w-5 text-primary-500" />
                Certification Documents
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Upload copies of your certifications (PDF, JPG, PNG - Max 5MB
                each)
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, "certification")}
              />
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors">
                <CloudArrowUpIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Upload Document</span>
              </div>
            </label>
          </div>

          {certification_documents.length > 0 && (
            <div className="space-y-2">
              {certification_documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <DocumentCheckIcon className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {doc.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Uploaded{" "}
                        {doc.uploaded_at
                          ? new Date(
                              doc.uploaded_at as Date
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
          )}
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
