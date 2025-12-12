import { z } from "zod";

export const companyProfileSchema = z.object({
  company_overview: z
    .string()
    .min(10, "Company overview must be at least 10 characters")
    .max(2000, "Company overview must not exceed 2000 characters"),
  core_activities: z
    .string()
    .min(10, "Core activities must be at least 10 characters")
    .max(2000, "Core activities must not exceed 2000 characters"),
  industries_served: z
    .array(z.string())
    .min(1, "At least one industry is required"),
  products_services_offered: z.union([
    z.array(z.string()).min(1, "At least one product/service is required"),
    z.string().min(1, "Products/services offered is required"),
  ]),
  business_type: z.enum(
    ["manufacturer", "distributor", "agent", "hybrid"],
    "Please select a business type"
  ),
  countries_regions_supplied: z
    .array(z.string())
    .min(1, "At least one country/region is required"),
  production_service_capacity: z
    .string()
    .min(5, "Capacity description must be at least 5 characters")
    .max(1000, "Capacity description must not exceed 1000 characters"),
  minimum_order_quantities: z
    .string()
    .min(1, "Minimum order quantity is required")
    .max(500, "MOQ must not exceed 500 characters"),
  lead_times: z
    .string()
    .min(1, "Lead times is required")
    .max(500, "Lead times must not exceed 500 characters"),
  customization_capability: z.enum(
    ["yes", "no", "limited"],
    "Please select customization capability"
  ),
  customization_details: z.string().max(1000).optional(),
});

export type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;
