import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
});

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z
      .string()
      .min(8, "La confirmation doit comporter au moins 8 caractères"),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
