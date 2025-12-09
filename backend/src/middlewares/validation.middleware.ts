import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../utils/api-error";

type ValidateSource = "body" | "query" | "params";

export const validate = (
  schema: Joi.ObjectSchema,
  source: ValidateSource = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[source];

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(400, errorMessage));
    }

    // Update the request with validated data
    req[source] = value;

    next();
  };
};
