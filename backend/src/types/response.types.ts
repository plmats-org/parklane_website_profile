export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  statusCode?: number;
  errors?: ValidationError[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  status: 'success';
  data: T[];
  pagination: PaginationMeta;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface HealthCheckResponse {
  status: 'success';
  message: string;
  timestamp: string;
  uptime: number;
  environment: string;
  database: 'connected' | 'disconnected';
}
