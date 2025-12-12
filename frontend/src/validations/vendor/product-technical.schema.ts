import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";

export const productTechnicalSchema = z.object({
  product_catalog: z.array(vendorDocumentSchema).optional(),
  specifications_data_sheets: z.array(vendorDocumentSchema).optional(),
  hs_codes: z.union([z.array(z.string()), z.string()]).optional(),
  msds: z.array(vendorDocumentSchema).optional(),
  warranty_terms: z.string().max(1000).optional(),
  defective_goods_policy: z.string().max(1000).optional(),
  packaging_standards: z.string().max(1000).optional(),
  raw_material_certifications: z.array(vendorDocumentSchema).optional(),
});

export type ProductTechnicalFormValues = z.infer<typeof productTechnicalSchema>;
