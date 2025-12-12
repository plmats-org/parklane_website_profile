import { z } from "zod";

export const companyInformationSchema = z.object({
  registered_company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(255, "Company name must not exceed 255 characters"),
  trading_name: z.string().max(255).optional(),
  country_of_registration: z
    .string()
    .min(2, "Country of registration is required"),
  year_established: z
    .number({ message: "Year must be a number" })
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  company_registration_number: z
    .string()
    .min(1, "Registration number is required")
    .max(50, "Registration number must not exceed 50 characters"),
  registered_business_address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must not exceed 500 characters"),
  operational_address: z.string().max(500).optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  corporate_email: z.string().email("Invalid corporate email"),
  primary_contact_person_name: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(255, "Contact name must not exceed 255 characters"),
  contact_person_title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  phone_numbers: z
    .array(z.string().min(1, "Phone number is required"))
    .min(1, "At least one phone number is required"),
});

export type CompanyInformationFormValues = z.infer<
  typeof companyInformationSchema
>;
