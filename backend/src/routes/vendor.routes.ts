import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import * as vendorController from "../controllers/vendor.controller";
import * as vendorValidation from "../validations/vendor.validation";

const router = Router();

router.post(
  "/",
  validate(vendorValidation.createVendor),
  vendorController.createVendor
);

router.get("/:id", vendorController.getVendorById);

// Protected routes - requires authentication
router.use(authenticate);

router.get(
  "/",
  validate(vendorValidation.queryVendors),
  vendorController.getAllVendors
);

router.get(
  "/stats/overview",
  authorize("super_admin", "admin"),
  vendorController.getVendorStatistics
);

router.get(
  "/export/data",
  authorize("super_admin", "admin"),
  vendorController.exportVendors
);

router.patch(
  "/:id",
  authorize("super_admin", "admin"),
  validate(vendorValidation.updateVendor),
  vendorController.updateVendor
);

router.delete("/:id", authorize("super_admin"), vendorController.deleteVendor);

export default router;
