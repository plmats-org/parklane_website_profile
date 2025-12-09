import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

// Sanitize input to prevent XSS
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitize = (obj: any): any => {
    if (typeof obj === "string") {
      // Remove potential XSS patterns
      return obj
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "");
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }

    if (obj && typeof obj === "object") {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitize(obj[key]);
      }
      return sanitized;
    }

    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);

  next();
};

// Prevent parameter pollution
export const preventParameterPollution = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cleanParams = (params: any) => {
    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key] = params[key][params[key].length - 1];
      }
    }
  };

  cleanParams(req.query);
  next();
};

// Content Security Policy headers
export const setSecurityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  next();
};

// Validate request origin
export const validateOrigin = (allowedOrigins: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (!origin) {
      return next();
    }

    if (!allowedOrigins.includes(origin)) {
      throw new ApiError(403, "Origin not allowed");
    }

    next();
  };
};

// Validate Content-Type for POST/PUT/PATCH
export const validateContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"];

    // Only require Content-Type if there's a body with content
    // Skip validation for requests without body (like activate/deactivate endpoints)
    const hasBody =
      req.headers["content-length"] &&
      parseInt(req.headers["content-length"]) > 0;

    if (
      hasBody &&
      (!contentType || !contentType.includes("application/json"))
    ) {
      throw new ApiError(415, "Content-Type must be application/json");
    }
  }

  next();
};
