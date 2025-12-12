import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";

export const commercialFinancialSchema = z.object({
  pricing_structure: z.string().max(1000).optional(),
  payment_terms: z.array(z.string()).optional(),
  credit_terms_available: z.enum(["yes", "no"]).optional(),
  credit_terms_details: z.string().max(1000).optional(),
  bank_name: z.string().max(255).optional(),
  bank_account_number: z.string().max(50).optional(),
  bank_account_name: z.string().max(255).optional(),
  bank_branch_name: z.string().max(255).optional(),
  swift_code: z.string().max(20).optional(),
  iban: z.string().max(50).optional(),
  financial_stability_documents: z.array(vendorDocumentSchema).optional(),
  volume_discounts_available: z.enum(["yes", "no"]).optional(),
  volume_discount_details: z.string().max(1000).optional(),
  long_term_pricing_agreements: z.enum(["yes", "no"]).optional(),
});

export type CommercialFinancialFormValues = z.infer<
  typeof commercialFinancialSchema
>;
