'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { CompanyInformation } from '../types/vendor.types';
import { COUNTRIES } from '../../lib/constants';
import { BuildingOfficeIcon, EnvelopeIcon, PhoneIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface CompanyInformationStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export default function CompanyInformationStep({ data, onNext, isFirstStep }: CompanyInformationStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyInformation>({
    defaultValues: data.companyInformation || {
      phoneNumbers: [''],
    },
  });

  const onSubmit = (formData: CompanyInformation) => {
    onNext({ companyInformation: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Company Information</h2>
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
              {...register('registeredCompanyName', { required: 'Company name is required' })}
              type="text"
              placeholder="ABC Trading Company Ltd"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.registeredCompanyName ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.registeredCompanyName && (
            <p className="mt-1.5 text-sm text-red-600">{errors.registeredCompanyName.message}</p>
          )}
        </div>

        {/* Trading Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Trading Name (if different)
          </label>
          <input
            {...register('tradingName')}
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
              {...register('countryOfRegistration', { required: 'Country is required' })}
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.countryOfRegistration ? 'border-red-300' : 'border-slate-300'
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
          {errors.countryOfRegistration && (
            <p className="mt-1.5 text-sm text-red-600">{errors.countryOfRegistration.message}</p>
          )}
        </div>

        {/* Year Established */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Year Established *
          </label>
          <input
            {...register('yearEstablished', {
              required: 'Year is required',
              valueAsNumber: true,
              min: { value: 1900, message: 'Invalid year' },
              max: { value: new Date().getFullYear(), message: 'Cannot be in the future' },
            })}
            type="number"
            placeholder="2015"
            className={`block w-full px-3 py-3.5 border ${
              errors.yearEstablished ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.yearEstablished && (
            <p className="mt-1.5 text-sm text-red-600">{errors.yearEstablished.message}</p>
          )}
        </div>

        {/* Company Registration Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Company Registration Number *
          </label>
          <input
            {...register('companyRegistrationNumber', { required: 'Registration number is required' })}
            type="text"
            placeholder="REG/2015/12345"
            className={`block w-full px-3 py-3.5 border ${
              errors.companyRegistrationNumber ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.companyRegistrationNumber && (
            <p className="mt-1.5 text-sm text-red-600">{errors.companyRegistrationNumber.message}</p>
          )}
        </div>

        {/* Registered Business Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Registered Business Address *
          </label>
          <textarea
            {...register('registeredBusinessAddress', { required: 'Address is required' })}
            rows={3}
            placeholder="123 Business Street, District, City"
            className={`block w-full px-3 py-3.5 border ${
              errors.registeredBusinessAddress ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.registeredBusinessAddress && (
            <p className="mt-1.5 text-sm text-red-600">{errors.registeredBusinessAddress.message}</p>
          )}
        </div>

        {/* Operational Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Operational Address (if different from registered)
          </label>
          <textarea
            {...register('operationalAddress')}
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
            {...register('website', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/,
                message: 'Invalid URL',
              },
            })}
            type="url"
            placeholder="https://www.company.com"
            className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          {errors.website && <p className="mt-1.5 text-sm text-red-600">{errors.website.message}</p>}
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
              {...register('corporateEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="info@company.com"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.corporateEmail ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.corporateEmail && (
            <p className="mt-1.5 text-sm text-red-600">{errors.corporateEmail.message}</p>
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
              {...register('primaryContactPersonName', { required: 'Contact name is required' })}
              type="text"
              placeholder="John Doe"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.primaryContactPersonName ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.primaryContactPersonName && (
            <p className="mt-1.5 text-sm text-red-600">{errors.primaryContactPersonName.message}</p>
          )}
        </div>

        {/* Contact Person Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact Person Title/Role *
          </label>
          <input
            {...register('contactPersonTitle', { required: 'Title is required' })}
            type="text"
            placeholder="General Manager"
            className={`block w-full px-3 py-3.5 border ${
              errors.contactPersonTitle ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.contactPersonTitle && (
            <p className="mt-1.5 text-sm text-red-600">{errors.contactPersonTitle.message}</p>
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
              {...register('phoneNumbers.0', {
                required: 'At least one phone number is required',
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: 'Invalid phone number format',
                },
              })}
              type="tel"
              placeholder="+250788123456"
              className={`block w-full pl-10 pr-3 py-3.5 border ${
                errors.phoneNumbers?.[0] ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.phoneNumbers?.[0] && (
            <p className="mt-1.5 text-sm text-red-600">{errors.phoneNumbers[0].message}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Please ensure all information matches your official company registration
          documents. This information will be verified during the approval process.
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