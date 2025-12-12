import { z } from "zod";

export const logisticsSchema = z.object({
  country_of_origin: z.array(z.string()).optional(),
  incoterms_used: z.array(z.string()).optional(),
  shipping_methods: z.array(z.string()).optional(),
  international_documentation_capability: z.enum(["yes", "no"]).optional(),
  standard_lead_times: z.string().max(500).optional(),
  urgent_delivery_capability: z.enum(["yes", "no"]).optional(),
  urgent_delivery_details: z.string().max(1000).optional(),
  warehousing_options: z.enum(["yes", "no"]).optional(),
  warehousing_details: z.string().max(1000).optional(),
});

export type LogisticsFormValues = z.infer<typeof logisticsSchema>;
