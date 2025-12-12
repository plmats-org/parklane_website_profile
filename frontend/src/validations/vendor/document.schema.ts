import { z } from "zod";

export const vendorDocumentSchema = z.object({
  id: z.string().min(1, "Document ID is required"),
  name: z.string().min(1, "Document name is required"),
  type: z.string().min(1, "Document type is required"),
  category: z.enum([
    "incorporation",
    "certification",
    "product",
    "financial",
    "legal",
    "reference",
    "other",
  ]),
  url: z.string().url().optional().or(z.literal("")).or(z.null()),
  uploaded_at: z.union([z.date(), z.string(), z.object({})]).optional(),
  required: z.boolean(),
  file: z.any().optional(),
});

export type VendorDocumentFormValues = z.infer<typeof vendorDocumentSchema>;
