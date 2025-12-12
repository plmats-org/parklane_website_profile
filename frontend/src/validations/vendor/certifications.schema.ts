import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";

export const certificationsSchema = z.object({
  iso_certifications: z.array(z.string()).optional(),
  industry_specific_certifications: z.array(z.string()).optional(),
  quality_control_systems: z.string().max(1000).optional(),
  environmental_safety_compliance: z
    .union([z.array(z.string()), z.string()])
    .optional(),
  regulatory_approvals: z.union([z.array(z.string()), z.string()]).optional(),
  export_import_licenses: z.union([z.array(z.string()), z.string()]).optional(),
  certification_documents: z.array(vendorDocumentSchema).optional(),
});

export type CertificationsFormValues = z.infer<typeof certificationsSchema>;
