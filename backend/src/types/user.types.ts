import { Document } from "mongoose";

export type UserRole = "super_admin" | "admin" | "agent";
export type UserStatus = "active" | "inactive";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  password: string;
  role: "super_admin" | "admin" | "agent";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  incrementFailedAttempts(): Promise<void>;
  resetFailedAttempts(): Promise<void>;
  isAccountLocked(): boolean;
}

export interface IUserResponse {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  role: "super_admin" | "admin" | "agent";
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: "super_admin" | "admin" | "agent";
  status?: "active" | "inactive";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
