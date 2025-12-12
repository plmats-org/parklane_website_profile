"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { CompanyInformation } from "../../types/vendor.types";
import {
  companyInformationSchema,
  type CompanyInformationFormValues,
} from "../../validations/vendor.schema";
import { COUNTRIES } from "../../lib/constants";
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface CompanyInformationStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export default function CompanyInformationStep({
  data,
  onNext,
  isFirstStep,
}: CompanyInformationStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyInformationFormValues>({
    resolver: zodResolver(companyInformationSchema),
    defaultValues: data.company_information || {
      phone_numbers: [""],
    },
  });

  const onSubmit = (formData: CompanyInformationFormValues) => {
    onNext({ company_information: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Company Information
        </h2>
        <p className="text-slate-600">
          Provide your company's official registration and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registered Company Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Registered Company Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BuildingOfficeIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              {...register("registered_company_name", {
                required: "Company name is required",
              })}
              type="text"
              placeholder="ABC Trading Company Ltd"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.registered_company_name
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.registered_company_name && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.registered_company_name.message}
            </p>
          )}
        </div>

        {/* Trading Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Trading Name (if different)
          </label>
          <input
            {...register("trading_name")}
            type="text"
            placeholder="ABC Trade"
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Country of Registration */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Country of Registration *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GlobeAltIcon className="h-5 w-5 text-slate-400" />
            </div>
            <select
              {...register("country_of_registration", {
                required: "Country is required",
              })}
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.country_of_registration
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          {errors.country_of_registration && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.country_of_registration.message}
            </p>
          )}
        </div>

        {/* Year Established */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Year Established *
          </label>
          <input
            {...register("year_established", {
              required: "Year is required",
              valueAsNumber: true,
              min: { value: 1900, message: "Invalid year" },
              max: {
                value: new Date().getFullYear(),
                message: "Cannot be in the future",
              },
            })}
            type="number"
            placeholder="2015"
            className={`block w-full px-3 py-3.5 border ${
              errors.year_established ? "border-red-300" : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.year_established && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.year_established.message}
            </p>
          )}
        </div>

        {/* Company Registration Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Company Registration Number *
          </label>
          <input
            {...register("company_registration_number", {
              required: "Registration number is required",
            })}
            type="text"
            placeholder="REG/2015/12345"
            className={`block w-full px-3 py-3.5 border ${
              errors.company_registration_number
                ? "border-red-300"
                : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.company_registration_number && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.company_registration_number.message}
            </p>
          )}
        </div>

        {/* Registered Business Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Registered Business Address *
          </label>
          <textarea
            {...register("registered_business_address", {
              required: "Address is required",
            })}
            rows={3}
            placeholder="123 Business Street, District, City"
            className={`block w-full px-3 py-3.5 border ${
              errors.registered_business_address
                ? "border-red-300"
                : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.registered_business_address && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.registered_business_address.message}
            </p>
          )}
        </div>

        {/* Operational Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Operational Address (if different from registered)
          </label>
          <textarea
            {...register("operational_address")}
            rows={3}
            placeholder="456 Operations Avenue, District, City"
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Website
          </label>
          <input
            {...register("website", {
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/,
                message: "Invalid URL",
              },
            })}
            type="url"
            placeholder="https://www.company.com"
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          {errors.website && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Corporate Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Corporate Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              {...register("corporate_email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="info@company.com"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.corporate_email ? "border-red-300" : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.corporate_email && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.corporate_email.message}
            </p>
          )}
        </div>

        {/* Primary Contact Person Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Primary Contact Person Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              {...register("primary_contact_person_name", {
                required: "Contact name is required",
              })}
              type="text"
              placeholder="John Doe"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.primary_contact_person_name
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.primary_contact_person_name && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.primary_contact_person_name.message}
            </p>
          )}
        </div>

        {/* Contact Person Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact Person Title/Role *
          </label>
          <input
            {...register("contact_person_title", {
              required: "Title is required",
            })}
            type="text"
            placeholder="General Manager"
            className={`block w-full px-3 py-3.5 border ${
              errors.contact_person_title
                ? "border-red-300"
                : "border-slate-300"
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.contact_person_title && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.contact_person_title.message}
            </p>
          )}
        </div>

        {/* Phone Numbers */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number(s) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              {...register("phone_numbers.0", {
                required: "At least one phone number is required",
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: "Invalid phone number format",
                },
              })}
              type="tel"
              placeholder="+250788123456"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.phone_numbers?.[0]
                  ? "border-red-300"
                  : "border-slate-300"
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.phone_numbers?.[0] && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.phone_numbers[0].message}
            </p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Please ensure all information matches your
          official company registration documents. This information will be
          verified during the approval process.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
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
