import { Request, Response, NextFunction } from "express";
import { logMessage } from "../utils/sentry";

/**
 * Performance monitoring middleware
 * Tracks response times and logs slow requests to Sentry
 */
export const performanceMonitor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  // Set response time header before response is sent
  res.on("finish", () => {
    const duration = Date.now() - start;

    // Log slow requests (> 1 second) to Sentry
    if (duration > 1000) {
      logMessage("Slow request detected", "warning", {
        method: req.method,
        url: req.originalUrl,
        duration: `${duration}ms`,
        statusCode: res.statusCode,
        ip: req.ip,
      });
    }
  });

  res.setHeader("X-Response-Time", "0ms");

  next();
};

export const validateRequestSize = (maxSizeKB: number = 10240) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.get("content-length") || "0", 10);
    const maxBytes = maxSizeKB * 1024;

    if (contentLength > maxBytes) {
      return res.status(413).json({
        status: "error",
        message: `Request payload too large. Maximum size is ${maxSizeKB}KB`,
        statusCode: 413,
      });
    }

    next();
  };
};
