import Joi from "joi";

const vendorDocumentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  category: Joi.string()
    .valid(
      "incorporation",
      "certification",
      "product",
      "financial",
      "legal",
      "reference",
      "other"
    )
    .required(),
  url: Joi.string().uri().optional().allow("", null), // Allow empty or null for files not yet uploaded
  uploaded_at: Joi.alternatives()
    .try(
      Joi.date(),
      Joi.object(), // Allow empty object from frontend
      Joi.string().allow("")
    )
    .optional(),
  required: Joi.boolean().required(),
  file: Joi.any().optional(), // Allow file object from frontend
});

const majorClientSchema = Joi.object({
  client_name: Joi.string().required(),
  country: Joi.string().required(),
  products_supplied: Joi.string().required(),
  duration_of_relationship: Joi.string().required(),
  annual_volume: Joi.string().optional().allow(""),
  contact_person: Joi.string().optional().allow(""),
  contact_email: Joi.string().email().optional().allow(""),
  contact_phone: Joi.string().optional().allow(""),
});

const companyInformationSchema = Joi.object({
  registered_company_name: Joi.string().required().min(2).max(255),
  trading_name: Joi.string().optional().max(255),
  country_of_registration: Joi.string().required().min(2),
  year_established: Joi.number()
    .required()
    .min(1900)
    .max(new Date().getFullYear()),
  company_registration_number: Joi.string().required().min(1).max(50),
  registered_business_address: Joi.string().required().min(5).max(500),
  operational_address: Joi.string().optional().max(500),
  website: Joi.string().uri().optional(),
  corporate_email: Joi.string().email().required(),
  primary_contact_person_name: Joi.string().required().min(2).max(255),
  contact_person_title: Joi.string().required().min(2).max(100),
  phone_numbers: Joi.array().items(Joi.string()).min(1).required(),
});

const companyProfileSchema = Joi.object({
  company_overview: Joi.string().required().min(10).max(2000),
  core_activities: Joi.string().required().min(10).max(2000),
  industries_served: Joi.array().items(Joi.string()).min(1).required(),
  products_services_offered: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string()).min(1),
      Joi.string().min(1) // Allow string from frontend
    )
    .required(),
  business_type: Joi.string()
    .valid("manufacturer", "distributor", "agent", "hybrid")
    .required(),
  countries_regions_supplied: Joi.array().items(Joi.string()).min(1).required(),
  production_service_capacity: Joi.string().required().min(5).max(1000),
  minimum_order_quantities: Joi.string().required().min(1).max(500),
  lead_times: Joi.string().required().min(1).max(500),
  customization_capability: Joi.string()
    .valid("yes", "no", "limited")
    .required(),
  customization_details: Joi.string().optional().allow("", null).max(1000),
});

const certificationsSchema = Joi.object({
  iso_certifications: Joi.array().items(Joi.string()).optional(),
  industry_specific_certifications: Joi.array().items(Joi.string()).optional(),
  quality_control_systems: Joi.string().optional().allow("", null).max(1000),
  environmental_safety_compliance: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string().allow(""))
    .optional(),
  regulatory_approvals: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string().allow(""))
    .optional(),
  export_import_licenses: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string().allow(""))
    .optional(),
  certification_documents: Joi.array().items(vendorDocumentSchema).optional(),
});

const productTechnicalSchema = Joi.object({
  product_catalog: Joi.array().items(vendorDocumentSchema).optional(),
  specifications_data_sheets: Joi.array()
    .items(vendorDocumentSchema)
    .optional(),
  hs_codes: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string().allow(""))
    .optional(),
  msds: Joi.array().items(vendorDocumentSchema).optional(),
  warranty_terms: Joi.string().optional().allow("", null).max(1000),
  defective_goods_policy: Joi.string().optional().allow("", null).max(1000),
  packaging_standards: Joi.string().optional().allow("", null).max(1000),
  raw_material_certifications: Joi.array()
    .items(vendorDocumentSchema)
    .optional(),
});

const commercialFinancialSchema = Joi.object({
  pricing_structure: Joi.string().optional().allow("").max(1000),
  payment_terms: Joi.array().items(Joi.string()).optional(),
  credit_terms_available: Joi.string().valid("yes", "no").optional(),
  credit_terms_details: Joi.string().optional().allow("").max(1000),
  bank_name: Joi.string().optional().max(255),
  bank_account_number: Joi.string().optional().max(50),
  bank_account_name: Joi.string().optional().max(255),
  bank_branch_name: Joi.string().optional().max(255),
  swift_code: Joi.string().optional().max(20),
  iban: Joi.string().optional().max(50),
  financial_stability_documents: Joi.array()
    .items(vendorDocumentSchema)
    .optional(),
  volume_discounts_available: Joi.string().valid("yes", "no").optional(),
  volume_discount_details: Joi.string().optional().allow("").max(1000),
  long_term_pricing_agreements: Joi.string().valid("yes", "no").optional(),
});

