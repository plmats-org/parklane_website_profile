import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";

export const sustainabilitySchema = z.object({
  environmental_policies: z.enum(["yes", "no"]).optional(),
  environmental_policy_document: vendorDocumentSchema.nullable().optional(),
  waste_management: z.string().max(1000).optional(),
  ethical_sourcing: z.enum(["yes", "no"]).optional(),
  ethical_sourcing_details: z.string().max(1000).optional(),
  social_responsibility: z.string().max(1000).optional(),
  labor_rights_compliance: z.enum(["yes", "no"]).optional(),
  labor_rights_document: vendorDocumentSchema.nullable().optional(),
});

export type SustainabilityFormValues = z.infer<typeof sustainabilitySchema>;
