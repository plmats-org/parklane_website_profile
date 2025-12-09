import { Request } from "express";
import { IUser } from "./user.types";

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}