const logisticsSchema = Joi.object({
  country_of_origin: Joi.array().items(Joi.string()).optional(),
  incoterms_used: Joi.array().items(Joi.string()).optional(),
  shipping_methods: Joi.array().items(Joi.string()).optional(),
  international_documentation_capability: Joi.string()
    .valid("yes", "no")
    .optional(),
  standard_lead_times: Joi.string().optional().allow("").max(500),
  urgent_delivery_capability: Joi.string().valid("yes", "no").optional(),
  urgent_delivery_details: Joi.string().optional().allow("").max(1000),
  warehousing_options: Joi.string().valid("yes", "no").optional(),
  warehousing_details: Joi.string().optional().allow("").max(1000),
});

const legalRiskSchema = Joi.object({
  anti_bribery_compliance: Joi.string().valid("yes", "no").optional(),
  anti_bribery_policy_document: Joi.alternatives()
    .try(vendorDocumentSchema, Joi.allow(null))
    .optional(),
  aml_compliance: Joi.string().valid("yes", "no").optional(),
  aml_policy_document: Joi.alternatives()
    .try(vendorDocumentSchema, Joi.allow(null))
    .optional(),
  sanctions_check_confirmation: Joi.boolean().optional(),
  product_liability_insurance: Joi.string().valid("yes", "no").optional(),
  insurance_document: Joi.alternatives()
    .try(vendorDocumentSchema, Joi.allow(null))
    .optional(),
  nda_acceptance: Joi.boolean().optional(),
  supplier_code_of_conduct_approval: Joi.boolean().optional(),
});

const sustainabilitySchema = Joi.object({
  environmental_policies: Joi.string().valid("yes", "no").optional(),
  environmental_policy_document: Joi.alternatives()
    .try(vendorDocumentSchema, Joi.allow(null))
    .optional(),
  waste_management: Joi.string().optional().allow("", null).max(1000),
  ethical_sourcing: Joi.string().valid("yes", "no").optional(),
  ethical_sourcing_details: Joi.string().optional().allow("", null).max(1000),
  social_responsibility: Joi.string().optional().allow("", null).max(1000),
  labor_rights_compliance: Joi.string().valid("yes", "no").optional(),
  labor_rights_document: Joi.alternatives()
    .try(vendorDocumentSchema, Joi.allow(null))
    .optional(),
});

const referencesSchema = Joi.object({
  major_clients_list: Joi.array().items(majorClientSchema).optional(),
  reference_letters: Joi.array().items(vendorDocumentSchema).optional(),
  international_supply_experience: Joi.string().valid("yes", "no").optional(),
  international_experience_details: Joi.string()
    .optional()
    .allow("", null)
    .max(1000),
  case_studies: Joi.array().items(vendorDocumentSchema).optional(),
});

const additionalSchema = Joi.object({
  exclusive_partnerships_interest: Joi.string().valid("yes", "no").optional(),
  exclusive_partnerships_details: Joi.string()
    .optional()
    .allow("", null)
    .max(1000),
  jv_distribution_collaboration_interest: Joi.string()
    .valid("yes", "no")
    .optional(),
  jv_collaboration_details: Joi.string().optional().allow("", null).max(1000),
  preferred_supplier_program_interest: Joi.string()
    .valid("yes", "no")
    .optional(),
  additional_documents: Joi.array().items(vendorDocumentSchema).optional(),
  additional_comments: Joi.string().optional().allow("", null).max(2000),
});

export const createVendor = Joi.object({
  company_information: companyInformationSchema.required(),
  company_profile: companyProfileSchema.required(),
  certifications: certificationsSchema.optional(),
  product_technical: productTechnicalSchema.optional(),
  commercial_financial: commercialFinancialSchema.optional(),
  logistics: logisticsSchema.optional(),
  legal_risk: legalRiskSchema.optional(),
  sustainability: sustainabilitySchema.optional(),
  references: referencesSchema.optional(),
  additional: additionalSchema.optional(),
});

export const updateVendor = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "rejected", "on_hold", "suspended")
    .optional(),
  rejection_reason: Joi.string()
    .optional()
    .max(1000)
    .when("status", {
      is: "rejected",
      then: Joi.string().required().max(1000),
      otherwise: Joi.string().optional().max(1000),
    }),
  note: Joi.string().optional().min(1).max(2000),
});

export const queryVendors = Joi.object({
  page: Joi.number().optional().min(1),
  limit: Joi.number().optional().min(1).max(100),
  status: Joi.string()
    .valid("pending", "approved", "rejected", "on_hold", "suspended")
    .optional(),
  business_type: Joi.string()
    .valid("manufacturer", "distributor", "agent", "hybrid")
    .optional(),
  country: Joi.string().optional(),
  search: Joi.string().optional().max(255),
  email: Joi.string().email().optional(),
  sort: Joi.string().optional(),
});
