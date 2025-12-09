import Joi from "joi";

export const register = Joi.object({
  first_name: Joi.string().required().min(2).max(100).messages({
    "string.empty": "Le prénom est requis",
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 100 caractères",
  }),
  last_name: Joi.string().required().min(2).max(100).messages({
    "string.empty": "Le nom est requis",
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 100 caractères",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est requis",
    "string.email": "L'email doit être valide",
  }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "Le mot de passe est requis",
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
  }),
  role: Joi.string().valid("super_admin", "admin", "agent").optional(),
  phone: Joi.string()
    .required()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base":
        "Le numéro de téléphone doit être valide (ex: +243123456789)",
    }),
});

export const login = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est requis",
    "string.email": "L'email doit être valide",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Le mot de passe est requis",
  }),
});

export const updateProfile = Joi.object({
  first_name: Joi.string().min(2).max(100).optional().messages({
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 100 caractères",
  }),
  last_name: Joi.string().min(2).max(100).optional().messages({
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 100 caractères",
  }),
  phone: Joi.string()
    .optional()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .messages({
      "string.pattern.base":
        "Le numéro de téléphone doit être au format E.164 (ex: +243123456789)",
    }),
});

export const changePassword = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Le mot de passe actuel est requis",
  }),
  newPassword: Joi.string().required().min(8).messages({
    "string.empty": "Le nouveau mot de passe est requis",
    "string.min": "Le nouveau mot de passe doit contenir au moins 8 caractères",
  }),
});

export const forgotPassword = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est requis",
    "string.email": "L'email doit être valide",
  }),
});

export const resetPassword = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Le token de réinitialisation est requis",
  }),
  newPassword: Joi.string().required().min(8).messages({
    "string.empty": "Le nouveau mot de passe est requis",
    "string.min": "Le nouveau mot de passe doit contenir au moins 8 caractères",
  }),
});
