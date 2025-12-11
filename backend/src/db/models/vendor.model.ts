import mongoose, { Schema } from "mongoose";
import { IVendor } from "../../types";

const vendorDocumentSchema = new Schema(
  {
    id: String,
    name: String,
    type: String,
    category: {
      type: String,
      enum: [
        "incorporation",
        "certification",
        "product",
        "financial",
        "legal",
        "reference",
        "other",
      ],
    },
    url: String,
    uploaded_at: { type: Date, default: Date.now },
    required: Boolean,
  },
  { _id: false }
);

const majorClientSchema = new Schema(
  {
    client_name: String,
    country: String,
    products_supplied: String,
    duration_of_relationship: String,
    annual_volume: String,
    contact_person: String,
    contact_email: String,
    contact_phone: String,
  },
  { _id: false }
);

const vendorSchema = new Schema<IVendor>(
  {
    company_information: {
      registered_company_name: {
        type: String,
        required: [true, "Registered company name is required"],
      },
      trading_name: String,
      country_of_registration: {
        type: String,
        required: [true, "Country of registration is required"],
      },
      year_established: {
        type: Number,
        required: [true, "Year established is required"],
      },
      company_registration_number: {
        type: String,
        required: [true, "Company registration number is required"],
        unique: true,
        sparse: true,
      },
      registered_business_address: {
        type: String,
        required: [true, "Registered business address is required"],
      },
      operational_address: String,
      website: String,
      corporate_email: {
        type: String,
        required: [true, "Corporate email is required"],
        lowercase: true,
      },
      primary_contact_person_name: {
        type: String,
        required: [true, "Primary contact person name is required"],
      },
      contact_person_title: {
        type: String,
        required: [true, "Contact person title is required"],
      },
      phone_numbers: {
        type: [String],
        required: [true, "Phone numbers are required"],
        validate: {
          validator: function (v: string[]) {
            return v && v.length > 0;
          },
          message: "At least one phone number is required",
        },
      },
    },
    company_profile: {
      company_overview: {
        type: String,
        required: [true, "Company overview is required"],
      },
      core_activities: {
        type: String,
        required: [true, "Core activities are required"],
      },
      industries_served: {
        type: [String],
        required: [true, "Industries served are required"],
      },
      products_services_offered: {
        type: [String],
        required: [true, "Products/services offered are required"],
      },
      business_type: {
        type: String,
        enum: {
          values: ["manufacturer", "distributor", "agent", "hybrid"],
          message: "Invalid business type",
        },
        required: [true, "Business type is required"],
      },
      countries_regions_supplied: {
        type: [String],
        required: [true, "Countries/regions supplied are required"],
      },
      production_service_capacity: {
        type: String,
        required: [true, "Production/service capacity is required"],
      },
      minimum_order_quantities: {
        type: String,
        required: [true, "Minimum order quantities are required"],
      },
      lead_times: {
        type: String,
        required: [true, "Lead times are required"],
      },
      customization_capability: {
        type: String,
        enum: {
          values: ["yes", "no", "limited"],
          message: "Invalid customization capability value",
        },
        required: [true, "Customization capability is required"],
      },
      customization_details: String,
    },
    certifications: {
      iso_certifications: [String],
      industry_specific_certifications: [String],
      quality_control_systems: String,
      environmental_safety_compliance: [String],
      regulatory_approvals: [String],
      export_import_licenses: [String],
      certification_documents: [vendorDocumentSchema],
    },
    product_technical: {
      product_catalog: [vendorDocumentSchema],
      specifications_data_sheets: [vendorDocumentSchema],
      hs_codes: [String],
      msds: [vendorDocumentSchema],
      warranty_terms: String,
      defective_goods_policy: String,
      packaging_standards: String,
      raw_material_certifications: [vendorDocumentSchema],
    },
    commercial_financial: {
      pricing_structure: String,
      payment_terms: [String],
      credit_terms_available: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid credit terms value",
        },
      },
      credit_terms_details: String,
      bank_name: String,
      bank_account_number: String,
      bank_account_name: String,
      bank_branch_name: String,
      swift_code: String,
      iban: String,
      financial_stability_documents: [vendorDocumentSchema],
      volume_discounts_available: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid volume discounts value",
        },
      },
      volume_discount_details: String,
      long_term_pricing_agreements: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid long-term pricing agreements value",
        },
      },
    },
    logistics: {
      country_of_origin: [String],
      incoterms_used: [String],
      shipping_methods: [String],
      international_documentation_capability: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid documentation capability value",
        },
      },
      standard_lead_times: String,
      urgent_delivery_capability: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid urgent delivery capability value",
        },
      },
      urgent_delivery_details: String,
      warehousing_options: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid warehousing options value",
        },
      },
      warehousing_details: String,
    },
    legal_risk: {
      anti_bribery_compliance: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid anti-bribery compliance value",
        },
      },
      anti_bribery_policy_document: vendorDocumentSchema,
      aml_compliance: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid AML compliance value",
        },
      },
      aml_policy_document: vendorDocumentSchema,
      sanctions_check_confirmation: Boolean,
      product_liability_insurance: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid product liability insurance value",
        },
      },
      insurance_document: vendorDocumentSchema,
      nda_acceptance: Boolean,
      supplier_code_of_conduct_approval: Boolean,
    },
    sustainability: {
      environmental_policies: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid environmental policies value",
        },
      },
      environmental_policy_document: vendorDocumentSchema,
      waste_management: String,
      ethical_sourcing: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid ethical sourcing value",
        },
      },
      ethical_sourcing_details: String,
      social_responsibility: String,
      labor_rights_compliance: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid labor rights compliance value",
        },
      },
      labor_rights_document: vendorDocumentSchema,
    },
    references: {
      major_clients_list: [majorClientSchema],
      reference_letters: [vendorDocumentSchema],
      international_supply_experience: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid international supply experience value",
        },
      },
      international_experience_details: String,
      case_studies: [vendorDocumentSchema],
    },
    additional: {
      exclusive_partnerships_interest: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid exclusive partnerships interest value",
        },
      },
      exclusive_partnerships_details: String,
      jv_distribution_collaboration_interest: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid JV collaboration interest value",
        },
      },
      jv_collaboration_details: String,
      preferred_supplier_program_interest: {
        type: String,
        enum: {
          values: ["yes", "no"],
          message: "Invalid preferred supplier program interest value",
        },
      },
      additional_documents: [vendorDocumentSchema],
      additional_comments: String,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "on_hold", "suspended"],
        message: "Invalid vendor status",
      },
      default: "pending",
      index: true,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    reviewed_by: String,
    reviewed_at: Date,
    rejection_reason: String,
    admin_notes: [
      {
        note: String,
        created_by: String,
        created_at: { type: Date, default: Date.now },
      },
    ],
    is_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deleted_at: Date,
    deleted_by: String,
  },
  {
    timestamps: true,
  }
);

// Index for searches and filtering
vendorSchema.index({ status: 1, created_at: -1 });
vendorSchema.index({ "company_information.corporate_email": 1 });
vendorSchema.index({
  "company_profile.business_type": 1,
  "company_information.country_of_registration": 1,
});
vendorSchema.index({
  "company_information.registered_company_name": "text",
  "company_profile.company_overview": "text",
});

export const Vendor = mongoose.model<IVendor>("Vendor", vendorSchema);
