import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import vendorRoutes from "./vendor.routes";
import uploadRoutes from "./upload.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/vendors", vendorRoutes);
router.use("/upload", uploadRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
