// Mock vendor data generator
import type { Vendor } from "../../types/vendor.types";

const MOCK_STATUSES: Array<"pending" | "approved" | "rejected" | "suspended"> =
  ["pending", "approved", "rejected", "suspended"];

const MOCK_COUNTRIES = [
  "Rwanda",
  "Kenya",
  "Uganda",
  "Tanzania",
  "UAE",
  "China",
  "India",
];

const MOCK_INDUSTRIES = [
  "Construction",
  "Manufacturing",
  "Healthcare",
  "Agriculture",
  "Technology",
];

const MOCK_BUSINESS_TYPES: Array<
  "manufacturer" | "distributor" | "agent" | "hybrid"
> = ["manufacturer", "distributor", "agent", "hybrid"];

/**
 * Generate mock vendor data for testing
 * @param count - Number of mock vendors to generate (default: 50)
 * @returns Array of mock Vendor objects
 */
export const generateMockVendors = (count: number = 50): Vendor[] => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `VND${String(i + 1).padStart(4, "0")}`,
    status: MOCK_STATUSES[Math.floor(Math.random() * MOCK_STATUSES.length)],
    submitted_at: new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    ),
    updated_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    company_information: {
      registered_company_name: `Company ${i + 1} Ltd`,
      trading_name: i % 3 === 0 ? `Trading ${i + 1}` : undefined,
      country_of_registration:
        MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)],
      year_established: 2000 + Math.floor(Math.random() * 24),
      company_registration_number: `REG${String(i + 1).padStart(6, "0")}`,
      registered_business_address: `${i + 1} Business St, District, City`,
      operational_address:
        i % 2 === 0 ? `${i + 1} Operations Ave, City` : undefined,
      website: `https://company${i + 1}.com`,
      corporate_email: `info@company${i + 1}.com`,
      primary_contact_person_name: `Contact Person ${i + 1}`,
      contact_person_title: "General Manager",
      phone_numbers: [`+25078812345${i % 10}`],
    },
    company_profile: {
      company_overview: `Leading supplier in ${
        MOCK_INDUSTRIES[Math.floor(Math.random() * MOCK_INDUSTRIES.length)]
      } sector`,
      core_activities: "Manufacturing and distribution",
      industries_served: [
        MOCK_INDUSTRIES[Math.floor(Math.random() * MOCK_INDUSTRIES.length)],
      ],
      products_services_offered: ["Various products and services"],
      business_type:
        MOCK_BUSINESS_TYPES[
          Math.floor(Math.random() * MOCK_BUSINESS_TYPES.length)
        ],
      countries_regions_supplied: [
        MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)],
      ],
      production_service_capacity: "10,000 units/month",
      minimum_order_quantities: "100 units",
      lead_times: "2-4 weeks",
      customization_capability: "yes" as const,
    },
    certifications: {
      iso_certifications: [],
      industry_specific_certifications: [],
      quality_control_systems: "",
      environmental_safety_compliance: [],
      regulatory_approvals: [],
      export_import_licenses: [],
      certification_documents: [],
    },
    product_technical: {
      product_catalog: [],
      specifications_data_sheets: [],
      hs_codes: [],
      warranty_terms: "",
      defective_goods_policy: "",
      packaging_standards: "",
      raw_material_certifications: [],
    },
    commercial_financial: {
      pricing_structure: "",
      payment_terms: [],
      credit_terms_available: "no" as const,
      bank_name: "",
      bank_account_number: "",
      bank_account_name: "",
      bank_branch_name: "",
      financial_stability_documents: [],
      volume_discounts_available: "no" as const,
      long_term_pricing_agreements: "no" as const,
    },
    logistics: {
      country_of_origin: [],
      incoterms_used: [],
      shipping_methods: [],
      international_documentation_capability: "yes" as const,
      standard_lead_times: "",
      urgent_delivery_capability: "no" as const,
      warehousing_options: "no" as const,
    },
    legal_risk: {
      anti_bribery_compliance: "yes" as const,
      aml_compliance: "yes" as const,
      sanctions_check_confirmation: true,
      product_liability_insurance: "no" as const,
      nda_acceptance: true,
      supplier_code_of_conduct_approval: true,
    },
    sustainability: {
      environmental_policies: "no" as const,
      waste_management: "",
      ethical_sourcing: "no" as const,
      social_responsibility: "",
      labor_rights_compliance: "no" as const,
    },
    references: {
      major_clients_list: [],
      reference_letters: [],
      international_supply_experience: "no" as const,
      case_studies: [],
    },
    additional: {
      exclusive_partnerships_interest: "no" as const,
      jv_distribution_collaboration_interest: "no" as const,
      preferred_supplier_program_interest: "no" as const,
      additional_documents: [],
    },
    reviewed_by: i % 3 === 0 ? "admin@plm.com" : undefined,
    reviewed_at:
      i % 3 === 0
        ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000)
        : undefined,
    review_notes: i % 3 === 0 ? "Application reviewed and processed" : undefined,
  }));
};
