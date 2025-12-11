import { Document } from "mongoose";

export interface CompanyInformation {
  registered_company_name: string;
  trading_name?: string;
  country_of_registration: string;
  year_established: number;
  company_registration_number: string;
  registered_business_address: string;
  operational_address?: string;
  website?: string;
  corporate_email: string;
  primary_contact_person_name: string;
  contact_person_title: string;
  phone_numbers: string[];
}

export interface CompanyProfileCapabilities {
  company_overview: string;
  core_activities: string;
  industries_served: string[];
  products_services_offered: string[];
  business_type: "manufacturer" | "distributor" | "agent" | "hybrid";
  countries_regions_supplied: string[];
  production_service_capacity: string;
  minimum_order_quantities: string;
  lead_times: string;
  customization_capability: "yes" | "no" | "limited";
  customization_details?: string;
}

export interface CertificationsCompliance {
  iso_certifications: string[];
  industry_specific_certifications: string[];
  quality_control_systems: string;
  environmental_safety_compliance: string[];
  regulatory_approvals: string[];
  export_import_licenses: string[];
  certification_documents: VendorDocument[];
}

export interface ProductTechnicalInfo {
  product_catalog: VendorDocument[];
  specifications_data_sheets: VendorDocument[];
  hs_codes: string[];
  msds?: VendorDocument[];
  warranty_terms: string;
  defective_goods_policy: string;
  packaging_standards: string;
  raw_material_certifications: VendorDocument[];
}

export interface CommercialFinancialInfo {
  pricing_structure: string;
  payment_terms: string[];
  credit_terms_available: "yes" | "no";
  credit_terms_details?: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  bank_branch_name: string;
  swift_code?: string;
  iban?: string;
  financial_stability_documents: VendorDocument[];
  volume_discounts_available: "yes" | "no";
  volume_discount_details?: string;
  long_term_pricing_agreements: "yes" | "no";
}

export interface LogisticsFulfillment {
  country_of_origin: string[];
  incoterms_used: string[];
  shipping_methods: string[];
  international_documentation_capability: "yes" | "no";
  standard_lead_times: string;
  urgent_delivery_capability: "yes" | "no";
  urgent_delivery_details?: string;
  warehousing_options: "yes" | "no";
  warehousing_details?: string;
}

export interface LegalRiskRequirements {
  anti_bribery_compliance: "yes" | "no";
  anti_bribery_policy_document?: VendorDocument;
  aml_compliance: "yes" | "no";
  aml_policy_document?: VendorDocument;
  sanctions_check_confirmation: boolean;
  product_liability_insurance: "yes" | "no";
  insurance_document?: VendorDocument;
  nda_acceptance: boolean;
  supplier_code_of_conduct_approval: boolean;
}

export interface SustainabilityESG {
  environmental_policies: "yes" | "no";
  environmental_policy_document?: VendorDocument;
  waste_management: string;
  ethical_sourcing: "yes" | "no";
  ethical_sourcing_details?: string;
  social_responsibility: string;
  labor_rights_compliance: "yes" | "no";
  labor_rights_document?: VendorDocument;
}

export interface ReferencesPastPerformance {
  major_clients_list: MajorClient[];
  reference_letters: VendorDocument[];
  international_supply_experience: "yes" | "no";
  international_experience_details?: string;
  case_studies: VendorDocument[];
}

export interface MajorClient {
  client_name: string;
  country: string;
  products_supplied: string;
  duration_of_relationship: string;
  annual_volume?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface AdditionalInformation {
  exclusive_partnerships_interest: "yes" | "no";
  exclusive_partnerships_details?: string;
  jv_distribution_collaboration_interest: "yes" | "no";
  jv_collaboration_details?: string;
  preferred_supplier_program_interest: "yes" | "no";
  additional_documents: VendorDocument[];
  additional_comments?: string;
}

export interface VendorDocument {
  id: string;
  name: string;
  type: string;
  category:
    | "incorporation"
    | "certification"
    | "product"
    | "financial"
    | "legal"
    | "reference"
    | "other";
  url: string;
  uploaded_at?: Date;
  required: boolean;
}

export interface IVendor extends Document {
  company_information: CompanyInformation;
  company_profile: CompanyProfileCapabilities;
  certifications: CertificationsCompliance;
  product_technical: ProductTechnicalInfo;
  commercial_financial: CommercialFinancialInfo;
  logistics: LogisticsFulfillment;
  legal_risk: LegalRiskRequirements;
  sustainability: SustainabilityESG;
  references: ReferencesPastPerformance;
  additional: AdditionalInformation;
  status: "pending" | "approved" | "rejected" | "on_hold" | "suspended";
  submitted_at: Date;
  updated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  rejection_reason?: string;
  admin_notes?: AdminNote[];
  is_deleted: boolean;
  deleted_at?: Date;
  deleted_by?: string;
  created_at: Date;
}

export interface AdminNote {
  note: string;
  created_by: string;
  created_at: Date;
}

export interface VendorFilters {
  status?: ("pending" | "approved" | "rejected" | "on_hold" | "suspended")[];
  business_type?: ("manufacturer" | "distributor" | "agent" | "hybrid")[];
  country?: string[];
  search?: string;
  date_from?: Date;
  date_to?: Date;
}

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}
