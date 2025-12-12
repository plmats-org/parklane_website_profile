import { z } from "zod";

// Re-export all schemas
export * from "./document.schema";
export * from "./major-client.schema";
export * from "./company-information.schema";
export * from "./company-profile.schema";
export * from "./certifications.schema";
export * from "./product-technical.schema";
export * from "./commercial-financial.schema";
export * from "./logistics.schema";
export * from "./legal-risk.schema";
export * from "./sustainability.schema";
export * from "./references.schema";
export * from "./additional.schema";

// Import for complete form schema
import { companyInformationSchema } from "./company-information.schema";
import { companyProfileSchema } from "./company-profile.schema";
import { certificationsSchema } from "./certifications.schema";
import { productTechnicalSchema } from "./product-technical.schema";
import { commercialFinancialSchema } from "./commercial-financial.schema";
import { logisticsSchema } from "./logistics.schema";
import { legalRiskSchema } from "./legal-risk.schema";
import { sustainabilitySchema } from "./sustainability.schema";
import { referencesSchema } from "./references.schema";
import { additionalSchema } from "./additional.schema";

// Complete Vendor Form Schema
export const vendorFormSchema = z.object({
  company_information: companyInformationSchema,
  company_profile: companyProfileSchema,
  certifications: certificationsSchema.optional(),
  product_technical: productTechnicalSchema.optional(),
  commercial_financial: commercialFinancialSchema.optional(),
  logistics: logisticsSchema.optional(),
  legal_risk: legalRiskSchema.optional(),
  sustainability: sustainabilitySchema.optional(),
  references: referencesSchema.optional(),
  additional: additionalSchema.optional(),
});

export type VendorFormValues = z.infer<typeof vendorFormSchema>;

// Export all schemas as a collection
export const vendorSchemas = {
  companyInformation: companyInformationSchema,
  companyProfile: companyProfileSchema,
  certifications: certificationsSchema,
  productTechnical: productTechnicalSchema,
  commercialFinancial: commercialFinancialSchema,
  logistics: logisticsSchema,
  legalRisk: legalRiskSchema,
  sustainability: sustainabilitySchema,
  references: referencesSchema,
  additional: additionalSchema,
  vendorForm: vendorFormSchema,
};

export default vendorSchemas;
