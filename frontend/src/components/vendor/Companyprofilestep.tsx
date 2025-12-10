'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { CompanyProfileCapabilities } from '../types/vendor.types';
import { BUSINESS_TYPES, INDUSTRIES, COUNTRIES, CUSTOMIZATION_OPTIONS } from '../../lib/constants';

interface CompanyProfileStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function CompanyProfileStep({ data, onNext, onBack }: CompanyProfileStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyProfileCapabilities>({
    defaultValues: data.companyProfile || {},
  });

  const customizationCapability = watch('customizationCapability');

  const onSubmit = (formData: CompanyProfileCapabilities) => {
    onNext({ companyProfile: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Company Profile & Capabilities</h2>
        <p className="text-slate-600">
          Tell us about your business operations, capabilities, and what you offer.
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Overview */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Company Overview *
          </label>
          <textarea
            {...register('companyOverview', { required: 'Company overview is required' })}
            rows={4}
            placeholder="Provide a brief overview of your company, its history, mission, and key strengths..."
            className={`block w-full px-3 py-3.5 border ${
              errors.companyOverview ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.companyOverview && (
            <p className="mt-1.5 text-sm text-red-600">{errors.companyOverview.message}</p>
          )}
        </div>

        {/* Core Activities */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Core Activities *
          </label>
          <textarea
            {...register('coreActivities', { required: 'Core activities are required' })}
            rows={3}
            placeholder="Describe your main business activities and operations..."
            className={`block w-full px-3 py-3.5 border ${
              errors.coreActivities ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.coreActivities && (
            <p className="mt-1.5 text-sm text-red-600">{errors.coreActivities.message}</p>
          )}
        </div>

        {/* Industries Served */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Industries Served * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
            {INDUSTRIES.map((industry) => (
              <label key={industry} className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  value={industry}
                  {...register('industriesServed', { required: 'Select at least one industry' })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{industry}</span>
              </label>
            ))}
          </div>
          {errors.industriesServed && (
            <p className="mt-1.5 text-sm text-red-600">{errors.industriesServed.message}</p>
          )}
        </div>

        {/* Products/Services Offered */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            List of Products/Services Offered *
          </label>
          <textarea
            {...register('productsServicesOffered', { required: 'Products/services list is required' })}
            rows={4}
            placeholder="List your main products or services (e.g., Industrial Equipment, Construction Materials, etc.)"
            className={`block w-full px-3 py-3.5 border ${
              errors.productsServicesOffered ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.productsServicesOffered && (
            <p className="mt-1.5 text-sm text-red-600">{errors.productsServicesOffered.message}</p>
          )}
          <p className="mt-1.5 text-xs text-slate-500">Separate multiple items with commas or line breaks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Business Type *
            </label>
            <select
              {...register('businessType', { required: 'Business type is required' })}
              className={`block w-full px-3 py-3.5 border ${
                errors.businessType ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.businessType && (
              <p className="mt-1.5 text-sm text-red-600">{errors.businessType.message}</p>
            )}
          </div>

          {/* Customization Capability */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Customization Capability *
            </label>
            <select
              {...register('customizationCapability', { required: 'Please select customization capability' })}
              className={`block w-full px-3 py-3.5 border ${
                errors.customizationCapability ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="">Select option</option>
              {CUSTOMIZATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.customizationCapability && (
              <p className="mt-1.5 text-sm text-red-600">{errors.customizationCapability.message}</p>
            )}
          </div>
        </div>

        {/* Customization Details (conditional) */}
        {(customizationCapability === 'yes' || customizationCapability === 'limited') && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Customization Details
            </label>
            <textarea
              {...register('customizationDetails')}
              rows={3}
              placeholder="Describe what types of customization you can provide..."
              className="block w-full px-3 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* Countries/Regions Supplied */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Countries/Regions You Supply To * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
            {COUNTRIES.map((country) => (
              <label key={country} className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  value={country}
                  {...register('countriesRegionsSupplied', { required: 'Select at least one country' })}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{country}</span>
              </label>
            ))}
          </div>
          {errors.countriesRegionsSupplied && (
            <p className="mt-1.5 text-sm text-red-600">{errors.countriesRegionsSupplied.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Production/Service Capacity */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Production/Service Capacity *
            </label>
            <input
              {...register('productionServiceCapacity', { required: 'Capacity is required' })}
              type="text"
              placeholder="e.g., 10,000 units/month"
              className={`block w-full px-3 py-3.5 border ${
                errors.productionServiceCapacity ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
            {errors.productionServiceCapacity && (
              <p className="mt-1.5 text-sm text-red-600">{errors.productionServiceCapacity.message}</p>
            )}
          </div>

          {/* Minimum Order Quantities */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Minimum Order Quantities (MOQs) *
            </label>
            <input
              {...register('minimumOrderQuantities', { required: 'MOQ is required' })}
              type="text"
              placeholder="e.g., 100 units or No minimum"
              className={`block w-full px-3 py-3.5 border ${
                errors.minimumOrderQuantities ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
            {errors.minimumOrderQuantities && (
              <p className="mt-1.5 text-sm text-red-600">{errors.minimumOrderQuantities.message}</p>
            )}
          </div>

          {/* Lead Times */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Standard Lead Times *
            </label>
            <input
              {...register('leadTimes', { required: 'Lead times are required' })}
              type="text"
              placeholder="e.g., 2-4 weeks for standard orders"
              className={`block w-full px-3 py-3.5 border ${
                errors.leadTimes ? 'border-red-300' : 'border-slate-300'
              } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            />
            {errors.leadTimes && (
              <p className="mt-1.5 text-sm text-red-600">{errors.leadTimes.message}</p>
            )}
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