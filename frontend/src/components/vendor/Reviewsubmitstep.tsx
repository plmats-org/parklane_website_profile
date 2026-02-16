"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ReviewSubmitStepProps {
  data: any;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ReviewSubmitStep({
  data,
  onBack,
  onSubmit,
  isSubmitting,
}: ReviewSubmitStepProps) {
  const renderSection = (title: string, content: any, icon: string) => {
    if (!content) return null;

    return (
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {title}
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {Object.entries(content).map(([key, value]: [string, any]) => {
            if (!value || key.includes("document") || key.includes("Document"))
              return null;

            return (
              <div key={key}>
                <dt className="text-slate-600 font-medium mb-1">
                  {key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim()}
                </dt>
                <dd className="text-slate-900">
                  {Array.isArray(value)
                    ? value.join(", ") || "Not provided"
                    : typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : value?.toString() || "Not provided"}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    );
  };

  const totalDocuments = [
    ...(data.certifications?.certification_documents || []),
    ...(data.product_technical?.product_catalog || []),
    ...(data.product_technical?.specifications_data_sheets || []),
    ...(data.product_technical?.msds || []),
    ...(data.product_technical?.raw_material_certifications || []),
    ...(data.commercial_financial?.financial_stability_documents || []),
    ...(data.references?.reference_letters || []),
    ...(data.references?.case_studies || []),
    ...(data.additional?.additional_documents || []),
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Review & Submit
        </h2>
        <p className="text-slate-600">
          Please review all your information carefully before submitting your
          application.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-3xl font-bold text-blue-700">
            {data.company_information?.country_of_registration || "N/A"}
          </div>
          <div className="text-sm text-blue-600 mt-1">Country</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="text-3xl font-bold text-emerald-700">
            {data.company_profile?.industries_served?.length || 0}
          </div>
          <div className="text-sm text-emerald-600 mt-1">Industries</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
          <div className="text-3xl font-bold text-amber-700">
            {data.references?.major_clients_list?.filter((c: any) => c.client_name)
              ?.length || 0}
          </div>
          <div className="text-sm text-amber-600 mt-1">Clients</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="text-3xl font-bold text-purple-700">
            {totalDocuments.length}
          </div>
          <div className="text-sm text-purple-600 mt-1">Documents</div>
        </div>
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {renderSection("Company Information", data.company_information, "🏢")}
        {renderSection("Company Profile", data.company_profile, "📊")}
        {renderSection("Certifications", data.certifications, "✓")}
        {renderSection("Product & Technical", data.product_technical, "📦")}
        {renderSection(
          "Commercial & Financial",
          data.commercial_financial,
          "💰"
        )}
        {renderSection("Logistics", data.logistics, "🚚")}
        {renderSection("Legal & Risk", data.legal_risk, "⚖️")}
        {renderSection("Sustainability", data.sustainability, "🌱")}
        {renderSection("Additional Information", data.additional, "📄")}

        {/* References Summary */}
        {data.references?.major_clients_list && (
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              References
            </h3>
            <div className="space-y-3">
              {data.references.major_clients_list
                .filter((client: any) => client.client_name)
                .map((client: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-slate-200"
                  >
                    <p className="font-medium text-slate-900">
                      {client.client_name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {client.country} • {client.duration_of_relationship}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Documents Summary */}
        {totalDocuments.length > 0 && (
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <DocumentTextIcon className="h-6 w-6 text-primary-500" />
              Uploaded Documents ({totalDocuments.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {totalDocuments.map((doc: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-700 bg-white p-2 rounded border border-slate-200"
                >
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              Declaration & Terms
            </h4>
            <div className="text-sm text-amber-800 space-y-2">
              <p>By submitting this application, I declare that:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  All information provided is true, accurate, and complete to
                  the best of my knowledge
                </li>
                <li>
                  I understand that false or misleading information may result
                  in disqualification
                </li>
                <li>
                  I agree to PLM' terms and conditions for vendor
                  registration
                </li>
                <li>
                  I authorize PLM to verify the information and
                  contact references
                </li>
                <li>
                  I accept that approval is subject to successful evaluation and
                  due diligence
                </li>
              </ul>
            </div>
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
          disabled={isSubmitting}
          className="px-10 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </motion.button>
        <motion.button
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-5 w-5" />
              Submit Application
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
