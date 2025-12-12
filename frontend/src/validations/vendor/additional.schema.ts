import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";

export const additionalSchema = z.object({
  exclusive_partnerships_interest: z.enum(["yes", "no"]).optional(),
  exclusive_partnerships_details: z.string().max(1000).optional(),
  jv_distribution_collaboration_interest: z.enum(["yes", "no"]).optional(),
  jv_collaboration_details: z.string().max(1000).optional(),
  preferred_supplier_program_interest: z.enum(["yes", "no"]).optional(),
  additional_documents: z.array(vendorDocumentSchema).optional(),
  additional_comments: z.string().max(2000).optional(),
});

export type AdditionalFormValues = z.infer<typeof additionalSchema>;
