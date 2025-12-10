import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import * as vendorController from "../controllers/vendor.controller";
import * as vendorValidation from "../validations/vendor.validation";

const router = Router();

// Public routes - anyone can submit a vendor registration
router.post(
  "/",
  validate(vendorValidation.createVendor),
  vendorController.createVendor
);

router.get("/search", vendorController.searchVendors);
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

// Status update - only status can be changed (Read-Only Update Prevention)
router.patch(
  "/:id/status",
  authorize("super_admin", "admin"),
  validate(vendorValidation.updateVendorStatus),
  vendorController.updateVendorStatus
);

// Add note without modifying vendor data
router.post(
  "/:id/notes",
  authorize("super_admin", "admin"),
  validate(vendorValidation.addAdminNote),
  vendorController.addVendorNote
);

// Soft delete with data retention
router.delete(
  "/:id",
  authorize("super_admin"),
  vendorController.deleteVendor
);

router.get(
  "/export/data",
  authorize("super_admin", "admin"),
  vendorController.exportVendors
);

export default router;
