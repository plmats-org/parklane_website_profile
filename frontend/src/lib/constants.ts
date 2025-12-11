export const INDUSTRIES = [
  'Construction & Infrastructure',
  'Healthcare & Medical',
  'Agriculture & Agribusiness',
  'Manufacturing & Industrial',
  'Energy & Utilities',
  'Transportation & Logistics',
  'Hospitality & Tourism',
  'Education',
  'Government & Public Sector',
  'Mining & Natural Resources',
  'Technology & IT',
  'Retail & Consumer Goods',
  'Food & Beverage',
  'Telecommunications',
  'Financial Services',
  'Other',
] as const;

export const BUSINESS_TYPES = [
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'agent', label: 'Agent' },
  { value: 'hybrid', label: 'Hybrid (Multiple Roles)' },
] as const;

export const COUNTRIES = [
  'Rwanda',
  'Kenya',
  'Uganda',
  'Tanzania',
  'Burundi',
  'Democratic Republic of Congo',
  'South Africa',
  'United Arab Emirates',
  'China',
  'India',
  'United Kingdom',
  'United States',
  'Germany',
  'France',
  'Netherlands',
  'Belgium',
  'Turkey',
  'Japan',
  'Singapore',
  'Other',
] as const;

export const ISO_CERTIFICATIONS = [
  'ISO 9001 (Quality Management)',
  'ISO 14001 (Environmental Management)',
  'ISO 45001 (Occupational Health & Safety)',
  'ISO 27001 (Information Security)',
  'ISO 13485 (Medical Devices)',
  'ISO 22000 (Food Safety)',
  'ISO 50001 (Energy Management)',
  'ISO 17025 (Testing & Calibration)',
  'Other ISO Standard',
] as const;

export const INDUSTRY_CERTIFICATIONS = [
  'CE Marking',
  'FDA Approval',
  'GMP (Good Manufacturing Practice)',
  'HACCP',
  'OHSAS 18001',
  'SA 8000 (Social Accountability)',
  'FSC (Forest Stewardship Council)',
  'BSCI (Business Social Compliance Initiative)',
  'Fair Trade Certification',
  'Organic Certification',
  'Halal Certification',
  'Kosher Certification',
  'UL Certification',
  'RoHS Compliance',
  'REACH Compliance',
  'Other',
] as const;

export const PAYMENT_TERMS = [
  'Cash in Advance (CIA)',
  'Letter of Credit (L/C)',
  'Documentary Collection (D/P, D/A)',
  'Open Account',
  'Net 30',
  'Net 60',
  'Net 90',
  '50% Advance, 50% on Delivery',
  'Consignment',
  'Other',
] as const;

export const INCOTERMS = [
  'EXW (Ex Works)',
  'FCA (Free Carrier)',
  'CPT (Carriage Paid To)',
  'CIP (Carriage and Insurance Paid To)',
  'DAP (Delivered at Place)',
  'DPU (Delivered at Place Unloaded)',
  'DDP (Delivered Duty Paid)',
  'FAS (Free Alongside Ship)',
  'FOB (Free on Board)',
  'CFR (Cost and Freight)',
  'CIF (Cost, Insurance and Freight)',
] as const;

export const SHIPPING_METHODS = [
  'Air Freight',
  'Sea Freight (FCL)',
  'Sea Freight (LCL)',
  'Road Transport',
  'Rail Transport',
  'Courier (DHL, FedEx, UPS)',
  'Multimodal Transport',
] as const;

export const CUSTOMIZATION_OPTIONS = [
  { value: 'yes', label: 'Yes - Full Customization' },
  { value: 'limited', label: 'Limited Customization' },
  { value: 'no', label: 'No Customization (Standard Products Only)' },
] as const;

export const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
] as const;

export const DOCUMENT_TYPES = {
  incorporation: [
    { type: 'incorporation_certificate', label: 'Certificate of Incorporation', required: true },
    { type: 'business_license', label: 'Business License', required: true },
    { type: 'tax_certificate', label: 'Tax Registration Certificate', required: true },
  ],
  certification: [
    { type: 'iso_certificates', label: 'ISO Certificates', required: false },
    { type: 'industry_certifications', label: 'Industry-Specific Certifications', required: false },
    { type: 'quality_certificates', label: 'Quality Certificates', required: false },
  ],
  product: [
    { type: 'product_catalog', label: 'Product Catalog', required: true },
    { type: 'specifications', label: 'Technical Specifications', required: true },
    { type: 'msds', label: 'MSDS (Material Safety Data Sheets)', required: false },
    { type: 'raw_material_certs', label: 'Raw Material Certifications', required: false },
  ],
  financial: [
    { type: 'bank_statement', label: 'Bank Statement', required: false },
    { type: 'financial_statements', label: 'Financial Statements', required: false },
    { type: 'credit_references', label: 'Credit References', required: false },
  ],
  legal: [
    { type: 'insurance_certificate', label: 'Product Liability Insurance', required: false },
    { type: 'anti_bribery_policy', label: 'Anti-Bribery Policy', required: false },
    { type: 'aml_policy', label: 'AML Policy', required: false },
    { type: 'export_licenses', label: 'Export/Import Licenses', required: false },
  ],
  reference: [
    { type: 'reference_letters', label: 'Client Reference Letters', required: false },
    { type: 'case_studies', label: 'Case Studies', required: false },
  ],
  sustainability: [
    { type: 'environmental_policy', label: 'Environmental Policy', required: false },
    { type: 'labor_rights_docs', label: 'Labor Rights Compliance', required: false },
  ],
  other: [
    { type: 'other_documents', label: 'Additional Documents', required: false },
  ],
} as const;

export const RWANDA_PROVINCES = [
  'Kigali City',
  'Eastern Province',
  'Northern Province',
  'Southern Province',
  'Western Province',
] as const;

export const VENDOR_STATUS_CONFIG = {
  pending: {
    label: 'Pending Review',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: '⏳',
  },
  approved: {
    label: 'Approved',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: '✓',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '✗',
  },
  suspended: {
    label: 'Suspended',
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: '⊘',
  },
} as const;

export const PAGINATION_SIZES = [10, 25, 50, 100] as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 25,
} as const;

export const REGISTRATION_STEPS = [
  { id: 1, title: 'Company Information', icon: '🏢' },
  { id: 2, title: 'Company Profile & Capabilities', icon: '📊' },
  { id: 3, title: 'Certifications & Compliance', icon: '✓' },
  { id: 4, title: 'Product & Technical Info', icon: '📦' },
  { id: 5, title: 'Commercial & Financial', icon: '💰' },
  { id: 6, title: 'Logistics & Fulfillment', icon: '🚚' },
  { id: 7, title: 'Legal & Risk', icon: '⚖️' },
  { id: 8, title: 'Sustainability & ESG', icon: '🌱' },
  { id: 9, title: 'References & Performance', icon: '⭐' },
  { id: 10, title: 'Additional Information', icon: '📄' },
  { id: 11, title: 'Review & Submit', icon: '✉️' },
] as const;