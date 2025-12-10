export interface CompanyInformation {
  registeredCompanyName: string;
  tradingName?: string;
  countryOfRegistration: string;
  yearEstablished: number;
  companyRegistrationNumber: string;
  registeredBusinessAddress: string;
  operationalAddress?: string;
  website?: string;
  corporateEmail: string;
  primaryContactPersonName: string;
  contactPersonTitle: string;
  phoneNumbers: string[];
}

export interface CompanyProfileCapabilities {
  companyOverview: string;
  coreActivities: string;
  industriesServed: string[];
  productsServicesOffered: string[];
  businessType: 'manufacturer' | 'distributor' | 'agent' | 'hybrid';
  countriesRegionsSupplied: string[];
  productionServiceCapacity: string;
  minimumOrderQuantities: string;
  leadTimes: string;
  customizationCapability: 'yes' | 'no' | 'limited';
  customizationDetails?: string;
}

export interface CertificationsCompliance {
  isoCertifications: string[];
  industrySpecificCertifications: string[];
  qualityControlSystems: string;
  environmentalSafetyCompliance: string[];
  regulatoryApprovals: string[];
  exportImportLicenses: string[];
  certificationDocuments: VendorDocument[];
}

export interface ProductTechnicalInfo {
  productCatalog: VendorDocument[];
  specificationsDataSheets: VendorDocument[];
  hsCodes: string[];
  msds?: VendorDocument[];
  warrantyTerms: string;
  defectiveGoodsPolicy: string;
  packagingStandards: string;
  rawMaterialCertifications: VendorDocument[];
}

export interface CommercialFinancialInfo {
  pricingStructure: string;
  paymentTerms: string[];
  creditTermsAvailable: 'yes' | 'no';
  creditTermsDetails?: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankBranchName: string;
  swiftCode?: string;
  iban?: string;
  financialStabilityDocuments: VendorDocument[];
  volumeDiscountsAvailable: 'yes' | 'no';
  volumeDiscountDetails?: string;
  longTermPricingAgreements: 'yes' | 'no';
}

export interface LogisticsFulfillment {
  countryOfOrigin: string[];
  incotermsUsed: string[];
  shippingMethods: string[];
  internationalDocumentationCapability: 'yes' | 'no';
  standardLeadTimes: string;
  urgentDeliveryCapability: 'yes' | 'no';
  urgentDeliveryDetails?: string;
  warehousingOptions: 'yes' | 'no';
  warehousingDetails?: string;
}

export interface LegalRiskRequirements {
  antiBriberyCompliance: 'yes' | 'no';
  antiBriberyPolicyDocument?: VendorDocument;
  amlCompliance: 'yes' | 'no';
  amlPolicyDocument?: VendorDocument;
  sanctionsCheckConfirmation: boolean;
  productLiabilityInsurance: 'yes' | 'no';
  insuranceDocument?: VendorDocument;
  ndaAcceptance: boolean;
  supplierCodeOfConductApproval: boolean;
}

export interface SustainabilityESG {
  environmentalPolicies: 'yes' | 'no';
  environmentalPolicyDocument?: VendorDocument;
  wasteManagement: string;
  ethicalSourcing: 'yes' | 'no';
  ethicalSourcingDetails?: string;
  socialResponsibility: string;
  laborRightsCompliance: 'yes' | 'no';
  laborRightsDocument?: VendorDocument;
}

export interface ReferencesPastPerformance {
  majorClientsList: MajorClient[];
  referenceLetters: VendorDocument[];
  internationalSupplyExperience: 'yes' | 'no';
  internationalExperienceDetails?: string;
  caseStudies: VendorDocument[];
}

export interface MajorClient {
  clientName: string;
  country: string;
  productsSupplied: string;
  durationOfRelationship: string;
  annualVolume?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface AdditionalInformation {
  exclusivePartnershipsInterest: 'yes' | 'no';
  exclusivePartnershipsDetails?: string;
  jvDistributionCollaborationInterest: 'yes' | 'no';
  jvCollaborationDetails?: string;
  preferredSupplierProgramInterest: 'yes' | 'no';
  additionalDocuments: VendorDocument[];
  additionalComments?: string;
}

export interface VendorDocument {
  id: string;
  name: string;
  type: string;
  category: DocumentCategory;
  file: File | null;
  url?: string;
  uploadedAt?: Date;
  required: boolean;
}

export type DocumentCategory =
  | 'incorporation'
  | 'certification'
  | 'product'
  | 'financial'
  | 'legal'
  | 'reference'
  | 'other';

export interface VendorFormData {
  companyInformation: CompanyInformation;
  companyProfile: CompanyProfileCapabilities;
  certifications: CertificationsCompliance;
  productTechnical: ProductTechnicalInfo;
  commercialFinancial: CommercialFinancialInfo;
  logistics: LogisticsFulfillment;
  legalRisk: LegalRiskRequirements;
  sustainability: SustainabilityESG;
  references: ReferencesPastPerformance;
  additional: AdditionalInformation;
}

export interface Vendor extends VendorFormData {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  submittedAt: Date;
  updatedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  rejectionReason?: string;
  notes?: string;
}

export interface BackofficeUser {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'manager' | 'viewer';
  phoneNumber?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
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
  success: boolean;
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
  status?: Vendor['status'][];
  businessType?: CompanyProfileCapabilities['businessType'][];
  country?: string[];
  searchQuery?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}