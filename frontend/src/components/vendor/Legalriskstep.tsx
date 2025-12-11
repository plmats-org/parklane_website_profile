"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type {
  LegalRiskRequirements,
  VendorDocument,
} from "../../types/vendor.types";
import { YES_NO_OPTIONS } from "../../lib/constants";
import {
  CloudArrowUpIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface LegalRiskStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function LegalRiskStep({
  data,
  onNext,
  onBack,
}: LegalRiskStepProps) {
  const [antiBriberyDoc, setAntiBriberyDoc] = useState<VendorDocument | null>(
    data.legalRisk?.antiBriberyPolicyDocument || null
  );
  const [amlDoc, setAmlDoc] = useState<VendorDocument | null>(
    data.legalRisk?.amlPolicyDocument || null
  );
  const [insuranceDoc, setInsuranceDoc] = useState<VendorDocument | null>(
    data.legalRisk?.insuranceDocument || null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LegalRiskRequirements>({
    defaultValues: data.legalRisk || {},
  });

  const antiBriberyCompliance = watch("antiBriberyCompliance");
  const amlCompliance = watch("amlCompliance");
  const productLiabilityInsurance = watch("productLiabilityInsurance");

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
        category: "legal",
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

  const onSubmit = (formData: LegalRiskRequirements) => {
    onNext({
      legalRisk: {
        ...formData,
        antiBriberyPolicyDocument: antiBriberyDoc,
        amlPolicyDocument: amlDoc,
        insuranceDocument: insuranceDoc,
      },
    });
  };

  const renderDocumentUpload = (
    title: string,
    description: string,
    document: VendorDocument | null,
    setter: React.Dispatch<React.SetStateAction<VendorDocument | null>>,
    docType: string
  ) => (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-600 mt-0.5">{description}</p>
        </div>
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
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Legal & Risk Requirements
        </h2>
        <p className="text-slate-600">
          Confirm your compliance with legal and risk management requirements.
        </p>
      </div>

      <div className="space-y-6">
        {/* Anti-Bribery Compliance */}
        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Anti-Bribery & Corruption Compliance
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                We require all vendors to comply with anti-bribery and
                anti-corruption laws and regulations.
              </p>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Do you have an Anti-Bribery & Corruption Policy? *
              </label>
              <select
                {...register("antiBriberyCompliance", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.antiBriberyCompliance
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
              {errors.antiBriberyCompliance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.antiBriberyCompliance.message}
                </p>
              )}
            </div>
          </div>

          {antiBriberyCompliance === "yes" && (
            <div className="mt-4">
              {renderDocumentUpload(
                "Upload Anti-Bribery Policy",
                "PDF, JPG, PNG - Max 5MB",
                antiBriberyDoc,
                setAntiBriberyDoc,
                "anti_bribery_policy"
              )}
            </div>
          )}
        </div>

        {/* AML Compliance */}
        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Anti-Money Laundering (AML) Compliance
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Compliance with AML regulations is essential for all financial
                transactions.
              </p>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Do you have AML Compliance procedures in place? *
              </label>
              <select
                {...register("amlCompliance", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.amlCompliance ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              >
                <option value="">Select option</option>
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.amlCompliance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.amlCompliance.message}
                </p>
              )}
            </div>
          </div>

          {amlCompliance === "yes" && (
            <div className="mt-4">
              {renderDocumentUpload(
                "Upload AML Policy",
                "PDF, JPG, PNG - Max 5MB",
                amlDoc,
                setAmlDoc,
                "aml_policy"
              )}
            </div>
          )}
        </div>

        {/* Sanctions Check Confirmation */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("sanctionsCheckConfirmation", {
                required: "You must confirm this to proceed",
              })}
              className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
            />
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 cursor-pointer">
                Sanctions Check Confirmation *
              </label>
              <p className="text-sm text-slate-600 mt-1">
                I confirm that my company, its directors, and beneficial owners
                are not subject to any international sanctions or trade
                restrictions, and do not appear on any prohibited parties lists.
              </p>
              {errors.sanctionsCheckConfirmation && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.sanctionsCheckConfirmation.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Product Liability Insurance */}
        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Product Liability Insurance
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Product liability insurance protects against claims arising from
                product defects or failures.
              </p>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Do you have Product Liability Insurance? *
              </label>
              <select
                {...register("productLiabilityInsurance", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.productLiabilityInsurance
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
              {errors.productLiabilityInsurance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.productLiabilityInsurance.message}
                </p>
              )}
            </div>
          </div>

          {productLiabilityInsurance === "yes" && (
            <div className="mt-4">
              {renderDocumentUpload(
                "Upload Insurance Certificate",
                "PDF, JPG, PNG - Max 5MB",
                insuranceDoc,
                setInsuranceDoc,
                "insurance_certificate"
              )}
            </div>
          )}
        </div>

        {/* NDA Acceptance */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("ndaAcceptance", {
                required: "You must accept the NDA to proceed",
              })}
              className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
            />
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 cursor-pointer">
                Non-Disclosure Agreement (NDA) *
              </label>
              <p className="text-sm text-slate-600 mt-1">
                I agree to sign and comply with Parklane Materials'
                Non-Disclosure Agreement to protect confidential business
                information shared during the procurement process.
              </p>
              {errors.ndaAcceptance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.ndaAcceptance.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Supplier Code of Conduct */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("supplierCodeOfConductApproval", {
                required: "You must accept the Code of Conduct to proceed",
              })}
              className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
            />
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 cursor-pointer">
                Supplier Code of Conduct *
              </label>
              <p className="text-sm text-slate-600 mt-1">
                I acknowledge that I have read, understood, and agree to comply
                with Parklane Materials' Supplier Code of Conduct, including
                ethical business practices, labor standards, environmental
                responsibility, and quality requirements.
              </p>
              {errors.supplierCodeOfConductApproval && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.supplierCodeOfConductApproval.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> All legal and compliance requirements must
          be met to become an approved vendor. False declarations may result in
          immediate disqualification and potential legal action.
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
