"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type {
  CommercialFinancial,
  VendorDocument,
} from "../../types/vendor.types";
import {
  commercialFinancialSchema,
  type CommercialFinancialFormValues,
} from "../../validations/vendor.schema";
import { PAYMENT_TERMS, YES_NO_OPTIONS } from "../../lib/constants";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface CommercialFinancialStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function CommercialFinancialStep({
  data,
  onNext,
  onBack,
}: CommercialFinancialStepProps) {
  const [financial_stability_documents, setFinancialDocuments] = useState<
    VendorDocument[]
  >(data.commercial_financial?.financial_stability_documents || []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<
    Omit<CommercialFinancialFormValues, "financial_stability_documents">
  >({
    resolver: zodResolver(
      commercialFinancialSchema.omit({ financial_stability_documents: true })
    ),
    defaultValues: data.commercial_financial || {},
  });

  const credit_terms_available = watch("credit_terms_available");
  const volume_discounts_available = watch("volume_discounts_available");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: VendorDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: "financial_document",
        category: "financial",
        file: file,
        required: false,
        uploaded_at: new Date(),
      };
      setFinancialDocuments((prev) => [...prev, newDoc]);
    }
  };

  const removeDocument = (id: string) => {
    setFinancialDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const onSubmit = (formData: any) => {
    onNext({
      commercial_financial: {
        ...formData,
        financial_stability_documents,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Commercial & Financial Requirements
        </h2>
        <p className="text-slate-600">
          Provide your pricing structure, payment terms, and banking
          information.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pricing Structure *
          </label>
          <textarea
            {...register("pricing_structure", {
              required: "Pricing structure is required",
            })}
            rows={4}
            placeholder="Describe your pricing model, currency, price lists, how prices are determined, update frequency, etc."
            className={`block w-full px-3 py-3.5 border ${
              errors.pricing_structure ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.pricing_structure && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.pricing_structure.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Payment Terms * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {PAYMENT_TERMS.map((term) => (
              <label
                key={term}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  value={term}
                  {...register("payment_terms", {
                    required: "Select at least one payment term",
                  })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{term}</span>
              </label>
            ))}
          </div>
          {errors.payment_terms && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.payment_terms.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Credit Terms Available? *
            </label>
            <select
              {...register("credit_terms_available", {
                required: "Please select an option",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.credit_terms_available
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
            {errors.credit_terms_available && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.credit_terms_available.message}
              </p>
            )}
          </div>

          {credit_terms_available === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Credit Terms Details
              </label>
              <input
                {...register("credit_terms_details")}
                type="text"
                placeholder="e.g., Net 30 for qualified buyers"
                className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>

        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BuildingLibraryIcon className="h-5 w-5 text-primary-600" />
            Banking Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bank Name *
              </label>
              <input
                {...register("bank_name", {
                  required: "Bank name is required",
                })}
                type="text"
                placeholder="Bank of Kigali"
                className={`block w-full px-3 py-3.5 border ${
                  errors.bank_name ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              />
              {errors.bank_name && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bank_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BanknotesIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("bank_account_number", {
                    required: "Account number is required",
                  })}
                  type="text"
                  placeholder="1234567890"
                  className={`block w-full pl-10 pr-3 py-3.5 border ${
                    errors.bank_account_number
                      ? "border-red-300"
                      : "border-white"
                  } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
                />
              </div>
              {errors.bank_account_number && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bank_account_number.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Name *
              </label>
              <input
                {...register("bank_account_name", {
                  required: "Account name is required",
                })}
                type="text"
                placeholder="Company Name Ltd"
                className={`block w-full px-3 py-3.5 border ${
                  errors.bank_account_name ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              />
              {errors.bank_account_name && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bank_account_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Branch Name *
              </label>
              <input
                {...register("bank_branch_name", {
                  required: "Branch name is required",
                })}
                type="text"
                placeholder="Kigali Main Branch"
                className={`block w-full px-3 py-3.5 border ${
                  errors.bank_branch_name ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              />
              {errors.bank_branch_name && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bank_branch_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                SWIFT/BIC Code
              </label>
              <input
                {...register("swift_code")}
                type="text"
                placeholder="BKIGRWRW"
                className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                IBAN (if applicable)
              </label>
              <input
                {...register("iban")}
                type="text"
                placeholder="RW00000000000000000000"
                className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Volume Discounts Available? *
            </label>
            <select
              {...register("volume_discounts_available", {
                required: "Please select an option",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.volume_discounts_available
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
            {errors.volume_discounts_available && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.volume_discounts_available.message}
              </p>
            )}
          </div>

          {volume_discounts_available === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Volume Discount Details
              </label>
              <input
                {...register("volume_discount_details")}
                type="text"
                placeholder="e.g., 5% discount for orders over $10,000"
                className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Long-Term Pricing Agreements? *
          </label>
          <select
            {...register("long_term_pricing_agreements", {
              required: "Please select an option",
            })}
            className={`block w-full px-3 py-3.5 border ${
              errors.long_term_pricing_agreements
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
          {errors.long_term_pricing_agreements && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.long_term_pricing_agreements.message}
            </p>
          )}
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-primary-500" />
                Financial Stability Documents
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Upload financial statements, auditor reports, etc.
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

          {financial_stability_documents.length > 0 && (
            <div className="space-y-2">
              {financial_stability_documents.map((doc) => (
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
