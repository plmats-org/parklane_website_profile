"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { VendorFormData } from "../../types/vendor.types";
import { REGISTRATION_STEPS } from "../../lib/constants";
import { useRegisterVendor } from "@/hooks";
import {
  CompanyInformationStep,
  CompanyProfileStep,
  CertificationsStep,
  ProductTechnicalStep,
  CommercialFinancialStep,
  LogisticsStep,
  LegalRiskStep,
  SustainabilityStep,
  ReferencesStep,
  AdditionalInfoStep,
  ReviewSubmitStep,
  Successscreen,
} from "../../components/vendor";
import Navbar from "@/components/navbar";

export default function VendorRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<VendorFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const registerVendorMutation = useRegisterVendor();

  const handleNext = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    if (currentStep < REGISTRATION_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    try {
      await registerVendorMutation.mutateAsync(formData as VendorFormData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (isSubmitted) {
    return <Successscreen onReturnHome={() => router.push("/")} />;
  }

  const currentStepConfig = REGISTRATION_STEPS[currentStep - 1];

  const renderStep = () => {
    const commonProps = {
      data: formData,
      onNext: handleNext,
      onBack: handleBack,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === REGISTRATION_STEPS.length,
    };

    switch (currentStep) {
      case 1:
        return <CompanyInformationStep {...commonProps} />;
      case 2:
        return <CompanyProfileStep {...commonProps} />;
      case 3:
        return <CertificationsStep {...commonProps} />;
      case 4:
        return <ProductTechnicalStep {...commonProps} />;
      case 5:
        return <CommercialFinancialStep {...commonProps} />;
      case 6:
        return <LogisticsStep {...commonProps} />;
      case 7:
        return <LegalRiskStep {...commonProps} />;
      case 8:
        return <SustainabilityStep {...commonProps} />;
      case 9:
        return <ReferencesStep {...commonProps} />;
      case 10:
        return <AdditionalInfoStep {...commonProps} />;
      case 11:
        return (
          <ReviewSubmitStep
            data={formData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={registerVendorMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / REGISTRATION_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative h-[50vh] bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1666018215790-867b14fe4822?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/20"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white mb-3">
              Vendor Registration
            </h1>
            <p className=" text-slate-300 max-w-2xl">
              Join our network of trusted suppliers and partners. Complete the
              registration process to start doing business with Parklane
              Materials.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Step Info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-600">
                  Step {currentStep} of {REGISTRATION_STEPS.length}
                </p>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {currentStepConfig.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Progress</p>
                <p className="text-xl font-semibold text-primary-600 mt-1">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>

            {/* Progress Line with Circles */}
            <div className="relative">
              {/* Background Line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200"></div>

              {/* Progress Line */}
              <motion.div
                className="absolute top-5 left-0 h-1 bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              ></motion.div>

              {/* Step Circles */}
              <div className="relative flex justify-between">
                {REGISTRATION_STEPS.map((step) => {
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor:
                            isCompleted || isCurrent ? "#a68b56" : "#e2e8f0",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 ${
                          isCompleted || isCurrent
                            ? "text-white"
                            : "text-slate-600"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span className="text-sm font-bold">{step.id}</span>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
