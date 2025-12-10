import type { 
  Vendor, 
  VendorFormData, 
  ApiResponse, 
  PaginatedResponse,
  VendorFilters,
  LoginCredentials,
  BackofficeUser 
} from '../../types/vendor.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Simulated delay for realistic API behavior
const delay = (ms: number = 1500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data generator
const generateMockVendors = (count: number = 50): Vendor[] => {
  const statuses: Array<'pending' | 'approved' | 'rejected' | 'suspended'> = ['pending', 'approved', 'rejected', 'suspended'];
  const countries = ['Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'UAE', 'China', 'India'];
  const industries = ['Construction', 'Manufacturing', 'Healthcare', 'Agriculture', 'Technology'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `VND${String(i + 1).padStart(4, '0')}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    submittedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    companyInformation: {
      registeredCompanyName: `Company ${i + 1} Ltd`,
      tradingName: i % 3 === 0 ? `Trading ${i + 1}` : undefined,
      countryOfRegistration: countries[Math.floor(Math.random() * countries.length)],
      yearEstablished: 2000 + Math.floor(Math.random() * 24),
      companyRegistrationNumber: `REG${String(i + 1).padStart(6, '0')}`,
      registeredBusinessAddress: `${i + 1} Business St, District, City`,
      operationalAddress: i % 2 === 0 ? `${i + 1} Operations Ave, City` : undefined,
      website: `https://company${i + 1}.com`,
      corporateEmail: `info@company${i + 1}.com`,
      primaryContactPersonName: `Contact Person ${i + 1}`,
      contactPersonTitle: 'General Manager',
      phoneNumbers: [`+25078812345${i % 10}`],
    },
    companyProfile: {
      companyOverview: `Leading supplier in ${industries[Math.floor(Math.random() * industries.length)]} sector`,
      coreActivities: 'Manufacturing and distribution',
      industriesServed: [industries[Math.floor(Math.random() * industries.length)]],
      productsServicesOffered: 'Various products and services',
      businessType: ['manufacturer', 'distributor', 'agent', 'hybrid'][Math.floor(Math.random() * 4)] as any,
      countriesRegionsSupplied: [countries[Math.floor(Math.random() * countries.length)]],
      productionServiceCapacity: '10,000 units/month',
      minimumOrderQuantities: '100 units',
      leadTimes: '2-4 weeks',
      customizationCapability: 'yes',
    },
    reviewedBy: i % 3 === 0 ? 'admin@plm.com' : undefined,
    reviewedAt: i % 3 === 0 ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000) : undefined,
    reviewNotes: i % 3 === 0 ? 'Application reviewed and processed' : undefined,
  }));
};

// Vendor Service
export const vendorService = {
  // Submit vendor registration
  async submitRegistration(data: VendorFormData): Promise<ApiResponse<{ id: string; referenceNumber: string }>> {
    await delay();
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // return await response.json();

      // Mock response
      return {
        success: true,
        data: {
          id: `VND${Date.now()}`,
          referenceNumber: `VR-${Date.now().toString().slice(-8)}`,
        },
        message: 'Vendor registration submitted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit registration',
      };
    }
  },

  // Get vendors with filters
  async getVendors(
    page: number = 1,
    limit: number = 10,
    filters?: VendorFilters
  ): Promise<ApiResponse<PaginatedResponse<Vendor>>> {
    await delay(800);

    try {
      // TODO: Replace with actual API call
      // const params = new URLSearchParams({
      //   page: page.toString(),
      //   limit: limit.toString(),
      //   ...(filters?.status && { status: filters.status }),
      //   ...(filters?.search && { search: filters.search }),
      //   ...(filters?.country && { country: filters.country }),
      //   ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
      //   ...(filters?.dateTo && { dateTo: filters.dateTo }),
      // });
      // const response = await fetch(`${API_BASE_URL}/vendors?${params}`);
      // return await response.json();

      // Mock response
      let mockVendors = generateMockVendors();

      // Apply filters
      if (filters?.status) {
        mockVendors = mockVendors.filter(v => v.status === filters.status);
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        mockVendors = mockVendors.filter(v =>
          v.companyInformation.registeredCompanyName.toLowerCase().includes(searchLower) ||
          v.companyInformation.corporateEmail.toLowerCase().includes(searchLower) ||
          v.id.toLowerCase().includes(searchLower)
        );
      }
      if (filters?.country) {
        mockVendors = mockVendors.filter(v => v.companyInformation.countryOfRegistration === filters.country);
      }

      const total = mockVendors.length;
      const start = (page - 1) * limit;
      const paginatedVendors = mockVendors.slice(start, start + limit);

      return {
        success: true,
        data: {
          data: paginatedVendors,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch vendors',
      };
    }
  },

  // Get vendor by ID
  async getVendorById(id: string): Promise<ApiResponse<Vendor>> {
    await delay(600);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/${id}`);
      // return await response.json();

      // Mock response
      const vendors = generateMockVendors();
      const vendor = vendors.find(v => v.id === id);

      if (vendor) {
        return {
          success: true,
          data: vendor,
        };
      } else {
        return {
          success: false,
          error: 'Vendor not found',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch vendor details',
      };
    }
  },

  // Update vendor status
  async updateVendorStatus(
    id: string,
    status: 'approved' | 'rejected' | 'suspended',
    notes?: string
  ): Promise<ApiResponse<Vendor>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status, notes }),
      // });
      // return await response.json();

      // Mock response
      return {
        success: true,
        data: {} as Vendor,
        message: `Vendor status updated to ${status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update vendor status',
      };
    }
  },

  // Delete vendor
  async deleteVendor(id: string): Promise<ApiResponse<void>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/vendors/${id}`, {
      //   method: 'DELETE',
      // });
      // return await response.json();

      // Mock response
      return {
        success: true,
        message: 'Vendor deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete vendor',
      };
    }
  },
};

// Auth Service
export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: BackofficeUser; token: string }>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials),
      // });
      // return await response.json();

      // Mock response - Demo credentials: admin@plm.com / admin123
      if (credentials.email === 'admin@plm.com' && credentials.password === 'admin123') {
        const user: BackofficeUser = {
          id: 'USR001',
          email: 'admin@plm.com',
          name: 'Admin User',
          role: 'admin',
        };

        const token = 'mock_jwt_token_' + Date.now();
        
        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('plm_auth_token', token);
          localStorage.setItem('plm_user', JSON.stringify(user));
        }

        return {
          success: true,
          data: { user, token },
        };
      } else {
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Login failed',
      };
    }
  },

  // Logout
  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('plm_auth_token');
      localStorage.removeItem('plm_user');
    }
  },

  // Get current user
  getCurrentUser(): BackofficeUser | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('plm_user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  // Check if authenticated
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('plm_auth_token');
    }
    return false;
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    await delay();

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // return await response.json();

      // Mock response
      return {
        success: true,
        message: 'Password reset instructions sent to your email',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send reset instructions',
      };
    }
  },
};