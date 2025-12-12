"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { LegalRisk, VendorDocument } from "../../types/vendor.types";
import {
  legalRiskSchema,
  type LegalRiskFormValues,
} from "../../validations/vendor.schema";
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
    data.legal_risk?.anti_bribery_policy_document || null
  );
  const [amlDoc, setAmlDoc] = useState<VendorDocument | null>(
    data.legal_risk?.aml_policy_document || null
  );
  const [insuranceDoc, setInsuranceDoc] = useState<VendorDocument | null>(
    data.legal_risk?.insurance_document || null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LegalRiskFormValues>({
    resolver: zodResolver(legalRiskSchema),
    defaultValues: data.legal_risk || {},
  });

  const antiBriberyCompliance = watch("anti_bribery_compliance");
  const amlCompliance = watch("aml_compliance");
  const productLiabilityInsurance = watch("product_liability_insurance");

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
        uploaded_at: new Date(),
      };
      setter(newDoc);
    }
  };

  const removeDocument = (
    setter: React.Dispatch<React.SetStateAction<VendorDocument | null>>
  ) => {
    setter(null);
  };

  const onSubmit = (formData: LegalRiskFormValues) => {
    onNext({
      legal_risk: {
        ...formData,
        anti_bribery_policy_document: antiBriberyDoc,
        aml_policy_document: amlDoc,
        insurance_document: insuranceDoc,
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
                {document.uploaded_at
                  ? new Date(
                      document.uploaded_at as string | Date
                    ).toLocaleDateString()
                  : ""}
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
                {...register("anti_bribery_compliance", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.anti_bribery_compliance
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
              {errors.anti_bribery_compliance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.anti_bribery_compliance.message}
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
                {...register("aml_compliance", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.aml_compliance ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              >
                <option value="">Select option</option>
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.aml_compliance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.aml_compliance.message}
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
              {...register("sanctions_check_confirmation", {
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
              {errors.sanctions_check_confirmation && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.sanctions_check_confirmation.message}
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
                {...register("product_liability_insurance", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.product_liability_insurance
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
              {errors.product_liability_insurance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.product_liability_insurance.message}
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
              {...register("nda_acceptance", {
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
              {errors.nda_acceptance && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.nda_acceptance.message}
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
              {...register("supplier_code_of_conduct_approval", {
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
              {errors.supplier_code_of_conduct_approval && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.supplier_code_of_conduct_approval.message}
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
