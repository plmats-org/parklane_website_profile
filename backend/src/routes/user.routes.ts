import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import * as userController from "../controllers/user.controller";
import * as userValidation from "../validations/user.validation";

const router = Router();

router.use(authenticate);

router.get("/", authorize("super_admin", "admin"), userController.getAllUsers);

router.get(
  "/:id",
  authorize("super_admin", "admin"),
  userController.getUserById
);

router.post(
  "/",
  authorize("super_admin", "admin"),
  validate(userValidation.createUser),
  userController.createUser
);

router.patch(
  "/:id",
  authorize("super_admin", "admin"),
  validate(userValidation.updateUser),
  userController.updateUser
);

router.patch(
  "/:id/deactivate",
  authorize("super_admin", "admin"),
  userController.deactivateUser
);

router.patch(
  "/:id/activate",
  authorize("super_admin", "admin"),
  userController.activateUser
);

router.delete("/:id", authorize("super_admin"), userController.deleteUser);

export default router;
