"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type {
  References,
  MajorClient,
  VendorDocument,
} from "../../types/vendor.types";
import {
  referencesSchema,
  type ReferencesFormValues,
} from "../../validations/vendor.schema";
import { YES_NO_OPTIONS } from "../../lib/constants";
import {
  PlusIcon,
  TrashIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

interface ReferencesStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function ReferencesStep({
  data,
  onNext,
  onBack,
}: ReferencesStepProps) {
  const [referenceLetters, setReferenceLetters] = useState<VendorDocument[]>(
    data.references?.reference_letters || []
  );
  const [caseStudies, setCaseStudies] = useState<VendorDocument[]>(
    data.references?.case_studies || []
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReferencesFormValues>({
    resolver: zodResolver(referencesSchema),
    defaultValues: data.references || {
      major_clients_list: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "major_clients_list",
  });

  const internationalExperience = watch("international_supply_experience");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<VendorDocument[]>>,
    docType: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: VendorDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: docType,
        category: "reference",
        file: file,
        required: false,
        uploaded_at: new Date(),
      };
      setter((prev) => [...prev, newDoc]);
    }
  };

  const removeDocument = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<VendorDocument[]>>
  ) => {
    setter((prev) => prev.filter((doc) => doc.id !== id));
  };

  const onSubmit = (formData: ReferencesFormValues) => {
    onNext({
      references: {
        ...formData,
        reference_letters: referenceLetters,
        case_studies: caseStudies,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <StarIcon className="h-8 w-8 text-primary-500" />
          References & Past Performance
        </h2>
        <p className="text-slate-600">
          Provide information about your major clients and past performance to
          build credibility.
        </p>
      </div>

      <div className="space-y-6">
        {/* Major Clients List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                Major Clients List
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Add at least 2-3 major clients as references
              </p>
            </div>
            <button
              type="button"
              onClick={() => append({} as MajorClient)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <PlusIcon className="h-4 w-4" />
              Add Client
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800">
                    Client {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      {...register(`major_clients_list.${index}.client_name`, {
                        required: "Client name is required",
                      })}
                      type="text"
                      placeholder="ABC Corporation"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Country *
                    </label>
                    <input
                      {...register(`major_clients_list.${index}.country`, {
                        required: "Country is required",
                      })}
                      type="text"
                      placeholder="Rwanda"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Products/Services Supplied *
                    </label>
                    <input
                      {...register(
                        `major_clients_list.${index}.products_supplied`,
                        {
                          required: "Products supplied is required",
                        }
                      )}
                      type="text"
                      placeholder="Construction materials, industrial equipment"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration of Relationship *
                    </label>
                    <input
                      {...register(
                        `major_clients_list.${index}.duration_of_relationship`,
                        {
                          required: "Duration is required",
                        }
                      )}
                      type="text"
                      placeholder="3 years"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Annual Volume (Optional)
                    </label>
                    <input
                      {...register(`major_clients_list.${index}.annual_volume`)}
                      type="text"
                      placeholder="$500,000"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Contact Person (Optional)
                    </label>
                    <input
                      {...register(
                        `major_clients_list.${index}.contact_person`
                      )}
                      type="text"
                      placeholder="John Doe"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Contact Email (Optional)
                    </label>
                    <input
                      {...register(`major_clients_list.${index}.contact_email`)}
                      type="email"
                      placeholder="john@abc.com"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Contact Phone (Optional)
                    </label>
                    <input
                      {...register(`major_clients_list.${index}.contact_phone`)}
                      type="tel"
                      placeholder="+250788123456"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reference Letters */}
        <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-primary-500" />
                Reference Letters
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Upload reference letters from major clients (Optional but highly
                recommended)
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload(e, setReferenceLetters, "reference_letter")
                }
              />
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors">
                <CloudArrowUpIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Upload</span>
              </div>
            </label>
          </div>

          {referenceLetters.length > 0 && (
            <div className="space-y-2">
              {referenceLetters.map((doc) => (
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
                    onClick={() => removeDocument(doc.id, setReferenceLetters)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* International Supply Experience */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                International Supply Experience? *
              </label>
              <select
                {...register("international_supply_experience", {
                  required: "Please select an option",
                })}
                className={`block w-full px-3 py-3.5 border ${
                  errors.international_supply_experience
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
              {errors.international_supply_experience && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.international_supply_experience.message}
                </p>
              )}
            </div>

            {internationalExperience === "yes" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  International Experience Details
                </label>
                <input
                  {...register("international_experience_details")}
                  type="text"
                  placeholder="Countries/regions, types of projects"
                  className="block w-full px-3 py-3.5 border border-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Case Studies */}
        <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-primary-500" />
                Case Studies / Success Stories
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Upload case studies or project success stories (Optional)
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload(e, setCaseStudies, "case_study")
                }
              />
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors">
                <CloudArrowUpIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Upload</span>
              </div>
            </label>
          </div>

          {caseStudies.length > 0 && (
            <div className="space-y-2">
              {caseStudies.map((doc) => (
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
                    onClick={() => removeDocument(doc.id, setCaseStudies)}
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
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
        <p className="text-sm text-primary-800">
          <strong>Tip:</strong> Strong references from reputable clients
          significantly improve your chances of approval. We may contact your
          references to verify the information provided.
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
