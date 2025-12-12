import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import * as vendorController from "../controllers/vendor.controller";
import * as vendorValidation from "../validations/vendor.validation";

const router = Router();

// Public routes (no auth required)
router.post(
  "/",
  validate(vendorValidation.createVendor),
  vendorController.createVendor
);

// Protected routes - requires authentication
router.use(authenticate);

// List all vendors
router.get(
  "/",
  validate(vendorValidation.queryVendors),
  vendorController.getAllVendors
);

// Statistics endpoint (must come before /:id to avoid matching "statistics" as an ID)
router.get(
  "/statistics",
  authorize("super_admin", "admin"),
  vendorController.getVendorStatistics
);

// Export endpoint (must come before /:id)
router.get(
  "/export",
  authorize("super_admin", "admin"),
  vendorController.exportVendors
);

// Single vendor by ID (public read, but after auth middleware for consistency)
router.get("/:id", vendorController.getVendorById);

// Update vendor
router.patch(
  "/:id",
  authorize("super_admin", "admin"),
  validate(vendorValidation.updateVendor),
  vendorController.updateVendor
);

// Delete vendor
router.delete("/:id", authorize("super_admin"), vendorController.deleteVendor);

export default router;
