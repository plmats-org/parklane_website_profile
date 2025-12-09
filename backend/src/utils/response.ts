import { Response } from "express";
import { ApiError } from "./api-error";
import { captureException } from "./sentry";

interface SuccessResponseData {
  [key: string]: any;
}

/**
 * Send success response
 */
export const sendSuccess = (
  res: Response,
  data: SuccessResponseData,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    data,
  });
};

/**
 * Send success response with message
 */
export const sendSuccessWithMessage = (
  res: Response,
  message: string,
  data?: SuccessResponseData,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    ...(data && { data }),
  });
};

/**
 * Send created response (201)
 */
export const sendCreated = (res: Response, data: SuccessResponseData) => {
  return sendSuccess(res, data, 201);
};

/**
 * Send no content response (204)
 */
export const sendNoContent = (res: Response) => {
  return res.status(204).send();
};

/**
 * Send error response
 */
export const sendError = (res: Response, error: any) => {
  captureException(error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  // Handle Mongoose validation errors
  if (error.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }

  // Handle Mongoose duplicate key errors
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return res.status(409).json({
      status: "error",
      message: `${field} already exists`,
    });
  }

  // Handle Mongoose cast errors
  if (error.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID format",
    });
  }

  // Default error response
  console.error("Unhandled error:", error);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
