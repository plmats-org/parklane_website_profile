import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import * as authController from "../controllers/auth.controller";
import * as authValidation from "../validations/auth.validation";

const router = Router();

router.post("/login", validate(authValidation.login), authController.login);

router.get("/me", authenticate, authController.getMe);

router.patch(
  "/profile",
  authenticate,
  validate(authValidation.updateProfile),
  authController.updateProfile
);

router.patch(
  "/change-password",
  authenticate,
  validate(authValidation.changePassword),
  authController.changePassword
);

router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

export default router;
