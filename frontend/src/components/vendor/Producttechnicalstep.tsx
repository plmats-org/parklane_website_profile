'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { ProductTechnicalInfo, VendorDocument } from '../types/vendor.types';
import { CloudArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface ProductTechnicalStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function ProductTechnicalStep({ data, onNext, onBack }: ProductTechnicalStepProps) {
  const [productCatalog, setProductCatalog] = useState<VendorDocument[]>(
    data.productTechnical?.productCatalog || []
  );
  const [specifications, setSpecifications] = useState<VendorDocument[]>(
    data.productTechnical?.specificationsDataSheets || []
  );
  const [msds, setMsds] = useState<VendorDocument[]>(data.productTechnical?.msds || []);
  const [rawMaterialCerts, setRawMaterialCerts] = useState<VendorDocument[]>(
    data.productTechnical?.rawMaterialCertifications || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ProductTechnicalInfo, 'productCatalog' | 'specificationsDataSheets' | 'msds' | 'rawMaterialCertifications'>>({
    defaultValues: data.productTechnical || {},
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<VendorDocument[]>>,
    category: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: VendorDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: category,
        category: 'product',
        file: file,
        required: category === 'product_catalog' || category === 'specifications',
        uploadedAt: new Date(),
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

  const onSubmit = (formData: any) => {
    onNext({
      productTechnical: {
        ...formData,
        productCatalog,
        specificationsDataSheets: specifications,
        msds,
        rawMaterialCertifications: rawMaterialCerts,
      },
    });
  };

  const renderDocumentSection = (
    title: string,
    description: string,
    documents: VendorDocument[],
    setter: React.Dispatch<React.SetStateAction<VendorDocument[]>>,
    category: string,
    required: boolean = false
  ) => (
    <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5 text-primary-500" />
            {title} {required && <span className="text-red-500">*</span>}
          </h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e, setter, category)}
          />
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-lg transition-colors">
            <CloudArrowUpIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Upload</span>
          </div>
        </label>
      </div>

      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                  <p className="text-xs text-slate-500">
                    Uploaded {doc.uploadedAt?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeDocument(doc.id, setter)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {required && documents.length === 0 && (
        <p className="text-sm text-amber-600 mt-2">⚠️ This document is required</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Product & Technical Information</h2>
        <p className="text-slate-600">
          Provide detailed technical information and documentation about your products.
        </p>
      </div>

      <div className="space-y-6">
        {/* Product Catalog */}
        {renderDocumentSection(
          'Product Catalog',
          'Upload your complete product catalog (PDF, JPG, PNG - Max 5MB)',
          productCatalog,
          setProductCatalog,
          'product_catalog',
          true
        )}

        {/* Technical Specifications */}
        {renderDocumentSection(
          'Technical Specifications & Data Sheets',
          'Upload technical specifications and data sheets for your products',
          specifications,
          setSpecifications,
          'specifications',
          true
        )}

        {/* HS Codes */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            HS Codes (Harmonized System Codes) *
          </label>
          <textarea
            {...register('hsCodes', { required: 'HS Codes are required' })}
            rows={3}
            placeholder="List HS codes for your main products (e.g., 8419.50, 8421.23)..."
            className={`block w-full px-3 py-3.5 border ${
              errors.hsCodes ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.hsCodes && (
            <p className="mt-1.5 text-sm text-red-600">{errors.hsCodes.message}</p>
          )}
          <p className="mt-1.5 text-xs text-slate-500">
            Separate multiple codes with commas or line breaks
          </p>
        </div>

        {/* MSDS */}
        {renderDocumentSection(
          'MSDS (Material Safety Data Sheets)',
          'Upload MSDS documents if applicable to your products',
          msds,
          setMsds,
          'msds',
          false
        )}

        {/* Warranty Terms */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Warranty Terms *
          </label>
          <textarea
            {...register('warrantyTerms', { required: 'Warranty terms are required' })}
            rows={4}
            placeholder="Describe your warranty terms, coverage period, conditions, and claim procedures..."
            className={`block w-full px-3 py-3.5 border ${
              errors.warrantyTerms ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.warrantyTerms && (
            <p className="mt-1.5 text-sm text-red-600">{errors.warrantyTerms.message}</p>
          )}
        </div>

        {/* Defective Goods Policy */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Defective Goods Policy *
          </label>
          <textarea
            {...register('defectiveGoodsPolicy', { required: 'Defective goods policy is required' })}
            rows={4}
            placeholder="Explain your policy for handling defective goods, returns, replacements, and refunds..."
            className={`block w-full px-3 py-3.5 border ${
              errors.defectiveGoodsPolicy ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.defectiveGoodsPolicy && (
            <p className="mt-1.5 text-sm text-red-600">{errors.defectiveGoodsPolicy.message}</p>
          )}
        </div>

        {/* Packaging Standards */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Packaging Standards *
          </label>
          <textarea
            {...register('packagingStandards', { required: 'Packaging standards are required' })}
            rows={3}
            placeholder="Describe your packaging materials, methods, standards, and any special handling requirements..."
            className={`block w-full px-3 py-3.5 border ${
              errors.packagingStandards ? 'border-red-300' : 'border-slate-300'
            } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
          />
          {errors.packagingStandards && (
            <p className="mt-1.5 text-sm text-red-600">{errors.packagingStandards.message}</p>
          )}
        </div>

        {/* Raw Material Certifications */}
        {renderDocumentSection(
          'Raw Material Certifications',
          'Upload certifications for raw materials used in your products (if applicable)',
          rawMaterialCerts,
          setRawMaterialCerts,
          'raw_material_certs',
          false
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Comprehensive technical documentation helps speed up the approval
          process and builds confidence with procurement teams.
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