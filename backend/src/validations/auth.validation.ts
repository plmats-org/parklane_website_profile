import Joi from "joi";

export const register = Joi.object({
  first_name: Joi.string().required().min(2).max(100).messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters",
  }),
  last_name: Joi.string().required().min(2).max(100).messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  role: Joi.string().valid("super_admin", "admin").optional(),
  phone: Joi.string()
    .required()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be valid (e.g., +243123456789)",
    }),
});

export const login = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const updateProfile = Joi.object({
  first_name: Joi.string().min(2).max(100).optional().messages({
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters",
  }),
  last_name: Joi.string().min(2).max(100).optional().messages({
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters",
  }),
  phone: Joi.string()
    .optional()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .messages({
      "string.pattern.base":
        "Phone number must be in E.164 format (e.g., +243123456789)",
    }),
});

export const changePassword = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
  }),
  newPassword: Joi.string().required().min(8).messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
  }),
});

export const forgotPassword = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
});

export const resetPassword = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Reset token is required",
  }),
  newPassword: Joi.string().required().min(8).messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
  }),
});
