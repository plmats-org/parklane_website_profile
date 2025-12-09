import Joi from "joi";

export const createUser = Joi.object({
  first_name: Joi.string().required().min(2).max(100),
  last_name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  role: Joi.string().valid("super_admin", "admin", "agent").required(),
  phone: Joi.string()
    .required()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message("Phone must be in E.164 format (e.g., +243123456789)"),
});

export const updateUser = Joi.object({
  first_name: Joi.string().min(2).max(100).optional(),
  last_name: Joi.string().min(2).max(100).optional(),
  role: Joi.string().valid("super_admin", "admin", "agent").optional(),
  phone: Joi.string()
    .optional()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message("Phone must be in E.164 format (e.g., +243123456789)"),
  status: Joi.string().valid("active", "inactive").optional(),
});
