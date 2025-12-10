"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type {
  CommercialFinancialInfo,
  VendorDocument,
} from "../types/vendor.types";
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
  const [financialDocuments, setFinancialDocuments] = useState<
    VendorDocument[]
  >(data.commercialFinancial?.financialStabilityDocuments || []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<CommercialFinancialInfo, "financialStabilityDocuments">>({
    defaultValues: data.commercialFinancial || {},
  });

  const creditTermsAvailable = watch("creditTermsAvailable");
  const volumeDiscountsAvailable = watch("volumeDiscountsAvailable");
  const longTermPricingAgreements = watch("longTermPricingAgreements");

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
        uploadedAt: new Date(),
      };
      setFinancialDocuments((prev) => [...prev, newDoc]);
    }
  };

  const removeDocument = (id: string) => {
    setFinancialDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const onSubmit = (formData: any) => {
    onNext({
      commercialFinancial: {
        ...formData,
        financialStabilityDocuments: financialDocuments,
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
        {/* Pricing Structure */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pricing Structure *
          </label>
          <textarea
            {...register("pricingStructure", {
              required: "Pricing structure is required",
            })}
            rows={4}
            placeholder="Describe your pricing model, currency, price lists, how prices are determined, update frequency, etc."
            className={`block w-full px-3 py-3.5 border ${
              errors.pricingStructure ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.pricingStructure && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.pricingStructure.message}
            </p>
          )}
        </div>

        {/* Payment Terms */}
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
                  {...register("paymentTerms", {
                    required: "Select at least one payment term",
                  })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{term}</span>
              </label>
            ))}
          </div>
          {errors.paymentTerms && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.paymentTerms.message}
            </p>
          )}
        </div>

        {/* Credit Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Credit Terms Available? *
            </label>
            <select
              {...register("creditTermsAvailable", {
                required: "Please select an option",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.creditTermsAvailable
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
            {errors.creditTermsAvailable && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.creditTermsAvailable.message}
              </p>
            )}
          </div>

          {creditTermsAvailable === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Credit Terms Details
              </label>
              <input
                {...register("creditTermsDetails")}
                type="text"
                placeholder="e.g., Net 30 for qualified buyers"
                className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>

        {/* Banking Information */}
        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BuildingLibraryIcon className="h-5 w-5 text-primary-600" />
            Banking Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bank Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bank Name *
              </label>
              <input
                {...register("bankName", { required: "Bank name is required" })}
                type="text"
                placeholder="Bank of Kigali"
                className={`block w-full px-3 py-3.5 border ${
                  errors.bankName ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              />
              {errors.bankName && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bankName.message}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BanknotesIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("bankAccountNumber", {
                    required: "Account number is required",
                    pattern: {
                      value: /^[0-9]{10,20}$/,
                      message: "Invalid account number",
                    },
                  })}
                  type="text"
                  placeholder="1234567890"
                  className={`block w-full pl-10 pr-3 py-3.5 border ${
                    errors.bankAccountNumber ? "border-red-300" : "border-white"
                  } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
                />
              </div>
              {errors.bankAccountNumber && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bankAccountNumber.message}
                </p>
              )}
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Name *
              </label>
              <input
                {...register("bankAccountName", {
                  required: "Account name is required",
                })}
                type="text"
                placeholder="Company Name Ltd"
                className={`block w-full px-3 py-3.5 border ${
                  errors.bankAccountName ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              />
              {errors.bankAccountName && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bankAccountName.message}
                </p>
              )}
            </div>

            {/* Branch Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Branch Name *
              </label>
              <input
                {...register("bankBranchName", {
                  required: "Branch name is required",
                })}
                type="text"
                placeholder="Kigali Main Branch"
                className={`block w-full px-3 py-3.5 border ${
                  errors.bankBranchName ? "border-red-300" : "border-white"
                } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white`}
              />
              {errors.bankBranchName && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bankBranchName.message}
                </p>
              )}
            </div>

            {/* SWIFT Code */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                SWIFT/BIC Code
              </label>
              <input
                {...register("swiftCode", {
                  pattern: {
                    value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
                    message: "Invalid SWIFT code format",
                  },
                })}
                type="text"
                placeholder="BKIGRWRW"
                className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white uppercase"
              />
              {errors.swiftCode && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.swiftCode.message}
                </p>
              )}
            </div>

            {/* IBAN */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                IBAN (if applicable)
              </label>
              <input
                {...register("iban")}
                type="text"
                placeholder="RW00 0000 0000 0000 0000 0000"
                className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
              />
            </div>
          </div>
        </div>

        {/* Volume Discounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Volume Discounts Available? *
            </label>
            <select
              {...register("volumeDiscountsAvailable", {
                required: "Please select an option",
              })}
              className={`block w-full px-3 py-3.5 border ${
                errors.volumeDiscountsAvailable
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
            {errors.volumeDiscountsAvailable && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.volumeDiscountsAvailable.message}
              </p>
            )}
          </div>

          {volumeDiscountsAvailable === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Volume Discount Details
              </label>
              <input
                {...register("volumeDiscountDetails")}
                type="text"
                placeholder="e.g., 5% for orders over 1000 units"
                className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>

        {/* Long-term Pricing Agreements */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Open to Long-term Pricing Agreements? *
          </label>
          <select
            {...register("longTermPricingAgreements", {
              required: "Please select an option",
            })}
            className={`block w-full px-3 py-3.5 border ${
              errors.longTermPricingAgreements
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
          {errors.longTermPricingAgreements && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.longTermPricingAgreements.message}
            </p>
          )}
        </div>

        {/* Financial Stability Documents */}
        <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-primary-500" />
                Financial Stability Documents
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Upload bank statements, financial statements, or credit
                references (Optional)
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

          {financialDocuments.length > 0 && (
            <div className="space-y-2">
              {financialDocuments.map((doc) => (
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
                        Uploaded {doc.uploadedAt?.toLocaleDateString()}
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

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> All banking information will be kept
          confidential and used only for payment processing purposes.
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
