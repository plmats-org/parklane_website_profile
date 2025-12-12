import { z } from "zod";

export const majorClientSchema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  country: z.string().min(1, "Country is required"),
  products_supplied: z.string().min(1, "Products supplied is required"),
  duration_of_relationship: z.string().min(1, "Duration is required"),
  annual_volume: z.string().optional(),
  contact_person: z.string().optional(),
  contact_email: z.string().email("Invalid email").optional().or(z.literal("")),
  contact_phone: z.string().optional(),
});

export type MajorClientFormValues = z.infer<typeof majorClientSchema>;
