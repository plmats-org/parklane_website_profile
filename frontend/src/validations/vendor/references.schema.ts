import { z } from "zod";
import { vendorDocumentSchema } from "./document.schema";
import { majorClientSchema } from "./major-client.schema";

export const referencesSchema = z.object({
  major_clients_list: z.array(majorClientSchema).optional(),
  reference_letters: z.array(vendorDocumentSchema).optional(),
  international_supply_experience: z.enum(["yes", "no"]).optional(),
  international_experience_details: z.string().max(1000).optional(),
  case_studies: z.array(vendorDocumentSchema).optional(),
});

export type ReferencesFormValues = z.infer<typeof referencesSchema>;
