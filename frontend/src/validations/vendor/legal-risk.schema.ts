import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";

export const legalRiskSchema = z.object({
  anti_bribery_compliance: z.enum(["yes", "no"]).optional(),
  anti_bribery_policy_document: vendorDocumentSchema.nullable().optional(),
  aml_compliance: z.enum(["yes", "no"]).optional(),
  aml_policy_document: vendorDocumentSchema.nullable().optional(),
  sanctions_check_confirmation: z.boolean().optional(),
  product_liability_insurance: z.enum(["yes", "no"]).optional(),
  insurance_document: vendorDocumentSchema.nullable().optional(),
  nda_acceptance: z.boolean().optional(),
  supplier_code_of_conduct_approval: z.boolean().optional(),
});

export type LegalRiskFormValues = z.infer<typeof legalRiskSchema>;
