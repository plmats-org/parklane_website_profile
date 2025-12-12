// Types matching backend Joi validation schema exactly (snake_case)

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

export interface CompanyProfile {
  company_overview: string;
  core_activities: string;
  industries_served: string[];
  products_services_offered: string | string[];
  business_type: "manufacturer" | "distributor" | "agent" | "hybrid";
  countries_regions_supplied: string[];
  production_service_capacity: string;
  minimum_order_quantities: string;
  lead_times: string;
  customization_capability: "yes" | "no" | "limited";
  customization_details?: string;
}

export interface Certifications {
  iso_certifications?: string[];
  industry_specific_certifications?: string[];
  quality_control_systems?: string;
  environmental_safety_compliance?: string | string[];
  regulatory_approvals?: string | string[];
  export_import_licenses?: string | string[];
  certification_documents?: VendorDocument[];
}

export interface ProductTechnical {
  product_catalog?: VendorDocument[];
  specifications_data_sheets?: VendorDocument[];
  hs_codes?: string | string[];
  msds?: VendorDocument[];
  warranty_terms?: string;
  defective_goods_policy?: string;
  packaging_standards?: string;
  raw_material_certifications?: VendorDocument[];
}

export interface CommercialFinancial {
  pricing_structure?: string;
  payment_terms?: string[];
  credit_terms_available?: "yes" | "no";
  credit_terms_details?: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_account_name?: string;
  bank_branch_name?: string;
  swift_code?: string;
  iban?: string;
  financial_stability_documents?: VendorDocument[];
  volume_discounts_available?: "yes" | "no";
  volume_discount_details?: string;
  long_term_pricing_agreements?: "yes" | "no";
}

export interface Logistics {
  country_of_origin?: string[];
  incoterms_used?: string[];
  shipping_methods?: string[];
  international_documentation_capability?: "yes" | "no";
  standard_lead_times?: string;
  urgent_delivery_capability?: "yes" | "no";
  urgent_delivery_details?: string;
  warehousing_options?: "yes" | "no";
  warehousing_details?: string;
}

export interface LegalRisk {
  anti_bribery_compliance?: "yes" | "no";
  anti_bribery_policy_document?: VendorDocument | null;
  aml_compliance?: "yes" | "no";
  aml_policy_document?: VendorDocument | null;
  sanctions_check_confirmation?: boolean;
  product_liability_insurance?: "yes" | "no";
  insurance_document?: VendorDocument | null;
  nda_acceptance?: boolean;
  supplier_code_of_conduct_approval?: boolean;
}

export interface Sustainability {
  environmental_policies?: "yes" | "no";
  environmental_policy_document?: VendorDocument | null;
  waste_management?: string;
  ethical_sourcing?: "yes" | "no";
  ethical_sourcing_details?: string;
  social_responsibility?: string;
  labor_rights_compliance?: "yes" | "no";
  labor_rights_document?: VendorDocument | null;
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

export interface References {
  major_clients_list?: MajorClient[];
  reference_letters?: VendorDocument[];
  international_supply_experience?: "yes" | "no";
  international_experience_details?: string;
  case_studies?: VendorDocument[];
}

export interface Additional {
  exclusive_partnerships_interest?: "yes" | "no";
  exclusive_partnerships_details?: string;
  jv_distribution_collaboration_interest?: "yes" | "no";
  jv_collaboration_details?: string;
  preferred_supplier_program_interest?: "yes" | "no";
  additional_documents?: VendorDocument[];
  additional_comments?: string;
}

export interface VendorDocument {
  id: string;
  name: string;
  type: string;
  category: DocumentCategory;
  url?: string;
  uploaded_at?: Date | string | Record<string, never>;
  required: boolean;
  file?: File | null | Record<string, never>;
}

export type DocumentCategory =
  | "incorporation"
  | "certification"
  | "product"
  | "financial"
  | "legal"
  | "reference"
  | "other";

export interface VendorFormData {
  company_information: CompanyInformation;
  company_profile: CompanyProfile;
  certifications?: Certifications;
  product_technical?: ProductTechnical;
  commercial_financial?: CommercialFinancial;
  logistics?: Logistics;
  legal_risk?: LegalRisk;
  sustainability?: Sustainability;
  references?: References;
  additional?: Additional;
}

export interface Vendor extends VendorFormData {
  _id: string;
  id?: string;
  status: VendorStatus;
  submitted_at: Date | string;
  updated_at: Date | string;
  created_at?: Date | string;
  reviewed_by?: string;
  reviewed_at?: Date | string;
  rejection_reason?: string;
  notes?: string;
  admin_notes?: AdminNote[];
  is_deleted?: boolean;
  deleted_at?: Date | string;
  deleted_by?: string;
}

export type VendorStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "on_hold"
  | "suspended";

export interface AdminNote {
  note: string;
  added_by: {
    _id: string;
    name: string;
    email: string;
  };
  added_at: Date | string;
}

export interface VendorStatistics {
  total: number;
  by_status: {
    pending: number;
    approved: number;
    rejected: number;
    on_hold: number;
    suspended: number;
  };
  by_business_type?: Record<string, number>;
  by_country?: Record<string, number>;
}

export interface BackofficeUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: "super_admin" | "admin";
  status: "active" | "inactive";
  created_at?: string;
  fullName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  phoneNumber: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface VendorFilters {
  search?: string;
  status?: VendorStatus[];
  business_type?: CompanyProfile["business_type"][];
  country?: string[];
  searchQuery?: string;
  date_from?: string;
  date_to?: string;
}

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}
