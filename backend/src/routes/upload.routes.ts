import { Router } from "express";
import multer from "multer";
import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
} from "../utils/upload";
import { ApiError } from "../utils/api-error";
import { sendSuccess } from "../utils/response";

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// POST /api/upload/single - Upload a single file
router.post(
  "/single",
  upload.single("file") as any,
  async (req: any, res: any, next: any) => {
    try {
      if (!req.file) {
        throw new ApiError(400, "No file provided");
      }
      const folder = req.body.folder || "vendor-documents";
      const category = req.body.category || "general";
      const result = await uploadToCloudinary(req.file, folder);
      sendSuccess(res, {
        message: "File uploaded successfully",
        data: {
          id: result.public_id,
          name: result.original_filename,
          url: result.url,
          type: result.format,
          category,
          size: result.bytes,
          uploaded_at: new Date(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/upload/multiple - Upload multiple files (max 10)
router.post(
  "/multiple",
  upload.array("files", 10) as any,
  async (req: any, res: any, next: any) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        throw new ApiError(400, "No files provided");
      }
      const folder = req.body.folder || "vendor-documents";
      const category = req.body.category || "general";
      const results = await uploadMultipleToCloudinary(files, folder);
      const uploadedFiles = results.map((result) => ({
        id: result.public_id,
        name: result.original_filename,
        url: result.url,
        type: result.format,
        category,
        size: result.bytes,
        uploaded_at: new Date(),
      }));
      sendSuccess(res, {
        message: `${uploadedFiles.length} file(s) uploaded successfully`,
        data: uploadedFiles,
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/upload/vendor-document - Upload a vendor document
router.post(
  "/vendor-document",
  upload.single("file") as any,
  async (req: any, res: any, next: any) => {
    try {
      if (!req.file) {
        throw new ApiError(400, "No file provided");
      }
      const { vendor_id, document_type, category } = req.body;
      const folder = vendor_id
        ? `vendors/${vendor_id}/${category || "documents"}`
        : "vendor-documents/unassigned";
      const result = await uploadToCloudinary(req.file, folder);
      sendSuccess(res, {
        message: "Document uploaded successfully",
        data: {
          id: result.public_id,
          name: result.original_filename,
          url: result.url,
          type: document_type || result.format,
          category: category || "general",
          resource_type: result.resource_type,
          size: result.bytes,
          uploaded_at: new Date(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/upload/vendor-documents - Upload multiple vendor documents
router.post(
  "/vendor-documents",
  upload.array("files", 10) as any,
  async (req: any, res: any, next: any) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        throw new ApiError(400, "No files provided");
      }
      const { vendor_id, category } = req.body;
      const folder = vendor_id
        ? `vendors/${vendor_id}/${category || "documents"}`
        : "vendor-documents/unassigned";
      const results = await uploadMultipleToCloudinary(files, folder);
      const uploadedFiles = results.map((result) => ({
        id: result.public_id,
        name: result.original_filename,
        url: result.url,
        type: result.format,
        category: category || "general",
        resource_type: result.resource_type,
        size: result.bytes,
        uploaded_at: new Date(),
      }));
      sendSuccess(res, {
        message: `${uploadedFiles.length} document(s) uploaded successfully`,
        data: uploadedFiles,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/upload/:publicId - Delete a file
router.delete("/:publicId", async (req: any, res: any, next: any) => {
  try {
    const { publicId } = req.params;
    if (!publicId) {
      throw new ApiError(400, "Public ID is required");
    }
    await deleteFromCloudinary(publicId);
    sendSuccess(res, { message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
