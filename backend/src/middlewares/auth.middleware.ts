import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { ApiError } from "../utils/api-error";
import { User } from "../db/models";
import { AuthRequest, TokenPayload } from "../types";
import { logMessage } from "../utils/sentry";

export type { AuthRequest } from "../types";

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        401,
        "Authentication required. Please provide a valid token."
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, config.jwt.secret) as TokenPayload;
    if (!decoded.id) {
      throw new ApiError(401, "Invalid token payload");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found or has been deleted");
    }

    if (user.status !== "active") {
      throw new ApiError(
        403,
        "Account is inactive. Please contact administrator."
      );
    }

    if (user.isAccountLocked()) {
      throw new ApiError(
        403,
        "Account is temporarily locked due to multiple failed login attempts."
      );
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Token has expired. Please login again."));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token. Please login again."));
    }

    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      logMessage(
        `Unauthorized access attempt by user ${req.user.email} to ${req.originalUrl}`,
        "warning",
        { userId: req.user.id, role: req.user.role, url: req.originalUrl }
      );
      return next(
        new ApiError(403, "Insufficient permissions to access this resource")
      );
    }

    next();
  };
};
