import multer from "multer";
import cloudinary from "../config/cloudinary";
import { ApiError } from "./api-error";

// Configure multer for memory storage (files stored in buffer before upload to Cloudinary)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = "vendor-documents"
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // Automatically detect file type
        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "gif",
          "webp",
          "pdf",
          "doc",
          "docx",
          "xls",
          "xlsx",
        ],
        max_bytes: 10 * 1024 * 1024, // 10MB
      },
      (error, result) => {
        if (error) {
          reject(new ApiError(500, `Failed to upload file: ${error.message}`));
        } else if (result) {
          resolve({
            public_id: result.public_id,
            url: result.secure_url,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
            original_filename: file.originalname,
          });
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Upload multiple files to Cloudinary
export const uploadMultipleToCloudinary = async (
  files: Express.Multer.File[],
  folder: string = "vendor-documents"
): Promise<CloudinaryUploadResult[]> => {
  const uploadPromises = files.map((file) => uploadToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    throw new ApiError(500, `Failed to delete file: ${error.message}`);
  }
};

// Delete multiple files from Cloudinary
export const deleteMultipleFromCloudinary = async (
  publicIds: string[]
): Promise<void> => {
  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error: any) {
    throw new ApiError(500, `Failed to delete files: ${error.message}`);
  }
};

// Types
export interface CloudinaryUploadResult {
  public_id: string;
  url: string;
  format: string;
  resource_type: string;
  bytes: number;
  original_filename: string;
}
