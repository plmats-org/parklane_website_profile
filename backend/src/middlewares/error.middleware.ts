import { Request, Response, NextFunction, Application } from "express";
import * as Sentry from "@sentry/node";
import { ApiError } from "../utils/api-error";
import { captureException } from "../utils/sentry";
import config from "../config";

/**
 * Centralized error handling middleware
 * Logs errors to Sentry and sends appropriate responses
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";
  let isOperational = false;

  // Handle known ApiError instances
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = true;
  }
  // Handle Mongoose validation errors
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
    isOperational = true;
  }
  // Handle Mongoose cast errors (invalid ObjectId)
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    isOperational = true;
  }
  // Handle duplicate key errors (MongoDB)
  else if ((err as any).code === 11000) {
    statusCode = 409;
    message = "Duplicate field value";
    isOperational = true;
  }
  // Handle JWT errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    isOperational = true;
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    isOperational = true;
  }

  // Log to Sentry (only log unexpected errors in production)
  if (!isOperational || config.nodeEnv === "development") {
    captureException(err, {
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: (req as any).user?.id,
      statusCode,
    });
  }

  // Send error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Include stack trace only in development
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
};

/**
 * Setup Sentry Express error handler
 * Must be called in app.ts after all routes
 * Uses Sentry v10+ API
 */
export const setupSentryErrorHandler = (app: Application) => {
  Sentry.setupExpressErrorHandler(app);
};
